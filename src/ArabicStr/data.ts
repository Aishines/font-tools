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

export const GlobalSubstituteMap: ISubstutite = {
  level: 0,
  childs: [
    {
      ch: 1569,
      isolate: {
        ch: 65152,
      },
      level: 1,
    },
    {
      ch: 1570,
      end: {
        ch: 65154,
      },
      isolate: {
        ch: 65153,
      },
      level: 1,
    },
    {
      ch: 1571,
      end: {
        ch: 65156,
      },
      isolate: {
        ch: 65155,
      },
      level: 1,
    },
    {
      ch: 1572,
      end: {
        ch: 65158,
      },
      isolate: {
        ch: 65157,
      },
      level: 1,
    },
    {
      ch: 1573,
      end: {
        ch: 65160,
      },
      isolate: {
        ch: 65159,
      },
      level: 1,
    },
    {
      ch: 1574,
      start: {
        ch: 65163,
      },
      end: {
        ch: 65162,
      },
      middle: {
        ch: 65164,
      },
      isolate: {
        ch: 65161,
      },
      level: 1,
    },
    {
      ch: 1575,
      end: {
        ch: 65166,
      },
      isolate: {
        ch: 65165,
      },
      level: 1,
      childs: [
        {
          ch: 1604,
          childs: [
            {
              ch: 1604,
              childs: [
                {
                  ch: 1607,
                  isolate: {
                    ch: 65010,
                  },
                  level: 4,
                },
                {
                  ch: 1729,
                  isolate: {
                    ch: 65010,
                  },
                  level: 4,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      ch: 1576,
      start: {
        ch: 65169,
      },
      end: {
        ch: 65168,
      },
      middle: {
        ch: 65170,
      },
      isolate: {
        ch: 65167,
      },
      level: 1,
    },
    {
      ch: 1577,
      end: {
        ch: 65172,
      },
      isolate: {
        ch: 65171,
      },
      level: 1,
    },
    {
      ch: 1578,
      start: {
        ch: 65175,
      },
      end: {
        ch: 65174,
      },
      middle: {
        ch: 65176,
      },
      isolate: {
        ch: 65173,
      },
      level: 1,
    },
    {
      ch: 1579,
      start: {
        ch: 65179,
      },
      end: {
        ch: 65178,
      },
      middle: {
        ch: 65180,
      },
      isolate: {
        ch: 65177,
      },
      level: 1,
    },
    {
      ch: 1580,
      start: {
        ch: 65183,
      },
      end: {
        ch: 65182,
      },
      middle: {
        ch: 65184,
      },
      isolate: {
        ch: 65181,
      },
      level: 1,
    },
    {
      ch: 1581,
      start: {
        ch: 65187,
      },
      end: {
        ch: 65186,
      },
      middle: {
        ch: 65188,
      },
      isolate: {
        ch: 65185,
      },
      level: 1,
    },
    {
      ch: 1582,
      start: {
        ch: 65191,
      },
      end: {
        ch: 65190,
      },
      middle: {
        ch: 65192,
      },
      isolate: {
        ch: 65189,
      },
      level: 1,
    },
    {
      ch: 1583,
      end: {
        ch: 65194,
      },
      isolate: {
        ch: 65193,
      },
      level: 1,
    },
    {
      ch: 1584,
      end: {
        ch: 65196,
      },
      isolate: {
        ch: 65195,
      },
      level: 1,
    },
    {
      ch: 1585,
      end: {
        ch: 65198,
      },
      isolate: {
        ch: 65197,
      },
      level: 1,
      childs: [
        {
          ch: 1604,
          childs: [
            {
              ch: 1575,
              childs: [
                {
                  ch: 1604,
                  isolate: {
                    ch: 65020,
                  },
                  level: 4,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      ch: 1586,
      end: {
        ch: 65200,
      },
      isolate: {
        ch: 65199,
      },
      level: 1,
    },
    {
      ch: 1587,
      start: {
        ch: 65203,
      },
      end: {
        ch: 65202,
      },
      middle: {
        ch: 65204,
      },
      isolate: {
        ch: 65201,
      },
      level: 1,
    },
    {
      ch: 1588,
      start: {
        ch: 65207,
      },
      end: {
        ch: 65206,
      },
      middle: {
        ch: 65208,
      },
      isolate: {
        ch: 65205,
      },
      level: 1,
    },
    {
      ch: 1589,
      start: {
        ch: 65211,
      },
      end: {
        ch: 65210,
      },
      middle: {
        ch: 65212,
      },
      isolate: {
        ch: 65209,
      },
      level: 1,
    },
    {
      ch: 1590,
      start: {
        ch: 65215,
      },
      end: {
        ch: 65214,
      },
      middle: {
        ch: 65216,
      },
      isolate: {
        ch: 65213,
      },
      level: 1,
    },
    {
      ch: 1591,
      start: {
        ch: 65219,
      },
      end: {
        ch: 65218,
      },
      middle: {
        ch: 65220,
      },
      isolate: {
        ch: 65217,
      },
      level: 1,
    },
    {
      ch: 1592,
      start: {
        ch: 65223,
      },
      end: {
        ch: 65222,
      },
      middle: {
        ch: 65224,
      },
      isolate: {
        ch: 65221,
      },
      level: 1,
    },
    {
      ch: 1593,
      start: {
        ch: 65227,
      },
      end: {
        ch: 65226,
      },
      middle: {
        ch: 65228,
      },
      isolate: {
        ch: 65225,
      },
      level: 1,
    },
    {
      ch: 1594,
      start: {
        ch: 65231,
      },
      end: {
        ch: 65230,
      },
      middle: {
        ch: 65232,
      },
      isolate: {
        ch: 65229,
      },
      level: 1,
    },
    {
      ch: 1601,
      start: {
        ch: 65235,
      },
      end: {
        ch: 65234,
      },
      middle: {
        ch: 65236,
      },
      isolate: {
        ch: 65233,
      },
      level: 1,
    },
    {
      ch: 1602,
      start: {
        ch: 65239,
      },
      end: {
        ch: 65238,
      },
      middle: {
        ch: 65240,
      },
      isolate: {
        ch: 65237,
      },
      level: 1,
    },
    {
      ch: 1603,
      start: {
        ch: 65243,
      },
      end: {
        ch: 65242,
      },
      middle: {
        ch: 65244,
      },
      isolate: {
        ch: 65241,
      },
      level: 1,
    },
    {
      ch: 1604,
      start: {
        ch: 65247,
      },
      end: {
        ch: 65246,
      },
      middle: {
        ch: 65248,
      },
      isolate: {
        ch: 65245,
      },
      level: 1,
      childs: [
        {
          ch: 1570,
          isolate: {
            ch: 65269,
          },
          end: {
            ch: 65270,
          },
          level: 2,
        },
        {
          ch: 1571,
          isolate: {
            ch: 65271,
          },
          end: {
            ch: 65272,
          },
          level: 2,
        },
        {
          ch: 1573,
          isolate: {
            ch: 65273,
          },
          end: {
            ch: 65274,
          },
          level: 2,
        },
        {
          ch: 1575,
          isolate: {
            ch: 65275,
          },
          end: {
            ch: 65276,
          },
          level: 2,
        },
      ],
    },
    {
      ch: 1605,
      start: {
        ch: 65251,
      },
      end: {
        ch: 65250,
      },
      middle: {
        ch: 65252,
      },
      isolate: {
        ch: 65249,
      },
      level: 1,
    },
    {
      ch: 1606,
      start: {
        ch: 65255,
      },
      end: {
        ch: 65254,
      },
      middle: {
        ch: 65256,
      },
      isolate: {
        ch: 65253,
      },
      level: 1,
    },
    {
      ch: 1607,
      start: {
        ch: 65259,
      },
      end: {
        ch: 65258,
      },
      middle: {
        ch: 65260,
      },
      isolate: {
        ch: 65257,
      },
      level: 1,
    },
    {
      ch: 1608,
      end: {
        ch: 65262,
      },
      isolate: {
        ch: 65261,
      },
      level: 1,
    },
    {
      ch: 1609,
      start: {
        ch: 64488,
      },
      end: {
        ch: 65264,
      },
      middle: {
        ch: 64489,
      },
      isolate: {
        ch: 65263,
      },
      level: 1,
    },
    {
      ch: 1610,
      start: {
        ch: 65267,
      },
      end: {
        ch: 65266,
      },
      middle: {
        ch: 65268,
      },
      isolate: {
        ch: 65265,
      },
      level: 1,
    },
    {
      ch: 1649,
      end: {
        ch: 64337,
      },
      isolate: {
        ch: 64336,
      },
      level: 1,
    },
    {
      ch: 1657,
      start: {
        ch: 64360,
      },
      end: {
        ch: 64359,
      },
      middle: {
        ch: 64361,
      },
      isolate: {
        ch: 64358,
      },
      level: 1,
    },
    {
      ch: 1662,
      start: {
        ch: 64344,
      },
      end: {
        ch: 64343,
      },
      middle: {
        ch: 64345,
      },
      isolate: {
        ch: 64342,
      },
      level: 1,
    },
    {
      ch: 1670,
      start: {
        ch: 64380,
      },
      end: {
        ch: 64379,
      },
      middle: {
        ch: 64381,
      },
      isolate: {
        ch: 64378,
      },
      level: 1,
    },
    {
      ch: 1672,
      end: {
        ch: 64393,
      },
      isolate: {
        ch: 64392,
      },
      level: 1,
    },
    {
      ch: 1681,
      end: {
        ch: 64397,
      },
      isolate: {
        ch: 64396,
      },
      level: 1,
    },
    {
      ch: 1700,
      start: {
        ch: 64364,
      },
      end: {
        ch: 64363,
      },
      middle: {
        ch: 64365,
      },
      isolate: {
        ch: 64362,
      },
      level: 1,
    },
    {
      ch: 1705,
      start: {
        ch: 64400,
      },
      end: {
        ch: 64399,
      },
      middle: {
        ch: 64401,
      },
      isolate: {
        ch: 64398,
      },
      level: 1,
    },
    {
      ch: 1709,
      start: {
        ch: 64469,
      },
      end: {
        ch: 64468,
      },
      middle: {
        ch: 64470,
      },
      isolate: {
        ch: 64467,
      },
      level: 1,
    },
    {
      ch: 1711,
      start: {
        ch: 64404,
      },
      end: {
        ch: 64403,
      },
      middle: {
        ch: 64405,
      },
      isolate: {
        ch: 64402,
      },
      level: 1,
    },
    {
      ch: 1722,
      end: {
        ch: 64415,
      },
      isolate: {
        ch: 64414,
      },
      start: {
        ch: 65255,
      },
      middle: {
        ch: 65256,
      },
      level: 1,
    },
    {
      ch: 1726,
      start: {
        ch: 64428,
      },
      end: {
        ch: 64427,
      },
      middle: {
        ch: 64429,
      },
      isolate: {
        ch: 64426,
      },
      level: 1,
    },
    {
      ch: 1729,
      start: {
        ch: 64424,
      },
      end: {
        ch: 64423,
      },
      middle: {
        ch: 64425,
      },
      isolate: {
        ch: 64422,
      },
      level: 1,
    },
    {
      ch: 1735,
      end: {
        ch: 64472,
      },
      level: 1,
    },
    {
      ch: 1736,
      end: {
        ch: 64476,
      },
      level: 1,
    },
    {
      ch: 1740,
      start: {
        ch: 64510,
      },
      end: {
        ch: 64509,
      },
      middle: {
        ch: 64511,
      },
      isolate: {
        ch: 64508,
      },
      level: 1,
    },
    {
      ch: 1744,
      start: {
        ch: 64486,
      },
      middle: {
        ch: 64487,
      },
      end: {
        ch: 64485,
      },
      level: 1,
    },
    {
      ch: 1746,
      end: {
        ch: 64431,
      },
      isolate: {
        ch: 64430,
      },
      level: 1,
    },
    {
      ch: 1747,
      end: {
        ch: 64433,
      },
      isolate: {
        ch: 64432,
      },
      level: 1,
    },
    {
      ch: 1749,
      end: {
        ch: 65258,
      },
      level: 1,
    },
  ],
}

export const ArabicFontRange = [
  [1536, 1791],
  [1872, 1919],
  [64336, 65023],
  [65136, 65279],
]

export function isArabicFont(e) {
  for (var t = 0, n = ArabicFontRange.length; t < n; ++t) {
    var i = ArabicFontRange[t]
    if (e >= i[0] && e <= i[1]) return !0
  }
  return !1
}

const cache = {
  '1552': true,
  '1553': true,
  '1554': true,
  '1555': true,
  '1556': true,
  '1557': true,
  '1558': true,
  '1559': true,
  '1560': true,
  '1561': true,
  '1562': true,
  '1600': true,
  '1611': true,
  '1612': true,
  '1613': true,
  '1614': true,
  '1615': true,
  '1616': true,
  '1617': true,
  '1618': true,
  '1619': true,
  '1620': true,
  '1621': true,
  '1622': true,
  '1623': true,
  '1624': true,
  '1625': true,
  '1626': true,
  '1627': true,
  '1628': true,
  '1629': true,
  '1630': true,
  '1631': true,
  '1648': true,
  '1750': true,
  '1751': true,
  '1752': true,
  '1753': true,
  '1754': true,
  '1755': true,
  '1756': true,
  '1759': true,
  '1760': true,
  '1761': true,
  '1762': true,
  '1763': true,
  '1764': true,
  '1767': true,
  '1768': true,
  '1770': true,
  '1771': true,
  '1772': true,
  '1773': true,
}

// 不需要处理的字符替换的阿拉伯文字
export function noNeedSubstituteChar(charCode: number) {
  return cache[charCode]
}
