define(['instruments/vDom/NodesOperations'], function({ createElement }) {
    return function addMessage(vDom) {
        let message = createElement('span');
        message.innerText = 'new message';
        vDom.children.set(message.id, message);
        return vDom;
    };
});
