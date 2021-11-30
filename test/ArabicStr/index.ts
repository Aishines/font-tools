import { processArabChar } from '../../src/ArabicStr'

const charCodeArr = [1588, 1588, 1588, 1588]
const charCodeArr2 = [1588, 1588, 1588, 1588, 1604, 1575, 1604, 1575]
const input2 = 'ششششلالالالا'
console.log(processArabChar(charCodeArr))
console.log(processArabChar(charCodeArr2))
console.log(processArabChar(input2))
