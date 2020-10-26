define(['instruments/vDom/nodes'], function({
    getVDomNodeById,
    addInnerText,
    addChild,
    createElement,
}) {
    return function addMessage(vDom, params) {
        vDom = Object.assign({}, vDom);

        let holder = getVDomNodeById.call(
            getVDomNodeById,
            vDom,
            params.parentId
        );
        let message = createElement('span');

        message = addInnerText(message, 'Additional message');
        vDom = addChild(vDom, holder, message);

        //! flaws: does it would be better if it would restart whole pipe of functions again
        // triggerStateChange(vDom);
        return vDom;
    };
});
