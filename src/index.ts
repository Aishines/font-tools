import { loadSync, Font } from 'opentype.js'
import * as fs from 'fs'

import { GSubScript, Feature, Lookup, IndexToUnicodeMap } from './types'
const fontPath = __dirname + '/assets/Arial.ttf'

const AribicCharPos = ['init', 'medi', 'fina', 'isol']
const ArabicScript = 'arab'

function main() {
  // 获取解析后的font属性
  const font = loadSync(fontPath, { lowMemory: true })
  const GSUBTable = getGSUBTable(font)
  fs.writeFileSync(__dirname + '/../output/map.json', JSON.stringify(GSUBTable))
}

function getGSUBTable(font: Font) {
  // 1， 获取gsub 表
  const gsub = font.tables.gsub
  const scripts = gsub.scripts as GSubScript[]
  // 2, 找到阿拉伯字体
  if (!(scripts instanceof Array) || scripts.length < 1) return
  const arabScrit = scripts.filter((script) => script.tag === ArabicScript)[0].script
  if (!arabScrit) return

  const featureIndexes =
    arabScrit.langSysRecords[0]?.featureIndexes || arabScrit.defaultLangSys.featureIndexes
  if (featureIndexes?.length < 1) return

  // init medi fina isol
  const newFeatureList: Feature[] = getFeatureList(gsub.features, featureIndexes)
  console.log('newFeatureList', newFeatureList)

  const lookups: Lookup[] = gsub.lookups

  // ranges to substitute map 字符位置替换表
  const substituteMap = getSubstituteMap(newFeatureList, lookups)

  // 处理成unicode的映射
  const index2UnicodeArrayMap: IndexToUnicodeMap = (font as any)._IndexToUnicodeMap

  const result = {}
  Reflect.ownKeys(substituteMap).forEach((key) => {
    const substitute = substituteMap[key]
    result[key] = {}
    Reflect.ownKeys(substitute).forEach((idx) => {
      if (index2UnicodeArrayMap[idx]?.unicodes) {
        const unicodes = index2UnicodeArrayMap[idx].unicodes
        unicodes.forEach((unicode) => {
          if (index2UnicodeArrayMap[substitute[idx]]?.unicodes) {
            const valUnicode = index2UnicodeArrayMap[substitute[idx]].unicodes[0]
            valUnicode && (result[key][unicode] = valUnicode)
          }
        })
      }
    })
  })

  return result
}

function getSubstituteMap(newFeatureList: Feature[], lookups: Lookup[]) {
  const substituteMap = {}
  newFeatureList.forEach((feature) => {
    // get map
    const lookupList = feature.feature.lookupListIndexes

    for (let i = 0; i < lookupList.length; i++) {
      const lookup = lookups[lookupList[i]]
      if (lookup.lookupType !== 1) continue

      const range2substituteMap = {}
      // TODO lookuptype
      lookup.subtables.forEach((subTable) => {
        const ranges = subTable.coverage.ranges
        const substitute = subTable.substitute

        ranges.forEach((range) => {
          for (let j = range.start; j <= range.end; j++) {
            range2substituteMap[j] = substitute[range.index]
          }
          substituteMap[feature.tag] = range2substituteMap
        })
      })
    }
  })
  return substituteMap
}

function getFeatureList(features: Feature[], featureIndexes: number[]) {
  const newFeatureList: Feature[] = []

  featureIndexes.forEach((featureIndexe) => {
    AribicCharPos.includes(features[featureIndexe].tag) &&
      newFeatureList.push(features[featureIndexe])
  })
  return newFeatureList
}

// 主函数
main()
