/**
 * ++adding of the objects with nested objects
 * ++ retrieve full object
 * ++ incorporate staged changes
 * ++ incorporate full object as a change
 * ++ change library from storing strings to storing plane objects
 * ++ check if the objects are still immutable
 * -- check if the objects returned are still the same ones kept in the library
 * ++ CONCERN: thath the objects do not keep their links, and are able to be removed via garbage collector
 * -- обработать ссылки. Преобразование фрозен-обьектов в новые с последующей заморозкой - походу плохая идея. Найти способ раскрывать обьекты.
 *
 * -- clear and architectural refactoring
 * -- re-naming
 * -- check performance of change operation
 * -- add path check for change operation
 * -- add arrays support
 * -- add garbage collector
 */

let libraryInstance;

const Library = function() {
    let dictionary = {};
    const HASH_ID_PREFIX = 'hashId_';

    /**
     * Stores flat objects in dictionary
     * @param {Object} obj
     */
    this.store = function(obj) {
        let objString = JSON.stringify(obj);
        let hashKey = HASH_ID_PREFIX + getHash(objString);
        // dictionary[hashKey] = objString;
        dictionary[hashKey] = Object.freeze(obj);
        return hashKey;
    };

    this.get = function(hashKey) {
        // let value = JSON.parse(dictionary[hashKey]);
        let value = Object.assign({}, dictionary[hashKey]);

        for (key in value) {
            if (
                typeof value[key] === 'string' &&
                value[key].slice(0, 7) === HASH_ID_PREFIX
            ) {
                value[key] = Object.freeze(this.get(value[key]));
            }
        }
        return Object.freeze(value);
    };

    //! requires refactoring
    this.change = function(hashId, pathArray, newValue) {
        // let initialObj = JSON.parse(dictionary[hashId]);
        let initialObj = dictionary[hashId];
        let objectsToChangeArray = [Object.assign({}, initialObj)];
        let propertyKey = pathArray.pop();
        pathArray.forEach(path => {
            let currentLevelObj =
                objectsToChangeArray[objectsToChangeArray.length - 1];
            objectsToChangeArray.push(
                // JSON.parse(dictionary[currentLevelObj[path]])
                Object.assign({}, dictionary[currentLevelObj[path]])
            );
        });
        let updated = objectsToChangeArray.pop();
        updated[propertyKey] = newValue;
        let resultingIndex = this.store(updated);

        // for (let i = 0; i <= pathArray.length; i++) {
        while (pathArray.length) {
            let key = pathArray.pop();
            let obj = objectsToChangeArray.pop();
            obj[key] = resultingIndex;
            resultingIndex = this.store(obj);
        }
        debugger;
        return resultingIndex;
    };

    this.getDictionary = function() {
        return dictionary;
    };

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

    // this.instance = this;
};

const PersistentObject = function(initialObj) {
    this.hashKey = '';
    this.versionsArray = [];

    const library = libraryInstance || (libraryInstance = new Library());

    this.incorporateChanges = function(obj) {
        setData.call(this, obj);
    };

    this.getValue = function() {
        return library.get(this.hashKey);
    };

    this.getVersion = function(hashKey) {
        return library.get(hashKey);
    };

    //! function is slower then overall re-making
    this.change = function(pathArray, newValue) {
        let newHash = library.change(this.hashKey, pathArray, newValue);
        this.hashKey = newHash;
        addVersion.call(this, newHash);
    };

    let transform = function(object) {
        for (entity in object) {
            if (typeof object[entity] === 'object') {
                object[entity] = transform(object[entity]);
            }
        }
        return library.store(object);
    };

    let addVersion = function(hashKey) {
        if (
            !this.versionsArray.length ||
            this.versionsArray[this.versionsArray.length - 1] !== hashKey
        ) {
            this.versionsArray.push(hashKey);
        }
    };

    /**
     * transformation of the plain object into hash-stored one.
     * @param {Object} obj
     */
    let setData = function(obj) {
        const hashKey = transform.call(this, obj);
        this.hashKey = hashKey;
        addVersion.call(this, hashKey);
    };

    setData.call(this, initialObj);
};
