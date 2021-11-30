import { Font } from 'opentype.js'
import { IndexToUnicodeMap } from '../subTables/types'

export function getKerningPairs(font: Font) {
  const kerningUnicodePairs = {}

  const kerningPairs = font.kerningPairs
  const idxKeyPairArray = Reflect.ownKeys(kerningPairs)
  if (idxKeyPairArray.length > 0) {
    // 从kerningPair变解析
    const index2UnicodeArrayMap: IndexToUnicodeMap = (font as any)._IndexToUnicodeMap
    idxKeyPairArray.forEach((idxKeyPair: string) => {
      const twoKeys = idxKeyPair.split(',')
      const unicodes1 = index2UnicodeArrayMap[twoKeys[0]].unicodes
      unicodes1.forEach((unicode1) => {
        const unicodes2 = index2UnicodeArrayMap[twoKeys[1]].unicodes
        unicodes2.forEach((unicode2) => {
          const newPairKeys = `${unicode1},${unicode2}`
          if (unicodes1 < 128 && unicodes2 < 128) {
            kerningUnicodePairs[newPairKeys] = kerningPairs[idxKeyPair]
          }
        })
      })
    })
  } else {
    // 从gpos表中解析
  }

  return kerningUnicodePairs
}
