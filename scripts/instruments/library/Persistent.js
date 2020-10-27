define(['instruments/library/library'], function({
    store,
    get,
    change,
    getDictionary,
}) {
    let dictionary = getDictionary();
    let transform = function(object) {
        if (object instanceof Map) {
            for (var [key, value] of object) {
                if (typeof value === 'object') {
                    object.set(key, dictionary[transform(value)]);
                }
            }
        } else {
            for (let entity in object) {
                if (typeof object[entity] === 'object') {
                    object[entity] = dictionary[transform(object[entity])];
                }
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
