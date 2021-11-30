export interface ISubstutite {
    level?: number
    childs?: ISubstutite[]
    ch?: number
    start?: { ch: number }
    middle?: { ch: number }
    end?: { ch: number }
    isolate?: { ch: number }
  }
  
  export interface IArabicObj {
    srcBuff: number[]
    desBuff: number[]
    srcPos: number
    desPos: number
    len: number
    startOrMiddleNode: {} 
  }