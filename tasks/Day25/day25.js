var require = require || null;
if (require) {
    var document = require("../nodeDocumentShim");
}
var performance = performance || Date;

// Sorry, but at this point, I grew tired of commenting.
// Although, I believe my code is pretty enough to be self explanatory :)

var rowAndCol = document.body.textContent.trim().match(/\d+/g).map(x => parseInt(x));
var row = rowAndCol[0];
var col = rowAndCol[1];

var sumBackwards = n => n * (n + 1) / 2;
var firstNumberOfDiagonal = r => sumBackwards(r - 1) + 1;

var diagonalNumber = (row, col) => row + col - 1;

var ordinalAt = (r, c) => firstNumberOfDiagonal(diagonalNumber(r, c)) + c - 1;

var nextOfCode = code => (code * 252533) % 33554393;

var nthCode = n => {
    if (n == 1) return 20151125;
    var stored = nthCode(1);
    var current = 1;
    while (current++ < n) {
        stored = nextOfCode(stored);
    }
    return stored;
}

var codeAt = (r, c) => nthCode(ordinalAt(r, c));

var t0 = performance.now();
var code = codeAt(row, col);
var t1 = performance.now();

console.log(`Part1: ${code}, in ${t1-t0}ms`);

console.log(`Part2 is a surprise!`);