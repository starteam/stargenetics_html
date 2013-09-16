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
                    return _.map(this.__data__[name], function (q) {
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

    var Collapsable = (function (_super) {
        __extends(Collapsable, _super);
        function Collapsable() {
            _super.apply(this, arguments);
        }
        Collapsable.prototype.update_properties = function (list) {
            var properties = {};
            _.each(list, function (l) {
                console.info(l);
                _.each(l, function (strain) {
                    _.each(strain.properties, function (value, key) {
                        properties[key] = 1;
                    });
                });
            });

            delete properties['id'];
            delete properties['export_type'];
            delete properties['name'];

            this.__data__.propertiesList = _.keys(properties);
        };

        Object.defineProperty(Collapsable.prototype, "propertiesList", {
            get: function () {
                return this.__data__.propertiesList;
            },
            enumerable: true,
            configurable: true
        });
        return Collapsable;
    })(Base);
    exports.Collapsable = Collapsable;
    Base.defineStaticRWField(Collapsable, "expanded", false);
    Base.defineStaticRWField(Collapsable, "visualsVisible", false);
    Base.defineStaticRWField(Collapsable, "propertiesVisible", false);
    Base.defineStaticRWField(Collapsable, "name", "--name not defined--");

    var Strain = (function (_super) {
        __extends(Strain, _super);
        function Strain() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(Strain.prototype, "properties", {
            get: function () {
                return this.__data__;
            },
            enumerable: true,
            configurable: true
        });
        return Strain;
    })(Base);
    exports.Strain = Strain;
    Base.defineStaticRWField(Strain, "name", "--name not defined--");

    var Strains = (function (_super) {
        __extends(Strains, _super);
        function Strains() {
            _super.apply(this, arguments);
        }
        Strains.prototype.set_list = function (strains) {
            this.__data__.list = strains;
            this.update_properties([this.list]);
        };
        return Strains;
    })(Collapsable);
    exports.Strains = Strains;
    Base.readOnlyWrappedList(Strains, "list", Strain);

    var NewExperiment = (function (_super) {
        __extends(NewExperiment, _super);
        function NewExperiment() {
            _super.apply(this, arguments);
        }
        return NewExperiment;
    })(Collapsable);
    exports.NewExperiment = NewExperiment;
    Base.readOnlyWrappedList(Strains, "parents", Strain);

    var UIModel = (function (_super) {
        __extends(UIModel, _super);
        function UIModel() {
            _super.apply(this, arguments);
        }
        UIModel.prototype.get = function (str) {
            if (str == 'strains') {
                return this.strains;
            } else if (str == 'new_experiment') {
                return this.new_experiment;
            } else {
                throw "Error " + str;
            }
        };
        return UIModel;
    })(Base);
    exports.UIModel = UIModel;
    Base.readOnlyWrappedField(UIModel, "strains", Strains);
    Base.readOnlyWrappedField(UIModel, "new_experiment", NewExperiment);

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
