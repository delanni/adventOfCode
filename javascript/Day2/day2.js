var require = require || null;
if (require) {
    var document = require("../nodeDocumentShim");
}

// Part 1: Sum of sides + smallest side

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
edgeList.map(box => {
    var sides = [box[0] * box[1], box[1] * box[2], box[0] * box[2]];
    return Math.min(sides[0], sides[1], sides[2]) + 2 * (sides[0] + sides[1] + sides[2]);
}).reduce(sum);

console.log(totalArea);


// Part 2: Twice the sum of the smallest two sides, plus the product of all sides

// Again, an ugly oneliner
var totalRibbon = edgeList.reduce((ribbonSoFar, next) => {
    next.sort((a, b) => a - b);
    return ribbonSoFar + 2 * (next[0] + next[1]) + next[0] * next[1] * next[2];
}, 0);

// and the prettier one
edgeList.map(box => 2 * (box.reduce(sum) - Math.max(...box)) + box.reduce((x, y) => x * y)).reduce(sum);

console.log(totalRibbon);