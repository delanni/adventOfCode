var require = require || null;
if (require) {
    var document = require("../nodeDocumentShim");
}

var performance = performance || Date;

// Part1 

var t0 = performance.now();
// This is a simple one: match to the number-like expressions, and sum them
var sumOfNumbers = document.body.textContent.match(/-?\d+/g).map(x => Number(x)).reduce((x, y) => x + y);

var t1 = performance.now();
console.log(`Part1: ${sumOfNumbers}, in ${t1-t0}ms`);


// Part2 

t0 = performance.now();
var hasRed = function (o) {
    return !(o instanceof Array) && Object.keys(o).map(x => o[x]).indexOf("red") != -1;
};

var deredify = function (o) {
    if (typeof o == "object")
        for (var k in o) {
            if (hasRed(o[k])) delete o[k];
            else deredify(o[k]);
        }
};

var o = JSON.parse(document.body.textContent);
deredify(o);
var json = JSON.stringify(o);

var sumOfNumbersWithoutRed = json.match(/-?\d+/g).map(x => Number(x)).reduce((x, y) => x + y);
t1 = performance.now();

console.log(`Part2: ${sumOfNumbersWithoutRed}, in ${t1-t0}ms`);
