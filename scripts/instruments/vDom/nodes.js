define(function() {
    'use strict';

    let gen = getUniqueId();
    function* getUniqueId() {
        var id_counter = 0;
        while (true) {
            yield `__elemId_${id_counter++}`;
        }
    }

    function getVDomNodeRecursively(vDom, id) {
        let vDomNode;
        if (vDom.id === id) {
            vDomNode = vDom;
        } else {
            for (let vNode in vDom.children) {
                vDomNode = getVDomNodeRecursively(vDom.children[vNode], id);
            }
        }
        return vDomNode;
    }

    return {
        getVDomNodeById: function(vDom, id) {
            return getVDomNodeRecursively(vDom, id);
        },

        addEventHandler: function(vDomNode, eventsObject) {
            Object.assign(vDomNode.events, eventsObject);
            return vDomNode;
        },

        addClass: function(vDomNode, classArray) {
            // ! does two operations - rendered state change to be removed after hash implementation
            vDomNode.classes.push(classArray);
            vDomNode.rendered = false;
            return vDomNode;
        },

        addInnerText: function(vDomNode, text) {
            // ! does two operations - rendered state change to be removed after hash implementation
            vDomNode.innerText = text;
            vDomNode.rendered = false;
            return vDomNode;
        },

        addChild: function(vDom, parentVNode, childNode) {
            parentVNode.children[childNode.id] = childNode;
            childNode.parentId = parentVNode.id;
            parentVNode.rendered = false;
            console.log(parentVNode);
            return parentVNode;
        },

        createElement: function(tag) {
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
            // store(el);

            return el;
        },
    };
});
