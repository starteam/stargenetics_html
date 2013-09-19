/// <reference path="../../../starx/src/StarX/lib/require.d.ts" />
/// <reference path="../../../starx/src/StarX/lib/underscore.d.ts" />
/// <amd-dependency path="lib/underscore" />

var _ = require("lib/underscore")._;

export class Base {
    __data__:any;

    constructor(jsonmodel:any) {
        this.__data__ = jsonmodel;
    }

    toJSON():any {
        return this.__data__;
    }

    static defineStaticRWField(cls, name, default_value) {
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
    }

    static readOnlyField(cls, name, default_value) {
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
    }

    static readOnlyWrappedField(cls, name, wrapper) {
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
    }

    static readOnlyWrappedList(cls, name, wrapper) {
        Object.defineProperty(cls.prototype, name, {
            'get': function () {
                if (typeof this.__data__[name] === 'undefined') {
                    throw "__data__[" + name + "] is undefined for " + cls;
                }
                return _.map(this.__data__[name], function (q) {
                    return new wrapper(q)
                });
            },
            'enumerable': true,
            'configurable': true
        });

    }

}

/**
 * Strain class
 */
export class Strain extends Base {
    name:string;

    get properties() {
        var ret = {};
        var phenotypes = this.__data__['phenotype'];
        console.info( "properties");
        console.info( phenotypes);

        if (phenotypes) {
            _.each(phenotypes, function (v, k) {
                if (typeof(v) === 'string' && v.charAt(0) == '{') {
                    try {
                        var q = JSON.parse(v);
                        if(typeof( q['text'] === 'string'))
                        {
                            ret[k] = q;
                            return;
                        }
                    } finally {}

                }
                ret[k] = {text:v};
            });
        }
        return ret;
    }

}
Base.defineStaticRWField(Strain, "name", "--name not defined--");
Base.readOnlyField(Strain, "id", null);
Base.readOnlyField(Strain, "sex", null);

/**
 * Collapsable defines core UI element
 */
export class Collapsable extends Base {
    expanded:bool;
    visualsVisible:bool;
    propertiesVisible:bool;
    name:string;
    list:Strain[];

    update_properties(list:any[]) {
        var properties = {};
        _.each(list, function (l) {
            _.each(l, function (strain) {
                _.each(strain.properties, function (value, key) {
                    properties[key] = 1;
                });
            });
        });
        this.__data__.propertiesList = _.keys(properties);
    }

    get propertiesList() {
        return this.__data__.propertiesList;
    }

    set_list(strains:any[]):void {
        this.__data__.list = strains;
        this.update_properties([this.list]);
    }

    get(id:string) {
        return _.find(this.list, function (element) {
            return element.id == id;
        });
    }
}
Base.defineStaticRWField(Collapsable, "expanded", false);
Base.defineStaticRWField(Collapsable, "visualsVisible", false);
Base.defineStaticRWField(Collapsable, "propertiesVisible", false);
Base.defineStaticRWField(Collapsable, "name", "--name not defined--");
Base.readOnlyWrappedList(Collapsable, "list", Strain);

/**
 * Experiment class adds parents to the mix
 */
export class Experiment extends Collapsable {
    parents:Strain[];

    constructor(q:{}) {
        if (typeof(q['parents']) === 'undefined') {
            q['parents'] = [];
        }
        super(q);
    }

    addParent(s:Strain):void {
        if (this.parents.length < 2) {
            if (this.parents.length == 1) {
                //TODO: Depending on the model, it is possible that sex needs to be different...
            }
            this.__data__.parents.push(s.__data__);
        }
    }

    clearParents() {
        this.__data__.parents = [];
    }

    get(id:string):Strain {
        var ret = super.get(id);
        if (ret == null) {
            ret = _.find(this.parents, function (element) {
                return element.id == id;
            });
        }
        return ret;
    }

    get canmate():boolean {
        return ( this.parents.length == 2 );
    }

    get canclearparents():boolean {
        return this.parents.length != 0;
    }
}
Base.readOnlyWrappedList(Experiment, "parents", Strain);

/**
 * Strains box
 */
export class Strains extends Collapsable {

}

export class NewExperiment extends Experiment {

}

/**
 * UIModel
 */
export class UIModel extends Base {
    // here we declare fields defined with Base.defineStaticField below
    strains:Strains;
    new_experiment:NewExperiment;

    get(str:string):Collapsable {
        if (str == 'strains') {
            return this.strains;
        }
        else if (str == 'new_experiment') {
            return this.new_experiment;
        }
        else {
            throw "Error " + str;
        }
    }
}
Base.readOnlyWrappedField(UIModel, "strains", Strains);
Base.readOnlyWrappedField(UIModel, "new_experiment", NewExperiment);


/**
 * Top wraps JSON its structure is:
 *      model -- this is passed to GWT
 *      ui -- this is wrapped by UIModel
 */
export class Top extends Base {
    // here we declare fields defined with Base.defineStaticField below
    backend:any;
    ui:UIModel;
}
Base.defineStaticRWField(Top, "backend", {});
Base.readOnlyWrappedField(Top, "ui", UIModel);
