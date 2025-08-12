"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIRequest = exports.RequestMethod = exports.JsonRequestHeaders = void 0;
exports.JsonRequestHeaders = {
    'Content-Type': 'application/json',
};
var RequestMethod;
(function (RequestMethod) {
    RequestMethod["GET"] = "GET";
    RequestMethod["POST"] = "POST";
})(RequestMethod || (exports.RequestMethod = RequestMethod = {}));
exports.APIRequest = {
    async jsonRequest(target) {
        const headers = { ...exports.JsonRequestHeaders, ...target.headers };
        return await this.request({ ...target, headers });
    },
    async request(target) {
        let path = target.url;
        switch (target.method) {
            case RequestMethod.GET:
                if (target.params) {
                    const query = new URLSearchParams(this.removeEmptyParams(target.params)).toString();
                    path = `${path}?${query}`;
                }
                const getResponse = await fetch(path, {
                    method: target.method,
                    headers: target.headers,
                });
                return getResponse;
            case RequestMethod.POST:
                const postResponse = await fetch(path, {
                    method: target.method,
                    headers: target.headers,
                    body: target.params !== undefined ? JSON.stringify(this.removeEmptyParams(target.params)) : null
                });
                return postResponse;
        }
    },
    removeEmptyParams(params) {
        const finalParams = Object.keys(params).reduce((acc, key) => {
            if (params[key] !== undefined) {
                acc[key] = params[key];
            }
            return acc;
        }, {});
        return finalParams;
    }
};
