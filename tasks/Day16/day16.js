var require = require || null;
if (require) {
    var document = require("../nodeDocumentShim");
}
var performance = performance || Date;

// Collect the Sues from the text
var sues = document.body.textContent.trim().split("\n").map(x => {
    var parts = x.split(/\d+:/);
    var knowledge = parts[1].replace(/[a-z]+/g, a => `"${a}"`);
    var aunt = JSON.parse(`{ ${knowledge} }`);
    aunt.name = x.split(":")[0];
    aunt.id = +aunt.name.match(/\d+/);
    return aunt;
});

// This is what we have to compare to
var testResult = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1
};

// A function to test with
var testAunt = function (ref, aunt) {
    // Calculate difference, and drop unknown and 0 values
    var diffs = Object.keys(ref).map(x => ref[x] - aunt[x]).filter(x => x);
    var absDiff = diffs.reduce((a, b) => a + Math.abs(b), 0);
    return absDiff;
};

var t0 = performance.now();

var values = sues.map(x => testAunt(testResult, x));
var minDiff = Math.min(...values);
var sueIndex = values.indexOf(minDiff);

var t1 = performance.now();

console.log(`Part1: ${sueIndex+1}, in ${t1-t0}ms`);

// Sues should now have more than the given [trees,cats], and have less than [pomeranians,goldfish] - filter candidates
var sureSues = sues.filter(x => {
    // Check if a particular sue fits the criteria, and if she does, disregard the range-ish criterion.
    var ok = true;
    if (x.hasOwnProperty("trees")) if (x.trees <= testResult.trees) ok = false; else delete x.trees;
    if (x.hasOwnProperty("cats")) if (x.cats <= testResult.cats) ok = false; else delete x.cats;
    if (x.hasOwnProperty("pomeranians")) if (x.pomeranians >= testResult.pomeranians) ok=false; else delete x.pomeranians;
    if (x.hasOwnProperty("goldfish")) if (x.goldfish >= testResult.goldfish) ok = false; else delete x.goldfish;
    return ok;
});

// Map aunt values, find min, then pick the one Aunt who scored that minimum value
var sureValues = sureSues.map(x => testAunt(testResult, x));
var sureMinDiff = Math.min(...sureValues);
var sureSueIndex = sureValues.indexOf(sureMinDiff);
var sureSue = sureSues[sureSueIndex];

console.log(`Part2: ${sureSue.id}, in ${t1-t0}ms`);