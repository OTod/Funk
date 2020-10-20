function PersistentObject(initialObj) {
    this.hashKey = '';
    this.versionsArray = [];
    this.incorporateChanges = function(obj) {
        setData.call(this, obj);
    };

    this.getValue = function() {
        return get(this.hashKey);
    };

    this.getVersion = function(hashKey) {
        return get(hashKey);
    };

    //! function is slower then overall re-making
    this.change = function(pathArray, newValue) {
        let newHash = change(this.hashKey, pathArray, newValue);
        this.hashKey = newHash;
        addVersion.call(this, newHash);
    };

    let transform = function(object) {
        for (entity in object) {
            if (typeof object[entity] === 'object') {
                object[entity] = dictionary[transform(object[entity])]; // todo: change access to dictionary - seems weird
            }
        }
        return store(object);
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
}
