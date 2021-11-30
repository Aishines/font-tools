import { isArabicFont, noNeedSubstituteChar, GlobalSubstituteMap } from './data'
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

function cansubstitute(
  srcBuff: number[],
  nextPos: number,
  len: number,
  curCharSubstitute: ISubstutite
) {
  if (!curCharSubstitute.start && !curCharSubstitute.middle) return false

  let nextCharcode = srcBuff[nextPos]
  if (32 == nextCharcode || 46 == nextCharcode) return false

  let iter = GlobalSubstituteMap
  let r = iter
  for (var s = nextPos; iter.childs; ) {
    if (noNeedSubstituteChar(nextCharcode)) {
      if (++s < len) {
        nextCharcode = srcBuff[s]
        continue
      }
      break
    }

    let charSubstituteObj = findCharSubstituteObj(iter.childs, nextCharcode)
    if (!charSubstituteObj) break

    charSubstituteObj.level > 0 && (r = charSubstituteObj)
    iter = charSubstituteObj

    if (!(++s < len)) break
    nextCharcode = srcBuff[s]
  }
  // 找到的字符替换信息中有middle或end
  return r != GlobalSubstituteMap && !(!r.middle && !r.end)
}

export function handlerArabic(arabObj: IArabicObj) {
  // wps 文字塑形功能
  let srcPos = arabObj.srcPos
  let strLen = srcPos + arabObj.len
  let indexI = 0
  let isStart = true
  let canSubstitu = true
  let curIterLevel = -1
  let bIsArabic = false
  let srcPos2 = srcPos
  let startOrMiddleNode = arabObj.startOrMiddleNode
  let srcBuff = arabObj.srcBuff

  startOrMiddleNode || (arabObj.startOrMiddleNode = startOrMiddleNode = {})

  for (let idx = srcPos; idx < strLen; ) {
    let curSrcCharCode = srcBuff[idx]
    let substituteIter = GlobalSubstituteMap // 记录当前迭代到的层级
    let substituteMap2 = substituteIter
    let isArab = isArabicFont(curSrcCharCode)

    idx === srcPos && (isStart = false)

    while (substituteMap2.childs) {
      // 处理多个字符连城一个字符的场景
      if (noNeedSubstituteChar(curSrcCharCode)) {
        if (substituteIter !== GlobalSubstituteMap) break

        arabObj.desBuff[arabObj.desPos++] = curSrcCharCode
        indexI++
        arabObj.len--
        arabObj.srcPos++
        srcPos2++

        if (++idx < strLen) {
          curSrcCharCode = srcBuff[idx]
          continue
        }
        return indexI
      }

      // 在substituteMap中更具charCode找替换对象
      const charSubstituteObj = findCharSubstituteObj(substituteMap2.childs, curSrcCharCode)
      if (charSubstituteObj) {
        if (-1 != curIterLevel && curIterLevel != charSubstituteObj.level) return indexI

        substituteMap2 = charSubstituteObj
        idx++
        charSubstituteObj.level > 0 && ((substituteIter = charSubstituteObj), (srcPos2 = idx))
        idx < strLen && (curSrcCharCode = srcBuff[idx])
      }

      if (!charSubstituteObj || idx >= strLen) break
    }

    if (-1 != curIterLevel && (curIterLevel != substituteIter.level || bIsArabic != isArab))
      return indexI

    curIterLevel = substituteIter.level
    bIsArabic = isArab
    if (substituteIter == GlobalSubstituteMap) {
      arabObj.desBuff[arabObj.desPos] = curSrcCharCode
      srcPos2++
      isStart = false
    } else {
      canSubstitu = !(srcPos2 >= strLen) && cansubstitute(srcBuff, srcPos2, strLen, substituteIter)

      let T2: ISubstutite
      T2 = substituteIter.isolate
      T2 || (T2 = substituteIter.end)
      T2 || (T2 = substituteIter.start)
      T2 || (T2 = substituteIter.middle)
      T2 || (T2 = substituteIter)

      !isStart &&
        arabObj.desPos >= 1 &&
        (isStart = !!startOrMiddleNode[arabObj.desBuff[arabObj.desPos - 1]])

      if (isStart && canSubstitu) {
        let subChar
        subChar = substituteIter.middle

        subChar
          ? (startOrMiddleNode[subChar.ch] = subChar)
          : (subChar = substituteIter.end ? substituteIter.end : T2)
        ;(arabObj.desBuff[arabObj.desPos] = subChar.ch),
          (isStart = subChar == substituteIter.middle || subChar == substituteIter.start)
      } else if (isStart && !canSubstitu) {
        let w
        w = substituteIter.end
        w || (w = substituteIter.middle ? substituteIter.middle : T2)

        arabObj.desBuff[arabObj.desPos] = w.ch
        isStart = !1
      } else if (!isStart && canSubstitu) {
        let x
        x = substituteIter.start // 是否有start字符替换格式
        ;(isStart = !!x),
          x
            ? (startOrMiddleNode[x.ch] = x)
            : (x = substituteIter.isolate ? substituteIter.isolate : T2),
          (arabObj.desBuff[arabObj.desPos] = x.ch)
      } else if (!isStart && !canSubstitu) {
        let E
        E = substituteIter.isolate
        E || (E = substituteIter.start ? substituteIter.start : T2),
          (arabObj.desBuff[arabObj.desPos] = E.ch),
          (isStart = !1)
      }
    }

    if (
      ((arabObj.len -= srcPos2 - arabObj.srcPos),
      (arabObj.srcPos = srcPos2),
      (idx = srcPos2),
      indexI++,
      arabObj.desPos++,
      substituteIter.level > 1)
    )
      return indexI
  }
  return indexI
}
