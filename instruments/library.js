/**
 * Set can be used for storing unique datatypes. Better to use weakset later(?)
 *
 * map is better - easier to get value from.
 *
 * getValue
 * AddValue
 * check if the value is there
 * if the value is there - change the children signature to hash
 * ADD to library function returns the hash which can be used as a key to the item - unique id
 *
 *
 */

const dictionary = new Map();

/**
 *
 * @param {Object} vDomNode
 */
function store(vDomNode) {
    delete vDomNode.id;
    const vDomString = JSON.stringify(vDomNode);
    const vDomStringHash = lineToHash(vDomString);
    let dictionary = getDictionary();
    if (!dictionary.has(vDomStringHash)) {
        setDictionary(vDomStringHash, vDomString);
    }
    return vDomStringHash;
}

function getDictionary() {
    return dictionary;
}

function setDictionary(key, value) {
    let dictionary = getDictionary();
    dictionary.set(key, value);
}

function checkIfDictionaryHas(vDomNode) {
    delete vDomNode.id;
    const dictionary = getDictionary();
    if (dictionary.has(JSON.stringify(vDomNode))) {
        return lineToHash(JSON.stringify(vDomNode));
    }
    return false;
}

function retrieve(hashIndex) {
    let dictionary = getDictionary();
    return JSON.parse(dictionary.get(hashIndex));
}

function lineToHash(line) {
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
