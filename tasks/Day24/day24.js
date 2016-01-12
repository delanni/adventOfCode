// Stolen from: https://gist.github.com/axelpale/3118596
/**
 * Copyright 2012 Akseli Palén.
 * Created 2012-07-15.
 * Licensed under the MIT license.
 * 
 * <license>
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files
 * (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
 * BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * </lisence> 
 */
function k_combinations(set, k) {
    var i, j, combs, head, tailcombs;

    if (k > set.length || k <= 0) {
        return [];
    }

    if (k == set.length) {
        return [set];
    }

    if (k == 1) {
        combs = [];
        for (i = 0; i < set.length; i++) {
            combs.push([set[i]]);
        }
        return combs;
    }

    // Assert {1 < k < set.length}

    combs = [];
    for (i = 0; i < set.length - k + 1; i++) {
        head = set.slice(i, i + 1);
        tailcombs = k_combinations(set.slice(i + 1), k - 1);
        for (j = 0; j < tailcombs.length; j++) {
            combs.push(head.concat(tailcombs[j]));
        }
    }
    return combs;
}

var require = require || null;
if (require) {
    var document = require("../nodeDocumentShim");
}
var performance = performance || Date;

var sum = (x, y) => x + y;
var product = (x, y) => x * y;

var ns = document.body.textContent.trim().split("\n").map(x => +x);
var total = ns.reduce((x, y) => x + y);
var third = Math.floor(total / 3);


var findCheapestGoodOrder = function () {
    var currentSetSize = 1;
    while (currentSetSize <= ns.length) {
        var combinationsOfGivenLength = k_combinations(ns, currentSetSize);

        var candidates = combinationsOfGivenLength.filter(x => x.reduce(sum) == third);
        candidates.sort((a, b) => a.reduce(product) - b.reduce(product));
        var firstGoodCandidate = candidates.find(candidate => {
            var remainder = ns.filter(x => candidate.indexOf(x) < 0);
            var subComboSize = 1;
            var subCandidates;
            while (remainder.length >= subComboSize) {
                var subcombosOfSize = k_combinations(remainder, subComboSize);
                subCandidates = subcombosOfSize.filter(x => x.reduce(sum) == third);
                if (subCandidates.length) {
                    return true;
                } else {
                    subComboSize++;
                }
            }
            return false;
        });
        if (firstGoodCandidate) {
            return firstGoodCandidate;
        } else {
            currentSetSize++
        }
    }
    return -Infinity;
}
var t0 = performance.now();
var minimalQE = findCheapestGoodOrder().reduce(product);
var t1 = performance.now();

console.log(`Part1: ${minimalQE}, in ${t1-t0}ms`);

// Shit, now for 4 levels... I don't want to make it generic now...
var fourth = total / 4;
var iHopeYouAreNotInterestedInThisSolutionEspecially = function () {
    var currentSetSize = 1;
    while (currentSetSize <= ns.length) {
        var combinationsOfGivenLength = k_combinations(ns, currentSetSize);

        var candidates = combinationsOfGivenLength.filter(x => x.reduce(sum) == fourth);
        candidates.sort((a, b) => a.reduce(product) - b.reduce(product));

        var firstGoodCandidate = candidates.find(candidate => {
            var remainder = ns.filter(x => candidate.indexOf(x) < 0);
            var subComboSize = 1;
            while (remainder.length >= subComboSize) {
                var subcombosOfSize = k_combinations(remainder, subComboSize);
                var subCandidates = subcombosOfSize.filter(x => x.reduce(sum) == fourth);
                if (subCandidates.length) {
                    var subsubCandidates = subCandidates.find(subCandidate => {
                        var remainderOfRemainder = remainder.filter(x => subCandidate.indexOf(x) < 0);
                        return canBeSplitInto2(remainderOfRemainder, fourth);
                    });
                    return subsubCandidates;
                } else {
                    subComboSize++;
                }
            }
            return false;
        });
        if (firstGoodCandidate) {
            return firstGoodCandidate;
        } else {
            currentSetSize++
        }
    }
    return -Infinity;
}

var canBeSplitInto2 = function (array, target) {
    var currentSize = 1;
    while (currentSize <= array.length) {
        var combinationsOfSize = k_combinations(array, currentSize);
        var match = combinationsOfSize.some(x => x.reduce(sum) == target);
        if (match) {
            return match;
        } else {
            currentSize++;
        }
    }
    return false;
}

t0 = performance.now();
var minimalQEFor4WaySplit = iHopeYouAreNotInterestedInThisSolutionEspecially().reduce(product);
t1 = performance.now();

console.log(`Part2: ${minimalQEFor4WaySplit}, in ${t1-t0}ms`);