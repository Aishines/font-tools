"use strict";
exports.__esModule = true;
var opentype = require('opentype.js');
var fontPath = __dirname + '/assets/Arial.ttf';
var AribicCharPos = ['init', 'medi', 'fina', 'isol'];
var ArabicScript = 'arab';
function main() {
    // 获取解析后的font属性
    var font = opentype.loadSync(fontPath, { lowMemory: true });
    var GSUBTable = getGSUBTable(font);
}
function getGSUBTable(font) {
    var _a;
    // 1， 获取gsub 表
    var gsub = font.tables.gsub;
    var scripts = gsub.scripts;
    // 2, 找到阿拉伯字体
    if (!(scripts instanceof Array) || scripts.length < 1)
        return;
    var arabScrit = scripts.filter(function (script) { return script.tag === ArabicScript; })[0].script;
    if (!arabScrit)
        return;
    var featureIndexes = ((_a = arabScrit.langSysRecords[0]) === null || _a === void 0 ? void 0 : _a.featureIndexes) || arabScrit.defaultLangSys.featureIndexes;
    if ((featureIndexes === null || featureIndexes === void 0 ? void 0 : featureIndexes.length) < 1)
        return;
    // init medi fina isol
    var newFeatureList = getFeatureList(gsub.features, featureIndexes);
    console.log('newFeatureList', newFeatureList);
    var lookups = gsub.lookups;
    // ranges to substitute map 字符位置替换表
    var substituteMap = getSubstituteMap(newFeatureList, lookups);
    // 处理成unicode的映射
    var index2UnicodeArrayMap = font._IndexToUnicodeMap;
    var result = {};
    Reflect.ownKeys(substituteMap).forEach(function (key) {
        var substitute = substituteMap[key];
        result[key] = {};
        Reflect.ownKeys(substitute).forEach(function (idx) {
            var _a;
            if ((_a = index2UnicodeArrayMap[idx]) === null || _a === void 0 ? void 0 : _a.unicodes) {
                var unicodes = index2UnicodeArrayMap[idx].unicodes;
                unicodes.forEach(function (unicode) {
                    var _a;
                    if ((_a = index2UnicodeArrayMap[substitute[idx]]) === null || _a === void 0 ? void 0 : _a.unicodes) {
                        var valUnicode = index2UnicodeArrayMap[substitute[idx]].unicodes[0];
                        valUnicode && (result[key][unicode] = valUnicode);
                    }
                });
            }
        });
    });
    return result;
}
function getSubstituteMap(newFeatureList, lookups) {
    var substituteMap = {};
    newFeatureList.forEach(function (feature) {
        // get map
        var lookupList = feature.feature.lookupListIndexes;
        var _loop_1 = function (i) {
            var lookup = lookups[lookupList[i]];
            if (lookup.lookupType !== 1)
                return "continue";
            var range2substituteMap = {};
            // TODO lookuptype
            lookup.subtables.forEach(function (subTable) {
                var ranges = subTable.coverage.ranges;
                var substitute = subTable.substitute;
                ranges.forEach(function (range) {
                    for (var j = range.start; j <= range.end; j++) {
                        range2substituteMap[j] = substitute[range.index];
                    }
                    substituteMap[feature.tag] = range2substituteMap;
                });
            });
        };
        for (var i = 0; i < lookupList.length; i++) {
            _loop_1(i);
        }
    });
    return substituteMap;
}
function getFeatureList(features, featureIndexes) {
    var newFeatureList = [];
    featureIndexes.forEach(function (featureIndexe) {
        AribicCharPos.includes(features[featureIndexe].tag) && newFeatureList.push(features[featureIndexe]);
    });
    return newFeatureList;
}
// 主函数
main();
