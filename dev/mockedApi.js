// const response = [
//     { name: 'James', surname: 'Hetfield' },
//     { name: 'Kirk', surname: 'Hammet' },
//     { name: 'Lars', surname: 'Ulrich' },
//     { name: 'Roberto', surname: 'Trujillo' },
// ];

// function getInfo() {
//     return new Promise((resolve, reject) => {
//         let variativity = Math.random();
//         setTimeout(() => {
//             if (variativity * 10 <= 5) {
//                 resolve(response);
//             } else {
//                 reject('unfortunate mistake occured');
//             }
//         }, 1500);
//     });
// }

function getObject(nestingDepth, quantityPerLevel) {
    let obj = {};
    for (let i = 1; i <= quantityPerLevel; i++) {
        obj['key' + i] = 'value' + i;
        let value =
            nestingDepth > 1
                ? getObject(nestingDepth - 1, quantityPerLevel)
                : { finalKey: 'finalValue' };
        obj['nested' + i + '_level' + nestingDepth] = value;
    }

    return obj;
}
