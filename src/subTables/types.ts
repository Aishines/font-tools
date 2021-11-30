export interface GSubScript {
  tag: string
  script: {
    defaultLangSys: LangSys
    langSysRecords: LangSys[]
  }
}

export interface LangSys {
  reserved: number
  featureIndexes: number[]
  reqFeatureIndex: number
}

export interface Feature {
  tag: string
  feature: {
    featureParams: number
    lookupListIndexes: number[]
  }
}

export interface Lookup {
  lookupType: number
  lookupFlag: number
  subtables: SubTable[]
  markFilteringSet: any
}

export interface SubTable {
  coverage: Coverage
  substFormat: number
  substitute: number[]
}

export interface Coverage {
  format: number
  ranges: SubTableRange[]
}

export interface SubTableRange {
  start: number
  end: number
  index: number
}

export interface IndexToUnicodeMap {
  [key: number]: {
    unicodes: number[]
  }
}
