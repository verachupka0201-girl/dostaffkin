"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Track = void 0;
var core_1 = require("@angular/core");
var header_1 = require("../../header/header");
var forms_1 = require("@angular/forms");
var Track = /** @class */ (function () {
    function Track() {
        this.trackNumber = '';
        this.trackResult = core_1.signal(null);
    }
    Track.prototype.trackShipment = function () {
        var rawValue = this.trackNumber.trim();
        if (!rawValue) {
            alert('Заполните номер отправления');
            return;
        }
        this.trackResult.set(null);
        var numericValue = Number(rawValue);
        if (Number.isNaN(numericValue) || numericValue <= 0) {
            alert('Введите корректный номер отправления');
            return;
        }
        this.trackResult.set({
            id: 1,
            route: {
                from: 'Москва, улица Арбат, 1',
                to: 'Минск, проспект Независимости, 58'
            },
            statuses: [
                { type: 'created', label: 'Создан', date: '10.01.2026' },
                { type: 'in-way', label: 'В пути: Вязьма', date: '15.01.2026' },
                { type: 'in-way', label: 'В пути: Орша', date: '16.01.2026' },
                { type: 'in-way', label: 'В пути: Минск', date: '18.01.2026' },
                { type: 'ready', label: 'Готов к выдаче', date: '25.01.2026' },
                { type: 'done', label: 'Вручен', date: '27.01.2026' }
            ]
        });
    };
    Track = __decorate([
        core_1.Component({
            selector: 'app-track',
            imports: [header_1.Header, forms_1.FormsModule],
            templateUrl: './track.html',
            styleUrl: './track.css'
        })
    ], Track);
    return Track;
}());
exports.Track = Track;
