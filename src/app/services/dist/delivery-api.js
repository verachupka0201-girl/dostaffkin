"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DeliveryApi = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var DeliveryApi = /** @class */ (function () {
    function DeliveryApi(http) {
        this.http = http;
    }
    DeliveryApi.prototype.createDelivery = function (payload) {
        return this.http
            .post("https://testologia.ru/delivery/create", payload)
            .pipe(rxjs_1.catchError(function (err) { var _a, _b; return rxjs_1.of({ error: (_b = (_a = err === null || err === void 0 ? void 0 : err.error) === null || _a === void 0 ? void 0 : _a.error) !== null && _b !== void 0 ? _b : 'Ошибка при создании заявки' }); }));
    };
    DeliveryApi.prototype.getDeliveryInfo = function (id) {
        return this.http
            .get("https://testologia.ru/delivery/info", { params: { id: id } })
            .pipe(rxjs_1.catchError(function (err) { var _a, _b; return rxjs_1.of({ error: (_b = (_a = err === null || err === void 0 ? void 0 : err.error) === null || _a === void 0 ? void 0 : _a.error) !== null && _b !== void 0 ? _b : 'Ошибка при получении статуса' }); }));
    };
    DeliveryApi = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], DeliveryApi);
    return DeliveryApi;
}());
exports.DeliveryApi = DeliveryApi;
