export declare const JsonRequestHeaders: {
    'Content-Type': string;
};
export declare enum RequestMethod {
    GET = "GET",
    POST = "POST"
}
export interface APIRequestTarget {
    url: string;
    method: RequestMethod;
    headers?: Record<string, string> | undefined;
    params?: Record<string, any> | undefined;
}
export declare const APIRequest: {
    jsonRequest(target: APIRequestTarget): Promise<Response>;
    request(target: APIRequestTarget): Promise<Response>;
    removeEmptyParams(params: Record<string, any>): Record<string, any>;
};
