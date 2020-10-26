define(['instruments/vDom/nodes', 'components/addMessage'], function(
    {
        getVDomNodeById,
        addEventHandler,
        addClass,
        addInnerText,
        addChild,
        createElement,
    },
    addMessage
) {
    return function createButton(vDom) {
        let button = addEventHandler(
            addClass(
                addInnerText(createElement('button'), 'clickMe'),
                'buttonElement'
            ),
            {
                click: addMessage.bind(null, vDom, {
                    parentId: '__elemId_0',
                }),
            }
        );
        vDom = addChild(vDom, getVDomNodeById(vDom, '__elemId_0'), button);
        return vDom;
    };
});
