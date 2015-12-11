var require = require || null;
if (require) {
    var document = require("../nodeDocumentShim");
}

var performance = performance || Date;


// Build a cache for code to step resolving
var cache = {
    "^": [0, 1],
    "<": [-1, 0],
    ">": [1, 0],
    "v": [0, -1]
};

// Algo start
var t0 = performance.now();

// Gather all visited house coordinates to an object
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

// Get distinct house coords by getting the keys - 1 for the "current" key
var housesWithSanta = Object.keys(keymap).length - 1;
var t1 = performance.now();
console.log(`Part1: ${housesWithSanta}, in ${t1-t0}ms`);

t0 = performance.now();

// Gather all visited house coordinates for 2 different "current" trackers for the two santas, just like before
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

// Get distinct house coords by getting the keys - 1 for the "current" key
var housesWithRoboSanta = Object.keys(keymapWithRoboSanta).length - 1;
var t2 = performance.now();
console.log(`Part2: ${housesWithRoboSanta}, in ${t2-t0}ms`);