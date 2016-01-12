var require = require || null;
if (require) {
    var document = require("../nodeDocumentShim");
}
var performance = performance || Date;

var ns = document.body.textContent.trim().split("\n").slice(0,7).map(x => +x);
var sum = ns.reduce((x, y) => x + y);
var third = Math.floor(sum / 3);

Array.prototype.without = function (elements) {
    var last = elements[elements.length-1];
    var indexOfLast = this.indexOf(last);
    return this.slice(indexOfLast+1,this.length);
};

Array.prototype.matchAllElementsOf = function (elements) {
    return elements.map(x => this.concat(x));
};

var current = [];
debugger;
var goDeeper = function (base) {
    base.sort((a,b)=>a-b);
    if (base.length == ns.length) return false;
    
    if (base.reduce((a, b) => a + b, 0) > third) return false;
    
    var paired = base.matchAllElementsOf(ns.without(base));
    
    if (paired.some(x => x.reduce((a, b) => a + b) == third)) {
        
        return paired.filter(x => x.reduce((a, b) => a + b) == third);
    } else {
        var acceptable = [];
        for (var i = 0; i < paired.length; i++) {
            var res = goDeeper(paired[i]);
            if (res) {
                if (res instanceof Array) acceptable.push.apply(acceptable, res);
                else acceptable.push(res);
            }
        }
        if (acceptable.length > 0) return acceptable;
        else return false;
    }
};

var solutions = goDeeper(current);