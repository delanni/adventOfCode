var require = require || null;
if (require) {
    var document = require("../nodeDocumentShim");
}
var performance = performance || Date;

// Preparations

// Build a wire-to-instruction map, and then resolve wires as we go along.
var store = document.body.textContent.trim().split("\n").reduce((store, next) => {
    var s = next.split(" -> ");
    var wire = s[1];
    var op = s[0];
    store[wire] = op;
    return store;
}, {});

// Create a function to resolve an operation
var cache = {};
var resolve = function(opString){
    if (cache.hasOwnProperty(opString)){
        return cache[opString];
    }
    var parts = opString.trim().split(" ");
    var retval = 0;
    if (parts.length==1){
        var c = Number(parts[0]);
        if (Number.isInteger(c)){
            retval = c;
        } else {
            retval = resolve(store[parts[0]]);
        }
    } else if(parts.length == 2) {
        // Not
        var n = resolve(parts[1]);
        var ncomp = n ^ 0xffff;
        retval = ncomp;
    } else {
        // Binary operators
        var op = parts[1];
        var a = parts[0];
        var b = parts[2];
        switch(op){
            case "AND":
                retval = resolve(a) & resolve(b);
                break;
            case "OR":
                retval = resolve(a) | resolve(b);
                break;
            case "LSHIFT":
                retval = (resolve(a) << resolve(b)) & 0xffff;
                break;
            case "RSHIFT":
                retval = (resolve(a) >> resolve(b)) & 0xffff;
                break;
        }
    }
    cache[opString] = retval;
    return retval;
}

// Do the macarena
var t0 = performance.now();
debugger;
var result = resolve("a");
var t1 = performance.now();
console.log(`Part1: ${result}, in ${t1-t0}ms`);

cache = {};
cache["b"] = result;
t0 = performance.now();
var result2 = resolve("a");
t1 = performance.now();
console.log(`Part2: ${result2}, in ${t1-t0}ms`);
