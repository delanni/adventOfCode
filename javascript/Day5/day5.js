var require = require || null;
if (require) {
    var document = require("../nodeDocumentShim");
}
var performance = performance || Date;

// Algo start
var t0 = performance.now();

var validityPredicate = function (str) {
    str = str.trim();
    if (str.match(/(ab)|(cd)|(pq)|(xy)/g)) return false;
    var vowelMatches = str.match(/[aeiou]/g);
    if (vowelMatches && vowelMatches.length >= 3 && str.match(/(.)\1/g)) return true;
    return false;
}

var goodOnes = document.body.textContent.trim().split("\n").filter(validityPredicate).length;

var t1 = performance.now();
console.log(`Part1: ${goodOnes}, in ${t1-t0}ms`);


// Part 2
// Algo start
t0 = performance.now();

var validityPredicate2 = function (str) {
    str = str.trim();
    var crit1 = false;
    var crit2 = false;
    outer:
    for (var i=0;i<str.length-3;i++){
        var ref = str.substr(i,2);
        for (var j=i+2; j<str.length-1;j++){
            var test = str.substr(j,2);
            if (ref == test) {
                crit1 = true;
                break outer;
            }
        }
    }
    for (var i=0; i<str.length-2; i++){
        var snip = str.substr(i,3);
        if (snip[0]==snip[2]) {
            crit2 = true;
            break;
        }
    }
    
    return crit1 && crit2;
}

var reallyGoodOnes = document.body.textContent.trim().split("\n").filter(validityPredicate2).length;

var t2 = performance.now();
console.log(`Part1: ${reallyGoodOnes}, in ${t2-t0}ms`);