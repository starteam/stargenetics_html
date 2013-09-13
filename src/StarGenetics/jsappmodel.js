var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "lib/underscore"], function(require, exports) {
    var _ = require("lib/underscore")._;

    var Base = (function () {
        function Base(jsonmodel) {
            this.__data__ = jsonmodel;
        }
        Base.defineStaticRWField = function (cls, name, default_value) {
            Object.defineProperty(cls.prototype, name, {
                'get': function () {
                    if (typeof this.__data__[name] === 'undefined') {
                        this.__data__[name] = default_value;
                    }
                    return this.__data__[name];
                },
                'set': function (q) {
                    this.__data__[name] = q;
                },
                'enumerable': true,
                'configurable': true
            });
        };

        Base.readOnlyWrappedField = function (cls, name, wrapper) {
            Object.defineProperty(cls.prototype, name, {
                'get': function () {
                    if (typeof this.__data__[name] === 'undefined') {
                        throw "__data__[" + name + "] is undefined for " + cls;
                    }
                    return new wrapper(this.__data__[name]);
                },
                'enumerable': true,
                'configurable': true
            });
        };

        Base.readOnlyWrappedList = function (cls, name, wrapper) {
            Object.defineProperty(cls.prototype, name, {
                'get': function () {
                    if (typeof this.__data__[name] === 'undefined') {
                        throw "__data__[" + name + "] is undefined for " + cls;
                    }
                    return _.map(this.__data__.list, function (q) {
                        return new wrapper(q);
                    });
                },
                'enumerable': true,
                'configurable': true
            });
        };
        return Base;
    })();
    exports.Base = Base;

    var Strain = (function (_super) {
        __extends(Strain, _super);
        function Strain() {
            _super.apply(this, arguments);
        }
        return Strain;
    })(Base);
    exports.Strain = Strain;
    Base.defineStaticRWField(Strain, "name", "--name not defined--");

    var Strains = (function (_super) {
        __extends(Strains, _super);
        function Strains() {
            _super.apply(this, arguments);
        }
        return Strains;
    })(Base);
    exports.Strains = Strains;
    Base.readOnlyWrappedList(Strains, "list", Strain);
    Base.defineStaticRWField(Strains, "expanded", false);
    Base.defineStaticRWField(Strains, "visualsVisible", false);
    Base.defineStaticRWField(Strains, "propertiesVisible", false);

    var UIModel = (function (_super) {
        __extends(UIModel, _super);
        function UIModel() {
            _super.apply(this, arguments);
        }
        return UIModel;
    })(Base);
    exports.UIModel = UIModel;
    Base.readOnlyWrappedField(UIModel, "strains", Strains);

    var Top = (function (_super) {
        __extends(Top, _super);
        function Top() {
            _super.apply(this, arguments);
        }
        return Top;
    })(Base);
    exports.Top = Top;
    Base.defineStaticRWField(Top, "backend", {});
    Base.readOnlyWrappedField(Top, "ui", UIModel);
});
//@ sourceMappingURL=jsappmodel.js.map
