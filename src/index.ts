import { loadSync, Font } from 'opentype.js'
import * as fs from 'fs'
import { getGSUBTable } from './subTables'
import { getKerningPairs } from './kerningPair'

// const FontName = ['Calibri']
const fontFilePath = `${__dirname}/assets/fonts`

function main() {
  // const fontList = fs
  //   .readdirSync(`${fontFilePath}`)
  //   .filter((f) => f.includes('.ttf') || f.includes('.woff'))
  // console.log(fontList)
  // fontList.forEach((name) => readFont(name))

  
}

// 主函数
main()

function readFont(fontName: string) {
  const fontPath = `${fontFilePath}/${fontName}`
  const font = loadSync(fontPath, { lowMemory: true })

  const KerningUnicodePairs = getKerningPairs(font)
  const outputPath = __dirname + `/../output/${fontName}_kerningPairs.json`
  fs.writeFileSync(outputPath, JSON.stringify(KerningUnicodePairs))

  const GSUBTable = getGSUBTable(font)
  fs.writeFileSync(__dirname + `/../output/${fontName}_subTables.json`, JSON.stringify(GSUBTable))
}
