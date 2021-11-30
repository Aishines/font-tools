import { handlerArabic } from '.'
import { handlerArabicStr } from './arabicOTLS'

const input = {
  srcBuff: [1575, 1604, 1604, 1607],
  srcPos: 0,
  desBuff: [null, null, null, null],
  desPos: 0,
  len: 4,
  startOrMiddleNode: {},
}

const input2 = {
  srcBuff: [1588, 1588, 1588, 1588],
  srcPos: 0,
  desBuff: [null, null, null, null],
  desPos: 0,
  len: 4,
  startOrMiddleNode: {},
}

handlerArabic(input)
handlerArabicStr(input2)
console.log(input)
console.log(input2)

// export const testArabicAnalyze = () => {
//   handlerArabic(input)
//   handlerArabic(input2)
//   console.log(input)
//   console.log(input2)
// }
