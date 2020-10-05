function getVDomNodeById(vDom, id) {
    let vDomNode;
    if (vDom.id === id) {
        vDomNode = vDom;
    } else {
        for (let vNode in vDom.children) {
            vDomNode = getVDomNodeById(vDom.children[vNode], id);
        }
    }
    return vDomNode;
}

function addEventHandler(vDomNode, eventsObject) {
    Object.assign(vDomNode.events, eventsObject);
    return vDomNode;
}

function addClass(vDomNode, classArray) {
    // ! does two operations - rendered state change to be removed after hash implementation
    vDomNode.classes.push(classArray);
    vDomNode.rendered = false;
    return vDomNode;
}

function addInnerText(vDomNode, text) {
    // ! does two operations - rendered state change to be removed after hash implementation
    vDomNode.innerText = text;
    vDomNode.rendered = false;
    return vDomNode;
}

function addChild(vDom, parentVNode, childNode) {
    parentVNode.children[childNode.id] = childNode;
    childNode.parentId = parentVNode.id;
    parentVNode.rendered = false;
    console.log(parentVNode);
    return parentVNode;
}

function createElement(tag) {
    let id = gen.next().value;
    let el = {
        id,
        parentId: '',
        tag,
        children: [],
        classes: [],
        events: {},
        innerText: '',
        rendered: false,
    };
    store(el);
    debugger;

    return el;
}

// !keeps state
let gen = getUniqueId();
function* getUniqueId() {
    var id_counter = 0;
    while (true) {
        yield `__elemId_${id_counter++}`;
    }
}
