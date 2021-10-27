import { Font } from 'opentype.js'
import { IndexToUnicodeMap } from '../types'

export function getKerningPairs(font: Font) {
  const kerningPairs = font.kerningPairs
  const idxKeyPairArray = Reflect.ownKeys(kerningPairs)

  // 处理成unicodeMap
  const index2UnicodeArrayMap: IndexToUnicodeMap = (font as any)._IndexToUnicodeMap
  const kerningUnicodePairs = {}
  idxKeyPairArray.forEach((idxKeyPair: string) => {
    const twoKeys = idxKeyPair.split(',')
    const unicodes1 = index2UnicodeArrayMap[twoKeys[0]].unicodes
    unicodes1.forEach((unicode1) => {
      const unicodes2 = index2UnicodeArrayMap[twoKeys[1]].unicodes
      unicodes2.forEach((unicode2) => {
        const newPairKeys = `${unicode1},${unicode2}`
        kerningUnicodePairs[newPairKeys] = kerningPairs[idxKeyPair]
      })
    })
  })

  return kerningUnicodePairs
}
