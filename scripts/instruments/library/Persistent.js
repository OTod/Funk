define(['instruments/library/library'], function({
    store,
    get,
    change,
    getDictionary,
}) {
    let transform = function(object) {
        let dictionary = getDictionary();
        for (let entity in object) {
            if (typeof object[entity] === 'object') {
                object[entity] = dictionary[transform(object[entity])]; // todo: change access to dictionary - seems weird
            }
        }
        return store(object);
    };

    let persistent = {
        getValue: function(hashKey) {
            return get(hashKey);
        },
        make(object) {
            const hashKey = transform(object);
            // this.hashKey = hashKey;
            // addVersion(hashKey);

            return {
                hashKey,
                versions: [hashKey],
            };
        },
        change(persistentObject, path, value) {
            let hashKey = change(persistentObject.hashKey, path, value);
            let versions = [hashKey].concat(persistentObject.versions);

            return {
                hashKey,
                versions,
            };
        },
    };

    return persistent;
});
