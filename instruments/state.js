function vDomInitialize() {
    // should create basic vdom - with main element as a node
    return {
        id: '__container__0',
        parentId: '', // * as an idea to partial render of the tree, having the parent inside the node would ease the searhing process
        tag: 'div',
        children: {},
        classes: [],
        events: {},
        innerText: '',
        rendered: false,
    };
}

function render(vDom) {
    let actualDomNodes = renderRecurcively(null, vDom);
    document.body.innerHTML = '';
    document.body.appendChild(actualDomNodes);
}

function renderRecurcively(parentNode, childNode) {
    let el = document.createElement(childNode.tag);
    el.innerText = childNode.innerText;

    if (Object.keys(childNode.events).length) {
        for (let eventHandler in childNode.events) {
            el.addEventListener(eventHandler, () => {
                childNode.events[eventHandler]();
            });
        }
    }

    if (childNode.classes.length) {
        el.classList.add(childNode.classes);
    }
    if (parentNode) {
        parentNode.appendChild(el);
    }
    el.setAttribute('_vDomId', childNode.id);
    if (Object.keys(childNode.children).length) {
        for (let node in childNode.children) {
            renderRecurcively(el, childNode.children[node]);
        }
    }
    childNode.rendered = true;
    return el;
}

// todo: check and refactor
function triggerStateChange(vDom) {
    debugger;
    render(vDom);
}
