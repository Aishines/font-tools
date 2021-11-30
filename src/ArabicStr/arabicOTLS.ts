import { GlobalSubstituteMap, isArabicCode, noNeedReplaceChar } from './data'
import { IArabicObj, ISubstutite } from './types'

function findCharSubstituteObj(substituteArr: ISubstutite[], charCode: number): ISubstutite {
  let n = 0
  let i = substituteArr.length - 1
  while (n <= i) {
    let a = n + ((i - n) >>> 1)

    if (charCode < substituteArr[a].ch) i = a - 1
    else {
      if (charCode == substituteArr[a].ch) return substituteArr[a]
      n = a + 1
    }
  }
  return null
}

function canBeStartOrMiddleNode(
  srcBuff: number[],
  srcPos: number,
  len: number,
  curCharSubstitute: ISubstutite
) {
  if (!curCharSubstitute.start && !curCharSubstitute.middle) return false

  let charCode = srcBuff[srcPos]
  if (32 == charCode || 46 == charCode) return false

  let iter = GlobalSubstituteMap
  let r = iter
  for (var s = srcPos; iter.childs; ) {
    if (noNeedReplaceChar(charCode)) {
      if (++s < len) {
        charCode = srcBuff[s]
        continue
      }
      break
    }

    let charSubstituteObj = findCharSubstituteObj(iter.childs, charCode)
    if (!charSubstituteObj) break

    charSubstituteObj.level > 0 && (r = charSubstituteObj)
    iter = charSubstituteObj

    if (!(++s < len)) break
    charCode = srcBuff[s]
  }
  // 找到的字符替换信息中有middle或end
  return r != GlobalSubstituteMap && !!(r.middle || r.end)
}

function handlerArabicStr(arabObj: IArabicObj) {
  let { srcPos } = arabObj
  const strLen = srcPos + arabObj.len
  const { srcBuff, desBuff } = arabObj

  let curIterLevel = -1
  let srcPos2 = srcPos // 记录处理到的位置
  let isStart = true

  let bIsArabic = false
  let canBeStartOrMid = true

  arabObj.startOrMiddleNode = arabObj.startOrMiddleNode || {}
  const startOrMiddleNode = arabObj.startOrMiddleNode

  let indexI = 0

  let srcIdx = srcPos
  while (srcIdx < strLen) {
    let curSrcCharCode = srcBuff[srcIdx] // 当前处理的字符
    const isArab = isArabicCode(curSrcCharCode)
    let iter = GlobalSubstituteMap // 记录当前「有效」迭代层级
    let iter2 = iter

    srcIdx === srcPos && (isStart = false)
    // 递归到没有chilc层级
    while (iter2.childs) {
      if (noNeedReplaceChar(curSrcCharCode)) {
        // 不需要处理字符替换的阿拉伯字符
        if (iter !== GlobalSubstituteMap) break
        desBuff[arabObj.desPos++] = curSrcCharCode
        indexI++
        arabObj.len--
        arabObj.srcPos++
        srcPos2++

        if (srcIdx < strLen) {
          srcIdx++
          curSrcCharCode = srcBuff[srcIdx]
          continue
        }

        return indexI
      }

      const curSubstituteObj = findCharSubstituteObj(iter2.childs, curSrcCharCode)
      if (curSubstituteObj) {
        if (curIterLevel !== -1 && curIterLevel !== curSubstituteObj.level) return indexI

        iter2 = curSubstituteObj
        srcIdx++
        curSubstituteObj.level > 0 && ((iter = curSubstituteObj), (srcPos2 = srcIdx))
        srcIdx < strLen && (curSrcCharCode = srcBuff[srcIdx])
      }

      if (!curSubstituteObj || srcIdx >= strLen) break
    }

    // 跳出循环的判定
    if (-1 !== curIterLevel && (curIterLevel !== iter.level || bIsArabic !== isArab)) return indexI

    curIterLevel = iter.level
    bIsArabic = isArab

    if (iter === GlobalSubstituteMap) {
      desBuff[arabObj.desPos] = curSrcCharCode // 当前字符不需要替换，直接填入desBuff
      srcPos2++
      isStart = false
    } else {
      if (!isStart && arabObj.desPos >= 1) {
        isStart = !!startOrMiddleNode[desBuff[arabObj.desPos - 1]]
      }

      canBeStartOrMid = srcPos2 < strLen && canBeStartOrMiddleNode(srcBuff, srcPos2, strLen, iter)
      const substitu: ISubstutite = iter.isolate || iter.end || iter.start || iter.middle || iter

      if (isStart && canBeStartOrMid) {
        // 存在start 当前字符被替换为middle或者end
        let subchar: ISubstutite = iter.middle
        if (subchar) {
          startOrMiddleNode[subchar.ch] = subchar
        } else {
          subchar = iter.end || substitu
        }

        desBuff[arabObj.desPos] = subchar.ch
        isStart = subchar === substitu.middle || subchar === substitu.start
      } else if (isStart && !canBeStartOrMid) {
        isStart = false
        // 当前字符被替换为end
        const charObj: ISubstutite = iter.end || iter.middle || substitu
        arabObj.desBuff[arabObj.desPos] = charObj.ch
      } else if (!isStart && canBeStartOrMid) {
        // 当前字符被替换为start
        let charObj: ISubstutite = iter.start
        isStart = !!charObj
        if (charObj) {
          startOrMiddleNode[charObj.ch] = charObj
        } else {
          charObj = iter.isolate || substitu
        }
        desBuff[arabObj.desPos] = charObj.ch
      } else if (!isStart && !canBeStartOrMid) {
        isStart = false
        const charObj: ISubstutite = iter.isolate || iter.start || substitu
        desBuff[arabObj.desPos] = charObj.ch
      }
    }

    arabObj.len -= srcPos2 - arabObj.srcPos // 处理了的长度
    arabObj.srcPos = srcPos2 // 更新
    srcIdx = srcPos2
    indexI++
    arabObj.desPos++

    if (iter.level > 1) return indexI
  }

  return indexI
}

export function processArabChar(araStr: string | Array<number>) {
  const charCodeArr =
    typeof araStr === 'string' ? Array.from(araStr).map((a) => a.charCodeAt(0)) : araStr

  const inputArabObj = {
    srcBuff: charCodeArr,
    srcPos: 0,
    desBuff: new Array(charCodeArr.length),
    desPos: 0,
    len: charCodeArr.length,
    startOrMiddleNode: {},
  }

  do {
    for (handlerArabicStr(inputArabObj); inputArabObj.desPos < inputArabObj.srcPos; )
      inputArabObj.desPos++
  } while (inputArabObj.len > 0)

  return inputArabObj.desBuff
}
