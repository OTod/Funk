define(['components/registry'], function(registry) {
    return function main(vDomInitialized) {
        let vDom = Object.assign({}, vDomInitialized);
        let vDomOutput = registry.reduce((vDomAcc, vDomChangingFunction) => {
            return vDomChangingFunction(vDomAcc);
        }, vDom);
        return vDomOutput;
    };
});
