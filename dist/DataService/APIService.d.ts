import EventEmitter from 'events';
import { APIRequestTarget } from './APIRequest';
export interface APIDataResponse<T> {
    status: number;
    code: number;
    message: string | null;
    data: T | null;
}
export declare const eventBus: EventEmitter<[never]>;
export declare enum APIServiceErrorCode {
    tokenExpired = 401,
    invaliddata = -998,
    unknown = -999
}
export declare class APIServiceError extends Error {
    code: number;
    message: string;
    constructor(code: number, message?: string);
}
export declare const APIService: {
    request(target: APIRequestTarget, withToken?: boolean): Promise<any>;
    fetch<T>(target: APIRequestTarget, withToken?: boolean): Promise<T>;
    fetchNullable<T>(target: APIRequestTarget, withToken?: boolean): Promise<T | null>;
};
