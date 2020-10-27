define(function() {
    return {
        initialize: function() {
            return {
                id: '__container__0',
                parentId: '', // * as an idea to partial render of the tree, having the parent inside the node would ease the searhing process
                tag: 'div',
                children: new Map(),
                classes: [],
                events: {},
                innerText: '',
                rendered: false,
            };
        },

        render: function(vDom) {
            let actualDomNodes = this.renderRecurcively(null, vDom);
            document.body.innerHTML = '';
            document.body.appendChild(actualDomNodes);
        },

        renderRecurcively: function(parentNode, childNode) {
            let el = document.createElement(childNode.tag);
            el.innerText = childNode.innerText;

            if (Object.keys(childNode.events).length) {
                for (let eventHandler in childNode.events) {
                    el.addEventListener(eventHandler, () => {
                        const modifiedVDom = childNode.events[eventHandler]();
                        this.render(modifiedVDom); // todo: remove and change to event propagation
                        // childNode.events[eventHandler]();
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
            // if (Object.keys(childNode.children).length) {
            //     for (let node in childNode.children) {
            //         debugger;
            //         this.renderRecurcively(el, childNode.children[node]);
            //     }
            // }
            if (childNode.children.size) {
                for (const node of childNode.children) {
                    this.renderRecurcively(el, childNode.children.get(node[0]));
                }
            }
            childNode.rendered = true;
            return el;
        },
    };
});
