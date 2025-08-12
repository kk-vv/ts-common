"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertTo2DArray = convertTo2DArray;
exports.uniqueArray = uniqueArray;
exports.JSONSerialize = JSONSerialize;
exports.JSONDeserialize = JSONDeserialize;
exports.JSONStringifyWithBigInt = JSONStringifyWithBigInt;
function convertTo2DArray(array, size) {
    if (size <= 0) {
        return [[]];
    }
    const result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
}
function uniqueArray(arr) {
    return [...new Set(arr)];
}
function JSONSerialize(obj) {
    return JSON.stringify(obj, (key, value) => {
        if (typeof value === 'bigint') {
            return value.toString() + 'n';
        }
        return value;
    });
}
function JSONDeserialize(json) {
    return JSON.parse(json, (key, value) => {
        if (typeof value === 'string' && /^\d+n$/.test(value)) {
            return BigInt(value.slice(0, -1));
        }
        return value;
    });
}
function JSONStringifyWithBigInt(obj) {
    return JSON.stringify(obj, (key, value) => {
        if (typeof value === 'bigint') {
            return value.toString();
        }
        return value;
    });
}
