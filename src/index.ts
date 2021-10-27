import { loadSync, Font } from 'opentype.js'
import * as fs from 'fs'

import { getGSUBTable } from './subTables'
import { getKerningPairs } from './kerningPair'
const fontPath = __dirname + '/assets/Times New Roman.ttf'

function main() {
  // 获取解析后的font属性
  const font = loadSync(fontPath, { lowMemory: true })
  const GSUBTable = getGSUBTable(font)
  fs.writeFileSync(__dirname + '/../output/subTables.json', JSON.stringify(GSUBTable))
  const KerningUnicodePairs = getKerningPairs(font)
  fs.writeFileSync(__dirname + '/../output/kerningPairs.json', JSON.stringify(KerningUnicodePairs))
}

// 主函数
main()
