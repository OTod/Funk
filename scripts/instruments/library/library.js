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

    function mapStringifyReplacer(key, value) {
        const originalObject = this[key];
        if (originalObject instanceof Map) {
            return {
                dataType: 'Map',
                value: Array.from(originalObject.entries()), // or with spread: value: [...originalObject]
            };
        } else {
            return value;
        }
    }

    function addToDictionary(obj) {
        let objString = JSON.stringify(obj, mapStringifyReplacer);
        // obj instanceof Map
        //     ? JSON.stringify(obj, mapStringifyReplacer)
        //     : JSON.stringify(obj);
        let hashKey = HASH_ID_PREFIX + getHash(objString);
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
            //forming an array of entities to be chaned...
            pathArray.forEach(path => {
                let currentLevelObj =
                    objectsToChangeArray[objectsToChangeArray.length - 1];
                let id;
                if (currentLevelObj instanceof Map) {
                    id = addToDictionary(currentLevelObj.get(path));
                } else {
                    id = addToDictionary(currentLevelObj[path]);
                }
                objectsToChangeArray.push(getFromDictionary(id));
            });
            // creating initial index of bottom-most changed entity
            let toBeUpdated = objectsToChangeArray.pop();
            let obj;
            if (toBeUpdated instanceof Map) {
                obj = new Map(toBeUpdated);
                obj.set(propertyKey, newValue);
            } else {
                obj = Object.assign({}, toBeUpdated, {
                    [propertyKey]: newValue,
                });
            }
            let resultingIndex = addToDictionary(obj);
            // incorporating changes to the topmost entity
            while (pathArray.length) {
                let key = pathArray.pop();
                let changingObject = objectsToChangeArray.pop();
                let obj;
                if (changingObject instanceof Map) {
                    obj = new Map(changingObject);
                    obj.set(key, getFromDictionary(resultingIndex));
                } else {
                    obj = Object.assign({}, changingObject, {
                        [key]: getFromDictionary(resultingIndex),
                    });
                }
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
