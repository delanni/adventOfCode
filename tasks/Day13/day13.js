var require = require || null;
if (require) {
    var document = require("../nodeDocumentShim");
}
var performance = performance || Date;

// Part1 

// Process data, and build graph from it
var parts = document.body.textContent.trim().split("\n").map(x => x.match(/([A-Z][a-z]+)|(\d)+|(lose|gain)/g));

var entries = parts.map(x => {
    return {
        from: x[0],
        to: x[3],
        value: (x[1] == "lose" ? -1 : 1) * Number(x[2])
    };
});

var graph = entries.reduce((s, n) => {
    if (!s[n.from]) s[n.from] = {};
    s[n.from][n.to] = n.value;
    return s;
}, {});


// Once again, a travelling salesman problem. For optimal solution, you can't really do better than try everything out.

// Value function
var countSettlementValue = function (order) {
    var totalValue = 0;
    for (var i = 0; i < order.length; i++) {
        var a = order[i];
        var b = order[(i + 1) % order.length];

        totalValue += graph[a][b] + graph[b][a];
    }
    return totalValue;
};

// Permutations from a previous task
var getAllPermutations = function (arr) {
    if (arr.length == 1) {
        return arr
    } else {
        var top = arr.map(i => {
            var subl = arr.filter(x => x != i);
            var subp = getAllPermutations(subl);
            var coerced = subp.map(x => [i].concat(x));
            return coerced;
        });
        return top.reduce((a, n) => a.concat(n));
    }
};

var t0 = performance.now();

// Get all possible orderings, calculate value for all, and get the max value
var people = Object.keys(graph);
var permutations = getAllPermutations(people);
var values = permutations.map(x => countSettlementValue(x));
var maxValue = Math.max(...values);

var t1 = performance.now();

console.log(`Part1: ${maxValue}, in ${t1-t0}ms`);

// Part 2

// Just add myself to the graph, and redo the whole procedure:
graph["Alex"] = people.reduce((s, n) => {
    s[n] = 0;
    graph[n]["Alex"] = 0;
    return s;
}, {});

t0 = performance.now();

// Get all possible orderings, calculate value for all, and get the max value
people = Object.keys(graph);
permutations = getAllPermutations(people);
values = permutations.map(x => countSettlementValue(x));

// Chrome & node cannot handle this many arguments to Math.max, so manual max search
maxValue = values.reduce((max,next) => next>max?next:max, -Infinity);

t1 = performance.now();

console.log(`Part2: ${maxValue}, in ${t1-t0}ms`);