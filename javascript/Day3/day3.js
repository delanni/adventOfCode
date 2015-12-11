var require = require || null;
if (require) {
    var document = require("../nodeDocumentShim");
}

var cache = {
    "^": [0, 1],
    "<": [-1, 0],
    ">": [1, 0],
    "v": [0, -1]
};

var keymap = document.body.textContent.trim().split("").reduce((repo, next) => {
    var current = repo.current;
    current[0] += cache[next][0];
    current[1] += cache[next][1];

    if (repo[current]) repo[current]++;
    else repo[current] = 1;
    return repo;
}, {
    current: [0, 0],
    "0,0": 1
});

console.log(Object.keys(keymap).length - 1);

var keymapWithRoboSanta = document.body.textContent.trim().split("").reduce((repo, next, i) => {

    var current = repo.current[i%2];
    
    current[0] += cache[next][0];
    current[1] += cache[next][1];

    if (repo[current]) repo[current]++;
    else repo[current] = 1;
    return repo;
}, {
    current: [[0,0],[0,0]],
    "0,0": 2
});

console.log(Object.keys(keymapWithRoboSanta).length - 1);