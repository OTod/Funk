const response = [
    { name: 'James', surname: 'Hetfield' },
    { name: 'Kirk', surname: 'Hammet' },
    { name: 'Lars', surname: 'Ulrich' },
    { name: 'Roberto', surname: 'Trujillo' },
];

function getInfo() {
    return new Promise((resolve, reject) => {
        let variativity = Math.random();
        setTimeout(() => {
            if (variativity * 10 <= 5) {
                resolve(response);
            } else {
                reject('unfortunate mistake occured');
            }
        }, 1500);
    });
}

// TODO...

define(function() {
    'use strict';

    return function getObject(nestingDepth, quantityPerLevel, initialObj = {}) {
        let obj = createNObjects(initialObj, quantityPerLevel);
        if (nestingDepth > 0) {
            obj = getObject(nestingDepth - 1, quantityPerLevel, {
                ['nesting' + nestingDepth]: obj,
            });
        }
        return obj;
    };

    function createNObjects(obj, n) {
        while (n > 0) {
            obj['key' + n] = 'value' + n;
            n--;
        }
        return obj;
    }
});
