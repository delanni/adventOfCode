var require = require || null;
if (require) {
    var document = require("../nodeDocumentShim");
}
var performance = performance || Date;

var customJoin = function (array, joiner) {
    var text = array[0];
    for (var i = 1; i < array.length; i++) {
        var mid = joiner[i - 1];
        text += mid + array[i];
    }
    return text;
};

var createJoiner = function (length, filler, idx, replacement) {
    var inner = new Array(length).fill(filler);
    inner.name = filler;
    inner[idx] = replacement;
    return inner;
};

var createJoiners = function (length, filler, replacement) {
    var joiners = [];
    for (var i = 0; i < length; i++) {
        joiners.push(createJoiner(length, filler, i, replacement));
    }
    return joiners;
};

var t0 = performance.now();

var lines = document.body.textContent.trim().split("\n");

var text = lines.pop();
lines.pop();

var ruleObj = lines.reduce((o, next) => {
    var p = next.trim().split(" => ");
    var name = p[0];
    var replacement = p[1];

    o[name] = o[name] || [];
    o[name].push(replacement);

    return o;
}, {});

var rules = lines.reduce((o, next) => {
    var p = next.trim().split(" => ");
    var name = p[0];
    var replacement = p[1];

    o.push(p);

    return o;
}, []);

var joiners = rules.reduce((joiners, next) => {
    var name = next[0];
    var repl = next[1];
    var regexp = new RegExp(name, "g");
    var n = (text.match(regexp) || []).length;

    var newJoiners = createJoiners(n, name, repl);
    return joiners.concat(newJoiners);
}, []);

var strings = joiners.reduce((strings, nextJoiner) => {
    var str = customJoin(text.split(nextJoiner.name), nextJoiner);
    strings[str] = str;
    return strings;
}, {});

var countOfDistinctOutputs = Object.keys(strings).length;
var t1 = performance.now();

console.log(`Part1: ${countOfDistinctOutputs}, in ${t1-t0}ms`);

t0 = performance.now();
var antirules = rules.map(x=> [x[1],x[0]]);

var tryToApplyRule = function(rule, text){
    if (text.match(rule[0])){
        return text.replace(rule[0], rule[1]);
    } else return false;
}

var reduceUntilE = function(text, rules){
    var totalCount = 0;
    while(text!="e"){
        for(var i=0;i<rules.length;i++){
            var result = tryToApplyRule(rules[i], text);
            if (result){
                totalCount++;
                text = result;
            }
        }
    }
    return totalCount;
}

var totalReductionCost = reduceUntilE(text, antirules);
t1 = performance.now();

console.log(`Part2: ${totalReductionCost}, in ${t1-t0}ms`);