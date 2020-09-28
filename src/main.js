function main(vDomInitialized) {
    let vDom = Object.assign({}, vDomInitialized);
    let arr = [createInnerText, createButton];

    vDomOutput = arr.reduce((vDomAcc, vDomChangingFunction) => {
        //add some condition based on vDomChangingFunction necessity to be performed - if not, then do nothing (return vDomAcc)
        debugger;
        return vDomChangingFunction(vDomAcc);
    }, vDom);

    return vDomOutput;
}

// dirty function - event listener
function addMessage(vDom, params) {
    vDom = Object.assign({}, vDom);

    // let holder = getVDomNodeById(vDom, params.parentId);
    let { holder } = params;
    let message = createElement('span');

    message = addInnerText(message, 'Additional message');
    vDom = addChild(vDom, holder, message);

    return vDom;
}

function createInnerText(vDom) {
    vDom = addChild(
        vDom,
        vDom,
        addClass(addInnerText(createElement('div'), 'innerText'), ['element'])
    );
    return vDom;
}

function createButton(vDom) {
    button = addEventHandler(
        addClass(
            addInnerText(createElement('button'), 'clickMe'),
            'buttonElement'
        ),
        {
            click: addMessage.bind(null, vDom, {
                holder: getVDomNodeById(vDom, '__elemId_0'),
            }),
        }
    );
    vDom = addChild(vDom, getVDomNodeById(vDom, '__elemId_0'), button);
    return vDom;
}
