// all of these functions should work wit virtual dom - virtual dom Nodes only

function addEventHandler(vDomNode, eventsObject) {
    // ? seems unnecessary, can be replaced by simple object assign
    Object.assign(vDomNode.events, eventsObject);

    return vDomNode;
}

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

function addClass(vDomNode, classArray) {
    // ! does two operations
    vDomNode.classes.push(classArray);

    vDomNode.rendered = false;
    return vDomNode;
}

function addInnerText(vDomNode, text) {
    debugger;
    //!does two operations
    vDomNode.innerText = text;
    setUnrendered(vDomNode);
    // vDomNode.rendered = false;
    return vDomNode;
}

function addChild(vDom, parentVNode, childNode) {
    parentVNode.children[childNode.id] = childNode;
    // childNode.parentId = parentNode.id;
    childNode.parent = parentVNode;
    parentVNode.rendered = false;
    console.log(parentVNode);
    return parentVNode;
}

function createElement(tag) {
    let id = gen.next().value;
    debugger;
    return {
        id,
        parent: undefined,
        tag,
        children: [],
        classes: [],
        events: {},
        innerText: '',
        rendered: false,
    };
}

function setUnrendered(vNode) {
    vNode.rendered = false;
    return vNode;
}

// !keeps state
let gen = getUniqueId();
function* getUniqueId() {
    var id_counter = 0;
    while (true) {
        yield `__elemId_${id_counter++}`;
    }
}
