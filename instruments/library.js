/**
 * ++adding of the objects with nested objects
 * ++ retrieve full object
 * ++ incorporate staged changes
 * ++ incorporate full object as a change
 * -- clear and architectural refactoring
 * -- re-naming
 * -- check performance of change operation
 * -- add path check for change operation
 * -- add arrays support
 * -- add garbage collector
 */

const Library = function() {
    let dictionary = {};
    const HASH_ID_PREFIX = 'hashId_';

    this.store = function(obj) {
        let objString = JSON.stringify(obj);
        let hashKey = HASH_ID_PREFIX + getHash(objString);
        dictionary[hashKey] = objString;
        return hashKey;
    };

    this.get = function(hashKey) {
        let value = JSON.parse(dictionary[hashKey]);

        for (key in value) {
            if (
                typeof value[key] === 'string' &&
                value[key].slice(0, 7) === HASH_ID_PREFIX
            ) {
                value[key] = this.get(value[key]);
            }
        }
        return value;
    };

    //! requires refactoring
    this.change = function(hashId, pathArray, newValue) {
        let initialObj = JSON.parse(dictionary[hashId]);
        let objectsToChangeArray = [initialObj];
        let propertyKey = pathArray.pop();
        pathArray.forEach(path => {
            let currentLevelObj =
                objectsToChangeArray[objectsToChangeArray.length - 1];
            objectsToChangeArray.push(
                JSON.parse(dictionary[currentLevelObj[path]])
            );
        });
        let updated = objectsToChangeArray.pop();
        updated[propertyKey] = newValue;
        let resultingIndex = this.store(updated);

        for (let i = 0; i <= pathArray.length; i++) {
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

    this.instance = this;
};

const PersistentObject = function(initialObj) {
    this.hashKey = '';
    this.versionsArray = [];

    const library = Library.instance || new Library();

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
