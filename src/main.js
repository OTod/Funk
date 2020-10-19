function main(vDomInitialized) {
    let vDom = Object.assign({}, vDomInitialized);
    let arr = [createInnerText, createButton];

    vDomOutput = arr.reduce((vDomAcc, vDomChangingFunction) => {
        //add some condition based on vDomChangingFunction necessity to be performed - if not, then do nothing (return vDomAcc)
        return vDomChangingFunction(vDomAcc);
    }, vDom);

    return vDomOutput;
}

// dirty function - event listener
function addMessage(vDom, params) {
    vDom = Object.assign({}, vDom);

    let holder = getVDomNodeById(vDom, params.parentId);
    let message = createElement('span');

    message = addInnerText(message, 'Additional message');
    vDom = addChild(vDom, holder, message);

    //! flaws: does it would be better if it would restart whole pipe of functions again
    // triggerStateChange(vDom);
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
                parentId: '__elemId_0',
            }),
        }
    );
    vDom = addChild(vDom, getVDomNodeById(vDom, '__elemId_0'), button);
    return vDom;
}

function draft() {
    let obj3 = {
        asd: 'e',
        foo: 'bar',
        nest: {
            key: ' value',
            deepNest: {
                key: 'val2',
                deeperNest: {
                    name: 'John',
                    surname: 'Doe',
                },
            },
        },
        test: { qwerty: 123 },
        baz: {
            key: 'value',
            asd: {
                qwerty: 123,
            },
        },
    };

    let pers3 = new PersistentObject(obj3);
    // pers.setData(obj2);
    let val = pers3.getValue();
    console.log(val);

    // debugger;
    // console.time('change');
    pers3.change(['nest', 'deepNest', 'deeperNest', 'name'], 'updatedValue');
    // console.timeEnd('change');

    // console.time('incorporation');
    // big.incorporateChanges(obj3);
    // console.timeEnd('incorporation');

    debugger;
    // console.log(pers);
}

draft();
