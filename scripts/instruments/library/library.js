/**
 * ++adding of the objects with nested objects
 * ++ retrieve full object
 * ++ incorporate staged changes
 * ++ incorporate full object as a change
 * ++ change library from storing strings to storing plane objects
 * ++ check if the objects are still immutable
 * ++ check if the objects returned are still the same ones kept in the library
 * ++ CONCERN: thath the objects do not keep their links, and are able to be removed via garbage collector
 * ++ обработать ссылки. Преобразование фрозен-обьектов в новые с последующей заморозкой - походу плохая идея. Найти способ раскрывать обьекты.
 *
 * -- clear and architectural refactoring
 * -- re-naming
 * -- check performance of change operation
 * -- add path check for change operation
 * -- add arrays support
 */

define(function() {
    'use strict';
    let dictionary = {};
    const HASH_ID_PREFIX = 'hashId_';

    function getHash(line) {
        var hash = 0,
            i,
            chr;
        for (i = 0; i < line.length; i++) {
            chr = line.charCodeAt(i);
            hash = (hash << 5) - hash + chr;
            hash |= 0;
        }
        return hash;
    }

    function addToDictionary(obj) {
        let objString = JSON.stringify(obj);
        let hashKey = HASH_ID_PREFIX + getHash(objString);
        // dictionary[hashKey] = objString;
        dictionary[hashKey] = Object.freeze(obj);
        return hashKey;
    }

    function getFromDictionary(hashKey) {
        let value = dictionary[hashKey];
        return value;
    }

    return {
        store: function(obj) {
            return addToDictionary(obj);
        },

        get: function(hashKey) {
            return getFromDictionary(hashKey);
        },

        change: function(hashId, pathArray, newValue) {
            let initialObj = dictionary[hashId];
            let objectsToChangeArray = [initialObj];
            let propertyKey = pathArray.pop();
            pathArray.forEach(path => {
                let currentLevelObj =
                    objectsToChangeArray[objectsToChangeArray.length - 1];
                let id = addToDictionary(currentLevelObj[path]);
                objectsToChangeArray.push(getFromDictionary(id));
            });
            let toBeUpdated = objectsToChangeArray.pop();
            let resultingIndex = addToDictionary(
                Object.assign({}, toBeUpdated, { [propertyKey]: newValue })
            );
            while (pathArray.length) {
                let key = pathArray.pop();
                let obj = Object.assign({}, objectsToChangeArray.pop());
                obj[key] = getFromDictionary(resultingIndex);
                resultingIndex = addToDictionary(obj);
            }
            debugger;
            return resultingIndex;
        },

        getDictionary: function() {
            return dictionary;
        },
    };
});
