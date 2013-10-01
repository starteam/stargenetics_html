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
        Base.prototype.toJSON = function () {
            return this.__data__;
        };

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

        Base.readOnlyField = function (cls, name, default_value) {
            Object.defineProperty(cls.prototype, name, {
                'get': function () {
                    if (typeof this.__data__[name] === 'undefined') {
                        this.__data__[name] = default_value;
                    }
                    return this.__data__[name];
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

        Base.readOnlyWrappedListReverse = function (cls, name, wrapper) {
            Object.defineProperty(cls.prototype, name, {
                'get': function () {
                    if (typeof this.__data__[name] === 'undefined') {
                        throw "__data__[" + name + "] is undefined for " + cls;
                    }
                    return _.reverse(_.map(this.__data__[name], function (q) {
                        return new wrapper(q);
                    }));
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
        Object.defineProperty(Strain.prototype, "properties", {
            get: function () {
                var ret = {};
                var phenotypes = this.__data__['phenotype'];
                console.info("properties");
                console.info(phenotypes);

                if (phenotypes) {
                    _.each(phenotypes, function (v, k) {
                        if (typeof (v) === 'string' && v.charAt(0) == '{') {
                            try  {
                                var q = JSON.parse(v);
                                if (typeof (q['text'] === 'string')) {
                                    ret[k] = q;
                                    return;
                                }
                            } finally {
                            }
                        }
                        ret[k] = { text: v };
                    });
                }
                return ret;
            },
            enumerable: true,
            configurable: true
        });
        return Strain;
    })(Base);
    exports.Strain = Strain;
    Base.defineStaticRWField(Strain, "name", "--name not defined--");
    Base.readOnlyField(Strain, "id", null);
    Base.readOnlyField(Strain, "sex", null);

    var Collapsable = (function (_super) {
        __extends(Collapsable, _super);
        function Collapsable() {
            _super.apply(this, arguments);
        }
        Collapsable.prototype.update_properties = function (list) {
            var properties = {};
            _.each(list, function (l) {
                _.each(l, function (strain) {
                    _.each(strain.properties, function (value, key) {
                        properties[key] = 1;
                    });
                });
            });
            this.__data__.propertiesList = _.keys(properties);
        };

        Object.defineProperty(Collapsable.prototype, "propertiesList", {
            get: function () {
                return this.__data__.propertiesList;
            },
            enumerable: true,
            configurable: true
        });

        Collapsable.prototype.set_list = function (strains) {
            this.__data__.list = strains;
            this.update_properties([this.list]);
        };

        Collapsable.prototype.get = function (id) {
            return _.find(this.list, function (element) {
                return element.id == id;
            });
        };
        return Collapsable;
    })(Base);
    exports.Collapsable = Collapsable;
    Base.defineStaticRWField(Collapsable, "expanded", false);
    Base.defineStaticRWField(Collapsable, "visualsVisible", false);
    Base.defineStaticRWField(Collapsable, "propertiesVisible", false);
    Base.defineStaticRWField(Collapsable, "name", "--name not defined--");
    Base.readOnlyWrappedList(Collapsable, "list", Strain);

    var ExperimentStatistics = (function (_super) {
        __extends(ExperimentStatistics, _super);
        function ExperimentStatistics(e) {
            this.experiment = e;
            _super.call(this, {});
        }
        ExperimentStatistics.sex_generate_internal = function (list) {
            var males = 0;
            var females = 0;
            _.each(list, function (e) {
                if (e.sex == 'MALE') {
                    males++;
                } else {
                    females++;
                }
            });
            return {
                males: males,
                females: females
            };
        };

        Object.defineProperty(ExperimentStatistics.prototype, "sex", {
            get: function () {
                if (!this.sex_obj) {
                    this.sex_obj = ExperimentStatistics.sex_generate_internal(this.experiment.list);
                }
                return this.sex_obj;
            },
            enumerable: true,
            configurable: true
        });
        return ExperimentStatistics;
    })(Base);
    exports.ExperimentStatistics = ExperimentStatistics;

    var Experiment = (function (_super) {
        __extends(Experiment, _super);
        function Experiment(q) {
            if (typeof (q['parents']) === 'undefined') {
                q['parents'] = [];
            }
            _super.call(this, q);
        }
        Experiment.prototype.addParent = function (s) {
            if (this.parents.length < 2) {
                if (this.parents.length == 1) {
                    if (this.parents[0].sex == s.sex) {
                        alert("There is already " + s.sex.toLowerCase() + " parent.");
                        return;
                    }
                }
                console.info("Added here!");
                this.__data__.parents.push(s.__data__);
            }
        };

        Experiment.prototype.clearParents = function () {
            this.__data__.parents = [];
        };

        Experiment.prototype.get = function (id) {
            var ret = _super.prototype.get.call(this, id);
            if (ret == null) {
                ret = _.find(this.parents, function (element) {
                    return element.id == id;
                });
            }
            return ret;
        };

        Object.defineProperty(Experiment.prototype, "canmate", {
            get: function () {
                return (this.parents.length == 2);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Experiment.prototype, "canclearparents", {
            get: function () {
                return this.parents.length != 0;
            },
            enumerable: true,
            configurable: true
        });

        Experiment.prototype.update_experiment = function (data) {
            this.__data__.list = data.children;
            this.__data__.parents = data.parents;
            this.__data__.name = data.name;
            this.__data__.id = data.id;
            this.stats_cache = undefined;
            this.update_properties([this.list, this.parents]);
        };
        Object.defineProperty(Experiment.prototype, "stats", {
            get: function () {
                if (!this.stats_cache) {
                    this.stats_cache = new ExperimentStatistics(this);
                }
                return this.stats_cache;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Experiment.prototype, "parent", {
            get: function () {
                var parents = this.parents;
                var ret = {};
                _.each(parents, function (p) {
                    ret[p.sex == 'MALE' ? 'male' : 'female'] = p;
                });
                return ret;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Experiment.prototype, "phenotypes", {
            get: function () {
                var group = _.groupBy(this.list, function (q) {
                    return JSON.stringify(q.properties);
                });
                var ret = {};
                _.map(group, function (value, key) {
                    var sex_obj = ExperimentStatistics.sex_generate_internal(value);
                    ret[key] = {
                        list: value,
                        males: sex_obj.males,
                        females: sex_obj.females,
                        properties: value[0].properties,
                        top_male: _.find(value, function (e) {
                            return e.sex == 'MALE';
                        }),
                        top_female: _.find(value, function (e) {
                            return e.sex == 'FEMALE';
                        })
                    };
                });
                return ret;
            },
            enumerable: true,
            configurable: true
        });
        return Experiment;
    })(Collapsable);
    exports.Experiment = Experiment;
    Base.readOnlyWrappedList(Experiment, "parents", Strain);
    Base.readOnlyField(Experiment, "id", null);

    var Strains = (function (_super) {
        __extends(Strains, _super);
        function Strains() {
            _super.apply(this, arguments);
        }
        return Strains;
    })(Collapsable);
    exports.Strains = Strains;

    var NewExperiment = (function (_super) {
        __extends(NewExperiment, _super);
        function NewExperiment() {
            _super.apply(this, arguments);
        }
        return NewExperiment;
    })(Experiment);
    exports.NewExperiment = NewExperiment;

    var Experiments = (function (_super) {
        __extends(Experiments, _super);
        function Experiments() {
            _super.apply(this, arguments);
        }
        Experiments.prototype.update_experiment = function (experiment) {
            var exp = _.find(this.list, function (e) {
                return (e.id == experiment.id);
            });
            console.info("Experiments::update_experiment:" + exp);
            if (!exp) {
                console.info("Experiments::update_experiment push!");
                this.__data__.list.unshift(experiment.toJSON());
                console.info(this.__data__.list);
                console.info(this.list);
            }
        };
        return Experiments;
    })(Base);
    exports.Experiments = Experiments;
    Base.readOnlyWrappedList(Experiments, "list", Experiment);

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
                var experiment = _.find(this.experiments.list, function (e) {
                    return e.id == str;
                });
                if (experiment) {
                    return experiment;
                } else {
                    throw "Error " + str;
                }
            }
        };

        UIModel.prototype.clearNewExperiment = function () {
            this.__data__.new_experiment = {
                list: []
            };
        };
        return UIModel;
    })(Base);
    exports.UIModel = UIModel;
    Base.readOnlyWrappedField(UIModel, "strains", Strains);
    Base.readOnlyWrappedField(UIModel, "new_experiment", NewExperiment);
    Base.readOnlyWrappedField(UIModel, "experiments", Experiments);

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
