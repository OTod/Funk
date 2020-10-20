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

    // let pers3 = new PersistentObject(obj3);
    // let pers2 = new PersistentObject(obj3);

    // pers.setData(obj2);
    // let val = pers3.getValue();
    // console.log(val);

    // pers3.change(['nest', 'deepNest', 'deeperNest', 'name'], 'updatedValue');
    // console.timeEnd('change');

    // console.log(to);
    debugger;
    // console.log(pers);
    let to32 = getObject(3, 2); //depth = 3 q-ty = 2
    let to86 = getObject(8, 6);
    let to106 = getObject(10, 6);
    let to2020 = getObject(20, 20);

    // console.log(to86);

    // console.time('32');
    // let pers32 = new PersistentObject(to32);
    // console.timeEnd('32');
    console.time('2020');
    let pers2020 = new PersistentObject(to2020);
    let value2020 = pers2020.getValue();
    console.timeEnd('2020');

    console.time('64');
    let pers86 = new PersistentObject(to86);
    console.timeEnd('64');

    console.time('106');
    let pers106 = new PersistentObject(to106);
    console.timeEnd('106');

    debugger;
}

draft();
