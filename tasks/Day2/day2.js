var require = require || null;
if (require) {
    var document = require("../nodeDocumentShim");
}
var performance = performance || Date;

// Part 1: Sum of sides + smallest side
// Algo start
var t0 = performance.now();

// Parse input string
var edgeList = document.body.textContent.trim().split("\n").map(x => x.split("x").map(e => parseInt(e)));

// To prettify later code, here is a function for summing over a .reduce function:
var sum = (x, y) => x + y;

// Reduce with a neat oneliner
var totalArea = edgeList.reduce((areaSoFar, next) => {
    next.sort((a, b) => a - b);
    return areaSoFar + 2 * (next[0] * next[1] + next[1] * next[2] + next[0] * next[2]) + next[0] * next[1]
}, 0);

// A prettier, more didactically fair solution would be:
//edgeList.map(box => {
//    var sides = [box[0] * box[1], box[1] * box[2], box[0] * box[2]];
//    return Math.min(sides[0], sides[1], sides[2]) + 2 * (sides[0] + sides[1] + sides[2]);
//}).reduce(sum);

var t1 = performance.now();
console.log(`Part1: ${totalArea}, in ${t1-t0}ms`);


// Part 2: Twice the sum of the smallest two sides, plus the product of all sides
// Algo start, plus the edge list recount, so that we count that time in both solutions
t0 = performance.now();
edgeList = document.body.textContent.trim().split("\n").map(x => x.split("x").map(e => parseInt(e)));

// Again, an ugly oneliner
var totalRibbon = edgeList.reduce((ribbonSoFar, next) => {
    next.sort((a, b) => a - b);
    return ribbonSoFar + 2 * (next[0] + next[1]) + next[0] * next[1] * next[2];
}, 0);

// and the prettier one
//edgeList.map(box => 2 * (box.reduce(sum) - Math.max(...box)) + box.reduce((x, y) => x * y)).reduce(sum);

var t2 = performance.now();
console.log(`Part2: ${totalRibbon}, in ${t2-t0}ms`);