/// <reference path="../../../starx/src/StarX/lib/require.d.ts" />
/// <reference path="../../../starx/src/StarX/lib/underscore.d.ts" />
/// <amd-dependency path="lib/underscore" />

var _ = require( "lib/underscore")._;

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
                    throw "__data__["+name+"] is undefined for " + cls;
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
                    throw "__data__["+name+"] is undefined for " + cls;
                }
                return _.map(this.__data__.list, function (q) {
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
}
Base.defineStaticRWField(Strain, "name", "--name not defined--");

/**
 * Strains box
 */
export class Strains extends Base {
    // here we declare fields defined with Base.defineStaticField below
    expanded:bool;
    visualsVisible:bool;
    propertiesVisible:bool;
    list: Strain[];
}
Base.readOnlyWrappedList(Strains, "list" , Strain);
Base.defineStaticRWField(Strains, "expanded", false);
Base.defineStaticRWField(Strains, "visualsVisible", false);
Base.defineStaticRWField(Strains, "propertiesVisible", false);

/**
 * UIModel
 */
export class UIModel extends Base {
    // here we declare fields defined with Base.defineStaticField below
    strains:Strains;
}
Base.readOnlyWrappedField(UIModel, "strains", Strains);


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
