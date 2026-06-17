"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Order = void 0;
var core_1 = require("@angular/core");
var header_1 = require("../../header/header");
var order_config_1 = require("./order.config");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var Order = /** @class */ (function () {
    function Order(formBuilder) {
        this.formBuilder = formBuilder;
        this.sizes = order_config_1.DELIVERY_SIZES;
        this.speeds = order_config_1.DELIVERY_SPEEDS;
        this.orderId = core_1.signal(null);
        this.calculationResult = core_1.signal(null);
        this.routeForm = this.formBuilder.group({
            from: ['', forms_1.Validators.required],
            to: ['', forms_1.Validators.required],
            size: ['xs', forms_1.Validators.required],
            speed: ['regular', forms_1.Validators.required]
        });
        this.orderForm = this.formBuilder.group({
            name: ['', forms_1.Validators.required],
            phone: ['', [forms_1.Validators.required]],
            comment: ['']
        });
    }
    Order.prototype.ngOnInit = function () {
        var _this = this;
        ymaps.ready(function () {
            _this.map = new ymaps.Map('map', {
                center: [55.751244, 37.618423],
                zoom: 5,
                controls: ['zoomControl']
            });
            // Подключаем подсказки адресов к полям от яндекса
            (new ymaps.SuggestView('from')).events.add('select', function (event) { var _a, _b; return (_this.routeForm.controls['from'].setValue((_b = (_a = event.get('item')) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : '')); });
            (new ymaps.SuggestView('to')).events.add('select', function (event) { var _a, _b; return (_this.routeForm.controls['to'].setValue((_b = (_a = event.get('item')) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : '')); });
        });
    };
    Order.prototype.selectSize = function (size) {
        this.routeForm.controls['size'].setValue(size);
    };
    Order.prototype.selectSpeed = function (speed) {
        this.routeForm.controls['speed'].setValue(speed);
    };
    Order.prototype.calculate = function () {
        var _this = this;
        this.calculationResult.set(null);
        if (!this.map || this.routeForm.invalid) {
            return;
        }
        var _a = this.routeForm.getRawValue(), from = _a.from, to = _a.to, size = _a.size, speed = _a.speed;
        if (this.mapRoute) {
            this.map.geoObjects.remove(this.mapRoute);
            this.mapRoute = null;
        }
        this.mapRoute = new ymaps.multiRouter.MultiRoute({ referencePoints: [from, to] }, { boundsAutoApply: false });
        this.map.geoObjects.add(this.mapRoute);
        this.mapRoute.model.events.add('requestsuccess', function () {
            try {
                var activeRoute = _this.mapRoute.getActiveRoute();
                if (!activeRoute) {
                    return _this.failedCalculation();
                }
                var km = activeRoute.properties.get('distance').value / 1000;
                var sizeValue_1 = size !== null && size !== void 0 ? size : '';
                var sizeConfig = _this.sizes.find(function (item) { return item.value === sizeValue_1; });
                if (!sizeConfig) {
                    return _this.failedCalculation();
                }
                var total = Math.max(sizeConfig.min, Math.ceil(km * sizeConfig.rate));
                var duration = Math.min(30, 1 + Math.ceil(km / 80));
                if (speed === 'fast') {
                    total = Math.ceil(total * 1.15);
                    duration = Math.ceil(duration - (duration * 0.30));
                }
                _this.calculationResult.set({
                    from: from,
                    to: to,
                    size: size,
                    distance: km.toFixed(1),
                    duration: duration,
                    rate: sizeConfig.rate,
                    total: total,
                    speed: speed
                });
            }
            catch (err) {
                _this.failedCalculation();
            }
        });
        this.mapRoute.model.events.add('requestfail', function () { return _this.failedCalculation(); });
    };
    Order.prototype.failedCalculation = function () {
        this.calculationResult.set(null);
        alert('Не удалось построить маршрут. Проверьте адреса и выбранные параметры.');
    };
    Order.prototype.submitOrder = function () {
        var calculation = this.calculationResult();
        if (!calculation) {
            alert('Сначала рассчитайте стоимость, чтобы оформить заявку');
            return;
        }
        if (this.orderForm.invalid) {
            alert('Введите имя и корректный телефон');
            return;
        }
        var _a = this.orderForm.getRawValue(), name = _a.name, phone = _a.phone, comment = _a.comment;
        var trimmedName = (name !== null && name !== void 0 ? name : '').trim();
        var trimmedPhone = (phone !== null && phone !== void 0 ? phone : '').trim();
        var trimmedComment = (comment !== null && comment !== void 0 ? comment : '').trim();
        var payload = {
            customer: { name: trimmedName, phone: trimmedPhone, comment: trimmedComment },
            calculation: calculation,
            createdAt: new Date().toISOString()
        };
        console.log(payload);
        this.orderId.set(1);
    };
    Order = __decorate([
        core_1.Component({
            selector: 'app-order',
            imports: [header_1.Header, common_1.UpperCasePipe, forms_1.ReactiveFormsModule],
            templateUrl: './order.html',
            styleUrl: './order.css'
        })
    ], Order);
    return Order;
}());
exports.Order = Order;
