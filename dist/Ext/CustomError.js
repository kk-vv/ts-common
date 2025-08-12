"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = exports.CustomErrorCode = void 0;
var CustomErrorCode;
(function (CustomErrorCode) {
    CustomErrorCode[CustomErrorCode["paramsError"] = 10001] = "paramsError";
    CustomErrorCode[CustomErrorCode["unknowError"] = 20001] = "unknowError";
    CustomErrorCode[CustomErrorCode["internalError"] = 30001] = "internalError";
    CustomErrorCode[CustomErrorCode["bizError"] = 40001] = "bizError";
})(CustomErrorCode || (exports.CustomErrorCode = CustomErrorCode = {}));
function messageBy(code) {
    switch (code) {
        case CustomErrorCode.paramsError:
            return 'Params error';
        case CustomErrorCode.unknowError:
            return 'Unknow error';
        case CustomErrorCode.internalError:
            return 'System internal error';
        case CustomErrorCode.bizError:
            return 'Biz error';
        default:
            return 'Unknow error';
    }
}
class CustomError extends Error {
    code;
    reason;
    constructor(code, option) {
        let reason = option?.reason;
        if (!reason && option?.cause) {
            reason = option.cause.message || option.cause.msg || `${option.cause}`;
        }
        super(reason ?? messageBy(code));
        this.cause = option?.cause;
        this.code = code;
        this.name = option?.name || messageBy(code);
        this.reason = reason;
    }
    errorMessage() {
        return `${this.name}|${this.reason}`;
    }
}
exports.CustomError = CustomError;
