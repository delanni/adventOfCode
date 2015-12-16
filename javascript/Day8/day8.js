var require = require || null;
if (require) {
    var document = require("../nodeDocumentShim");
}
var performance = performance || Date;

// Part 1

// Algo start
var t0 = performance.now();
var escaped = document.body.textContent.trim().split("\n").reduce((agg, next) => agg + next.length, 0);

var unescaped = document.body.textContent.trim().split("\n").reduce((agg, next) => agg + eval(next).length, 0);

var diff = escaped - unescaped;
var t1 = performance.now();

console.log(`Part1: ${diff}, in ${t1-t0}ms`);


// Part 2
t0 = performance.now()
var superEscaped = document.body.textContent.trim().split("\n").reduce((agg, next) => {
    var nBackslash = (next.match(/\\/g)||"").length;
    var nQuote = (next.match(/\"/g)||"").length;
    return agg + 2 + nBackslash + nQuote + next.length; 
}, 0);

var otherDiff = superEscaped - escaped;
t1 = performance.now();

console.log(`Part2: ${otherDiff}, in ${t1-t0}`);