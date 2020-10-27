define(['instruments/vDom/NodesOperations'], function({ createElement }) {
    return function createInnerText(vDom) {
        let el = createElement('div');
        el.classes.push('element');
        el.innerText = 'sample text';
        vDom.children.set(el.id, el);
        return vDom;
    };
});
