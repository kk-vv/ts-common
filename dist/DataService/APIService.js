"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIService = exports.APIServiceError = exports.APIServiceErrorCode = exports.eventBus = void 0;
const events_1 = __importDefault(require("events"));
const APIRequest_1 = require("./APIRequest");
exports.eventBus = new events_1.default();
var APIServiceErrorCode;
(function (APIServiceErrorCode) {
    APIServiceErrorCode[APIServiceErrorCode["tokenExpired"] = 401] = "tokenExpired";
    APIServiceErrorCode[APIServiceErrorCode["invaliddata"] = -998] = "invaliddata";
    APIServiceErrorCode[APIServiceErrorCode["unknown"] = -999] = "unknown";
})(APIServiceErrorCode || (exports.APIServiceErrorCode = APIServiceErrorCode = {}));
class APIServiceError extends Error {
    code;
    message;
    constructor(code, message) {
        super(message ?? 'Invalid response');
        this.code = code;
        this.message = message ?? 'Invalid response';
    }
}
exports.APIServiceError = APIServiceError;
exports.APIService = {
    async request(target, withToken = true) {
        let apiTarget = target;
        let headers = apiTarget.headers ?? {};
        if (withToken === true) {
            const token = 'fix token here';
            if (token) {
                headers['token'] = token;
            }
        }
        apiTarget.headers = headers;
        try {
            const response = await APIRequest_1.APIRequest.jsonRequest(apiTarget);
            if (response.status === 401) {
                exports.eventBus.emit('TokenExpired');
                throw new APIServiceError(APIServiceErrorCode.tokenExpired);
            }
            const result = await response.json();
            if (result.status === undefined) {
                throw new APIServiceError(APIServiceErrorCode.unknown, 'Invalid data response.');
            }
            else if (result.status === 1) {
                return result;
            }
            else {
                throw new APIServiceError(result.code ?? APIServiceErrorCode.unknown, result.message ?? 'Invalid data response.');
            }
        }
        catch (error) {
            if (error instanceof APIServiceError) {
                throw error;
            }
            throw new APIServiceError(APIServiceErrorCode.unknown, `${error}`);
        }
    }, async fetch(target, withToken = true) {
        try {
            const result = (await this.request(target, withToken));
            if (result.data !== null) {
                return result.data;
            }
            else {
                throw new APIServiceError(APIServiceErrorCode.invaliddata, 'Invalid data response.');
            }
        }
        catch (error) {
            throw error;
        }
    }, async fetchNullable(target, withToken = true) {
        try {
            const result = (await this.request(target, withToken));
            return result.data;
        }
        catch (error) {
            throw error;
        }
    }
};
