function main(vDomInitialized) {
    let vDom = Object.assign({}, vDomInitialized);

    let el = createElement('div');
    el = addInnerText(el, 'innerText');
    el = addClass(el, ['element']);

    vDom = addChild(vDom, vDom, el);

    // let button = createElement('button');
    // button = addInnerText(button, 'clickMe');
    // button = addClass(button, 'buttonElement');
    // button = addEventHandler(button, {
    //     click: addMessage.bind(null, vDom, { holder: el }),
    // });

    el = addChild(vDom, el, button);

    let arr = [];

    arr.reduce((vDomAcc, vDomChangingFunction) => {
        //add some condition based on vDomChangingFunction necessity to be performed - if not, then do nothing (return vDomAcc)
        debugger;
        return vDomChangingFunction(vDomAcc);
    });

    return vDom;
}

// dirty function
function addMessage(vDom, params) {
    vDom = Object.assign({}, vDom);

    // let holder = getVDomNodeById(vDom, params.parentId);
    let { holder } = params;
    let message = createElement('span');

    message = addInnerText(message, 'Additional message');
    vDom = addChild(vDom, holder, message);

    return vDom;
}
