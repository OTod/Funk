define(['instruments/vDom/NodesOperations', 'components/addMessage'], function(
    { createElement },
    addMessage
) {
    return function createButton(vDom) {
        debugger;
        let el = createElement('button');
        el.classes.push('buttonElement');
        el.innerText = 'clickMe';
        el.events = {
            click: addMessage.bind(null, vDom),
        };
        vDom.children.set(el.id, el);

        return vDom;
    };
});
