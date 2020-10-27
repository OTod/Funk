/**
 * todo's
 *
 * -- add event handlers to the vdom
 * -- define if there is needed the separate functionalito for vdom chenging
 * ++ adapt library for the map()
 * -- add check of the correct path for changes incorporation
 *
 *
 */

define([
    'components/registry',
    'library/Persistent',
    'library/library',
], function(registry, Persistent, library) {
    let testObj = {
        a: 'value',
        b: new Map([
            [
                'c',
                {
                    d: 'value2',
                    e: new Map([['mapKey2', 'mapValue2']]),
                },
            ],
        ]),
    };

    let ptest = Persistent.make(testObj);
    let dict = library.getDictionary();

    let changed = Persistent.change(ptest, ['b', 'c', 'd'], 'new value 2');

    return function main(vDomInitialized) {
        let vDom = Object.assign({}, vDomInitialized);
        let vDomOutput = registry.reduce((vDomAcc, vDomChangingFunction) => {
            return vDomChangingFunction(vDomAcc);
        }, vDom);
        return vDomOutput;
    };
});
