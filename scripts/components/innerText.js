define(['instruments/vDom/nodes'], function({
    addClass,
    addInnerText,
    addChild,
    createElement,
}) {
    return function createInnerText(vDom) {
        vDom = addChild(
            vDom,
            vDom,
            addClass(addInnerText(createElement('div'), 'sample text'), [
                'element',
            ])
        );
        return vDom;
    };
});
