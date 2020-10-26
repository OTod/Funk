define([
    'components/innerText',
    'components/testButton',
    'instruments/library/Persistent',
], function(createInnerText, createButton, Persistent) {
    return function main(vDomInitialized) {
        let vDom = Object.assign({}, vDomInitialized);
        let registry = [createInnerText, createButton]; // todo - get registration of functions out of here

        let vDomOutput = registry.reduce((vDomAcc, vDomChangingFunction) => {
            return vDomChangingFunction(vDomAcc);
        }, vDom);

        let testObj = {
            key1: 'value1',
            key2: 'value2',
            nestedKey: {
                nestedKey1: 'value',
                nestedkey2: 'value2',
                nestedKey3: {
                    simplekey1: 'line',
                },
            },
            nestedKey2: {
                simplekey1: 'line',
            },
        };

        let pTest = Persistent.make(testObj);
        debugger;

        let pTestUpdated = Persistent.change(
            pTest,
            ['nestedKey', 'nestedKey2'],
            'newValue'
        );
        debugger;

        return vDomOutput;
    };
});
