/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import React from 'react';
import { ENTITY_ERRORS } from '../../types/entity';
import { Page } from '../Page';
import { EntityList } from '../../../containers/pages/EntityList';
import { EntityHead } from '../../../containers/pages/EntityHead';
import { EntityFooter } from '../../../containers/pages/EntityFooter';
import { computed, observable, action, reaction, flow } from 'mobx';
import { Switch, Route } from 'react-router-dom';
import { observer } from 'mobx-react';
import { EntityViewer } from '../../../containers/pages/EntityViewer';
var Entity = /** @class */ (function (_super) {
    __extends(Entity, _super);
    function Entity(fields) {
        var _this = _super.call(this) || this;
        // Props
        _this.api = {
            list: { url: '/', method: 'get' },
        };
        _this.fields = [];
        _this.filters = {
            current: '',
            value: '',
            fields: [],
        };
        _this.editable = false;
        _this.viewable = false;
        _this.fetchItemsFn = undefined;
        _this.updateItemsFn = undefined;
        _this.createItemsFn = undefined;
        // Built-in
        _this.isLoading = true;
        _this.itemsPerPage = [5, 10, 15, 25, 50];
        _this.items = _this.itemsPerPage[_this.itemsPerPage.length] || 50;
        _this.totalCount = 0;
        _this.page = 0;
        _this.data = [];
        _this.setFilters = function (filters) {
            _this.filters = filters;
        };
        _this.setPage = function (page) {
            _this.page = page;
        };
        _this.setPerPage = function (items) {
            _this.items = items;
        };
        _this.fetchItems = function () {
            _this.fetchItemsCancel();
            _this.fetchItemsInstance = flow(function () {
                var filter, result, e_1;
                var _a, _b, _c, _d, _e, _f, _g, _h;
                return __generator(this, function (_j) {
                    switch (_j.label) {
                        case 0:
                            this.isLoading = true;
                            _j.label = 1;
                        case 1:
                            _j.trys.push([1, 3, , 4]);
                            if (!((_b = (_a = this.api) === null || _a === void 0 ? void 0 : _a.list) === null || _b === void 0 ? void 0 : _b.url) || !this.fetchItemsFn) {
                                throw new Error(ENTITY_ERRORS.CANT_LOAD_ITEMS);
                            }
                            filter = this.filters.current && this.filters.value
                                ? { name: this.filters.current, value: this.filters.value }
                                : null;
                            return [4 /*yield*/, (_d = (_c = this.parent) === null || _c === void 0 ? void 0 : _c.auth) === null || _d === void 0 ? void 0 : _d.withToken(this.fetchItemsFn, {
                                    url: ((_f = (_e = this.api) === null || _e === void 0 ? void 0 : _e.list) === null || _f === void 0 ? void 0 : _f.url) || '',
                                    filter: filter,
                                    page: this.page,
                                    count: this.items,
                                })];
                        case 2:
                            result = _j.sent();
                            if (result.error)
                                throw new Error(result.error);
                            this.data = ((_g = result === null || result === void 0 ? void 0 : result.data) === null || _g === void 0 ? void 0 : _g.list) || [];
                            this.totalCount = ((_h = result === null || result === void 0 ? void 0 : result.data) === null || _h === void 0 ? void 0 : _h.totalPages) || 0;
                            this.isLoading = false;
                            return [3 /*break*/, 4];
                        case 3:
                            e_1 = _j.sent();
                            this.error = e_1;
                            this.isLoading = false;
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }).bind(_this)();
        };
        _this.fetchItemsCancel = function () {
            if (_this.fetchItemsInstance && _this.fetchItemsInstance.cancel) {
                _this.fetchItemsInstance.cancel();
            }
        };
        _this.updateItem = function (data) {
            _this.updateItemInstance = flow(function () {
                var result_1, e_2;
                var _a, _b, _c, _d, _e, _f, _g;
                return __generator(this, function (_h) {
                    switch (_h.label) {
                        case 0:
                            this.isLoading = true;
                            _h.label = 1;
                        case 1:
                            _h.trys.push([1, 3, , 4]);
                            if (!((_b = (_a = this.api) === null || _a === void 0 ? void 0 : _a.update) === null || _b === void 0 ? void 0 : _b.url) || !this.updateItemsFn) {
                                throw new Error(ENTITY_ERRORS.CANT_LOAD_ITEMS);
                            }
                            return [4 /*yield*/, (_d = (_c = this.parent) === null || _c === void 0 ? void 0 : _c.auth) === null || _d === void 0 ? void 0 : _d.withToken(this.updateItemsFn, {
                                    url: ((_f = (_e = this.api) === null || _e === void 0 ? void 0 : _e.update) === null || _f === void 0 ? void 0 : _f.url) || '',
                                    data: data,
                                })];
                        case 2:
                            result_1 = _h.sent();
                            if (result_1.error)
                                throw new Error(result_1.error);
                            if (result_1.data.id) {
                                this.data = this.data.map(function (item) {
                                    return item.id === result_1.data.id ? __assign(__assign({}, item), result_1.data) : item;
                                });
                            }
                            (_g = this.parent) === null || _g === void 0 ? void 0 : _g.history.push(this.menu.url);
                            this.isLoading = false;
                            return [3 /*break*/, 4];
                        case 3:
                            e_2 = _h.sent();
                            this.error = e_2;
                            this.isLoading = false;
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }).bind(_this)();
        };
        _this.createItem = function (data) {
            _this.updateItemInstance = flow(function () {
                var result_2, e_3;
                var _a, _b, _c, _d, _e, _f, _g;
                return __generator(this, function (_h) {
                    switch (_h.label) {
                        case 0:
                            this.isLoading = true;
                            _h.label = 1;
                        case 1:
                            _h.trys.push([1, 3, , 4]);
                            if (!((_b = (_a = this.api) === null || _a === void 0 ? void 0 : _a.create) === null || _b === void 0 ? void 0 : _b.url) || !this.createItemsFn) {
                                throw new Error(ENTITY_ERRORS.CANT_LOAD_ITEMS);
                            }
                            return [4 /*yield*/, (_d = (_c = this.parent) === null || _c === void 0 ? void 0 : _c.auth) === null || _d === void 0 ? void 0 : _d.withToken(this.createItemsFn, {
                                    url: ((_f = (_e = this.api) === null || _e === void 0 ? void 0 : _e.create) === null || _f === void 0 ? void 0 : _f.url) || '',
                                    data: data,
                                })];
                        case 2:
                            result_2 = _h.sent();
                            if (result_2.error)
                                throw new Error(result_2.error);
                            if (result_2.data.id) {
                                this.data = this.data.map(function (item) {
                                    return item.id === result_2.data.id ? __assign(__assign({}, item), result_2.data) : item;
                                });
                            }
                            (_g = this.parent) === null || _g === void 0 ? void 0 : _g.history.push(this.menu.url);
                            this.isLoading = false;
                            return [3 /*break*/, 4];
                        case 3:
                            e_3 = _h.sent();
                            this.error = e_3;
                            this.isLoading = false;
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }).bind(_this)();
        };
        _this.onMount = function () {
            _this.fetchItems();
        };
        _this.onUnmount = function () {
            _this.fetchItemsCancel();
        };
        if (fields) {
            Object.assign(_this, fields);
        }
        reaction(function () { return [_this.page, _this.items]; }, _this.fetchItems);
        return _this;
    }
    Object.defineProperty(Entity.prototype, "ListHead", {
        get: function () {
            var _this = this;
            return observer(function () { return (React.createElement(EntityHead, { title: _this.title, filters: _this.filters, setFilters: _this.setFilters, url: _this.menu.url, applyFilter: _this.fetchItems, canCreate: _this.editable })); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "ListBody", {
        get: function () {
            var _this = this;
            return observer(function () { return (React.createElement(EntityList, { fields: _this.fields, data: _this.data, isLoading: _this.isLoading, url: _this.menu.url, canView: _this.viewable, canEdit: _this.editable })); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "ListFooter", {
        get: function () {
            var _this = this;
            return observer(function () { return (React.createElement(EntityFooter, { page: _this.page, itemsPerPage: _this.itemsPerPage, items: _this.items, totalCount: _this.totalCount, setPage: _this.setPage, setPerPage: _this.setPerPage })); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "List", {
        get: function () {
            var _this = this;
            return observer(function () { return (React.createElement("div", null,
                React.createElement(_this.ListHead, null),
                React.createElement(_this.ListBody, null),
                React.createElement(_this.ListFooter, null))); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "Viewer", {
        get: function () {
            var _this = this;
            return observer(function (_a) {
                var id = _a.match.params.id;
                return (React.createElement(EntityViewer, { entityName: _this.title, entities: _this.data, id: id, fields: _this.fields, url: _this.menu.url, onSave: console.log, isEditing: false }));
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "Editor", {
        get: function () {
            var _this = this;
            return observer(function (_a) {
                var id = _a.match.params.id;
                return (React.createElement(EntityViewer, { entityName: _this.title, entities: _this.data, id: id, fields: _this.fields, url: _this.menu.url, onSave: _this.updateItem, isEditing: true }));
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "Creator", {
        get: function () {
            var _this = this;
            return observer(function (_a) {
                var id = _a.match.params.id;
                return (React.createElement(EntityViewer, { entityName: _this.title, entities: _this.data, fields: _this.fields, url: _this.menu.url, isEditing: true, onSave: _this.createItem }));
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "output", {
        get: function () {
            var _this = this;
            return observer(function () { return (React.createElement(Switch, null,
                React.createElement(Route, { path: _this.menu.url + "/create", component: _this.Creator }),
                React.createElement(Route, { path: _this.menu.url + "/:id/edit", component: _this.Editor }),
                React.createElement(Route, { path: _this.menu.url + "/:id/", component: _this.Viewer }),
                React.createElement(Route, { path: _this.menu.url, component: _this.List }))); });
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        observable
    ], Entity.prototype, "api", void 0);
    __decorate([
        observable
    ], Entity.prototype, "fields", void 0);
    __decorate([
        observable
    ], Entity.prototype, "filters", void 0);
    __decorate([
        observable
    ], Entity.prototype, "editable", void 0);
    __decorate([
        observable
    ], Entity.prototype, "viewable", void 0);
    __decorate([
        observable
    ], Entity.prototype, "fetchItemsFn", void 0);
    __decorate([
        observable
    ], Entity.prototype, "updateItemsFn", void 0);
    __decorate([
        observable
    ], Entity.prototype, "createItemsFn", void 0);
    __decorate([
        observable
    ], Entity.prototype, "isLoading", void 0);
    __decorate([
        observable
    ], Entity.prototype, "itemsPerPage", void 0);
    __decorate([
        observable
    ], Entity.prototype, "items", void 0);
    __decorate([
        observable
    ], Entity.prototype, "totalCount", void 0);
    __decorate([
        observable
    ], Entity.prototype, "page", void 0);
    __decorate([
        observable
    ], Entity.prototype, "data", void 0);
    __decorate([
        observable
    ], Entity.prototype, "error", void 0);
    __decorate([
        action
    ], Entity.prototype, "setFilters", void 0);
    __decorate([
        action
    ], Entity.prototype, "setPage", void 0);
    __decorate([
        action
    ], Entity.prototype, "setPerPage", void 0);
    __decorate([
        action
    ], Entity.prototype, "fetchItems", void 0);
    __decorate([
        action
    ], Entity.prototype, "updateItem", void 0);
    __decorate([
        action
    ], Entity.prototype, "createItem", void 0);
    __decorate([
        action
    ], Entity.prototype, "onMount", void 0);
    __decorate([
        action
    ], Entity.prototype, "onUnmount", void 0);
    __decorate([
        computed
    ], Entity.prototype, "ListHead", null);
    __decorate([
        computed
    ], Entity.prototype, "ListBody", null);
    __decorate([
        computed
    ], Entity.prototype, "ListFooter", null);
    __decorate([
        computed
    ], Entity.prototype, "List", null);
    __decorate([
        computed
    ], Entity.prototype, "Viewer", null);
    __decorate([
        computed
    ], Entity.prototype, "Editor", null);
    __decorate([
        computed
    ], Entity.prototype, "Creator", null);
    __decorate([
        computed
    ], Entity.prototype, "output", null);
    return Entity;
}(Page));
export { Entity };