/// <reference path="../../../starx/src/StarX/lib/require.d.ts" />
/// <reference path="../../../starx/src/StarX/lib/underscore.d.ts" />
/// <amd-dependency path="lib/underscore" />

var _ = require("lib/underscore")._;

export class Base {
    __data__:any;

    constructor(jsonmodel:any) {
        this.__data__ = jsonmodel;
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

export class Collapsable extends Base {
    expanded:bool;
    visualsVisible:bool;
    propertiesVisible:bool;
    name:string;

    update_properties(list:any[]) {
        var properties = {};
        _.each(list, function (l) {
        console.info( l );
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
    }

    get propertiesList() {
        return this.__data__.propertiesList;
    }
}
Base.defineStaticRWField(Collapsable, "expanded", false);
Base.defineStaticRWField(Collapsable, "visualsVisible", false);
Base.defineStaticRWField(Collapsable, "propertiesVisible", false);
Base.defineStaticRWField(Collapsable, "name", "--name not defined--");

/**
 * Strain class
 */
export class Strain extends Base {
    name:string;

    get properties() {
        return this.__data__;
    }
}
Base.defineStaticRWField(Strain, "name", "--name not defined--");

/**
 * Strains box
 */
export class Strains extends Collapsable {
    // here we declare fields defined with Base.defineStaticField below
    list:Strain[];

    set_list(strains:any[]):void {
        this.__data__.list = strains;
        this.update_properties([this.list]);
    }


}
Base.readOnlyWrappedList(Strains, "list", Strain);

export class NewExperiment extends Collapsable {
    parents:Strain[];

}
Base.readOnlyWrappedList(Strains, "parents", Strain);

/**
 * UIModel
 */
export class UIModel extends Base {
    // here we declare fields defined with Base.defineStaticField below
    strains:Strains;
    new_experiment:NewExperiment;

    get(str:string)
    {
        if( str == 'strains')
        {
            return this.strains;
        }
        else if( str == 'new_experiment')
        {
            return this.new_experiment;
        }
        else
        {
            throw "Error " + str ;
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
