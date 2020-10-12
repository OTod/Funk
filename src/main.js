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

let obj = JSON.parse(`{
    "_id": "5f832d8dcfc6a25e74bdf23c",
    "index": 0,
    "phone": "+1 (978) 531-2723",
    "address": "594 Bowery Street, Wilsonia, Oklahoma, 9781",
    "registered": "2014-01-05T04:17:39 -02:00",
    "latitude": 60.210296,
    "longitude": 146.708432,
    "friends": 
      {
        "id": 0,
        "name": "Sharlene Mills",
        "children": {
          "id1": {
            "name": "Henrietta"
          },
          "id2": {
            "name": "Judith"
          }
        }
      }
    ,
    "greeting": "Hello, undefined! You have 7 unread messages.",
    "favoriteFruit": "strawberry"
  }`);

function draft() {
    let obj = {
        key: 'testValue',
    };
    let obj2 = {
        asd: 'e',
        foo: 'bar',
    };
    let obj3 = {
        asd: 'e',
        foo: 'bar',
        test: { qwerty: 123 },
        baz: {
            key: 'value',
            asd: {
                qwerty: 123,
            },
        },
    };

    let pers3 = new PersistentObject(obj3);
    let big = new PersistentObject(obj);
    console.log(big);
    // pers.setData(obj2);
    let val = big.getValue();
    console.log(val);

    debugger;
    console.time('change');
    big.change(['friends', 'name'], 'updatedValue');
    console.timeEnd('change');

    console.time('incorporation');
    big.incorporateChanges(obj3);
    console.timeEnd('incorporation');

    debugger;
    // console.log(pers);
}

draft();
