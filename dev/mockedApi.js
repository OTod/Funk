const data = [
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
                resolve(data);
            } else {
                reject('unfortunate mistake occured');
            }
        }, 1500);
    });
}
