export declare enum CustomErrorCode {
    paramsError = 10001,
    unknowError = 20001,
    internalError = 30001,
    bizError = 40001
}
export declare class CustomError extends Error {
    code: number;
    reason?: string;
    constructor(code: CustomErrorCode | number, option?: {
        name?: string;
        reason?: string;
        cause?: unknown;
    });
    errorMessage(): string;
}
