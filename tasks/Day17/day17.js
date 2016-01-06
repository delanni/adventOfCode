var require = require || null;
if (require) {
    var document = require("../nodeDocumentShim");
}
var performance = performance || Date;

// Brute force strikes again :(

var dotProduct = (a, b) => a.reduce((s, ai, i) => s + ai * (b[i]||0), 0);

// Collect container sizes
var containers = document.body.textContent.trim().split("\n").map(x => parseInt(x)).sort((a, b) => a - b);

// Part1

var t0 = performance.now();

// Collect all combinations that result in 150L
var combinations = [];
// Taking or not taking a container is a binary flag on a container, we have ~20 containers, that means 20 flags
// This means that we can walk up to 2^20 decimally, using the binary representations as "TAKE"/"NOTAKE" flags
var A_SHITTON_OF_TIMES = Math.pow(2, containers.length);
for (var i = 0; i < A_SHITTON_OF_TIMES; i++) {
    // Map out the binary representation to an array of 0/1
    var binary = i.toString(2).split("").reverse().map(x=>+x);
    // Dot product to get the value hold in the containers
    var prod = dotProduct(containers, binary);
    // If fits, then collect
    if (prod == 150) {combinations.push(binary);}
//    if (i%(A_SHITTON_OF_TIMES/16)==0) console.log(`${i/A_SHITTON_OF_TIMES*100}%`);
}

var t1 = performance.now();

console.log(`Part1: ${combinations.length}, in ${t1-t0}ms`);

// Part2

// Check the combinations for minimum sizes
var minNumberToContain = Math.min(...combinations.map(x=>x.reduce((a,b)=>a+b)));
// Count how many times does that occurr
var combainationsOfMinSize = combinations.filter(x=>x.reduce((a,b)=>a+b) == minNumberToContain);

console.log(`Part2: ${combainationsOfMinSize.length}, in no time`);