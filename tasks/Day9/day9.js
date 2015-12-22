var require = require || null;
if (require) {
    var document = require("../nodeDocumentShim");
}
var performance = performance || Date;

// Preparations
var map = document.body.textContent.trim().split("\n").reduce((a, next) => {
    var s = next.split(" = ");
    var d = +s[1];
    s = s[0].split(" to ");
    var f = s[0];
    var t = s[1];
    a[t] = a[t] || {};
    a[t][f] = d;
    a[f] = a[f] || {};
    a[f][t] = d;
    return a;
}, {});

// I decided I'd try some best guess local algorithms, like a nearest neighbour and a minimum edge approach, aside from the exhaustive brute force method.

// Part1:

// Try nearest neighbour
var nearestNeighbourExpansion = function (startIndex) {
    var names = Object.keys(map);

    var startName = names[startIndex];
    var start = map[startName];
    names = names.filter(x => x != startName);
    var current = start;
    var d = 0;
    var path = [startName];
    while (names.length >= 1) {
        var neighbours = Object.keys(current).reduce((n, next) => {
            if (names.indexOf(next) > -1) n.push({
                name: next,
                distance: current[next]
            });
            return n;
        }, []);
        neighbours.sort((a, b) => a.distance - b.distance);
        var first = neighbours[0];
        names = names.filter(x => x != first.name);
        d += first.distance;
        current = map[first.name];
        path.push(first.name);
    }
    return d;
}

var t0 = performance.now();
var allPaths = Object.keys(map).map((x, i) => nearestNeighbourExpansion(i));
var minLength = Math.min(...allPaths);
var t1 = performance.now();
console.log(`Part1, nearestNeighbour: ${minLength}, in ${t1-t0}ms`);


// Try minimum edge approach
var tryMinEdge = function () {
    var path = [];
    var nodes = Object.keys(map).map(x => {
        return {
            name: x,
            degree: 0
        }
    });
    var nodeMap = nodes.reduce((s, n) => {
        s[n.name] = n;
        return s
    }, {});
    var edges = document.body.textContent.trim().split("\n").reduce((a, next) => {
        var p = next.match(/\w+/g);
        var names = [p[0], p[2]];
        names.sort();
        a.push({
            d: +p[3],
            f: names[0],
            t: names[1],
            fn: nodeMap[names[0]],
            tn: nodeMap[names[1]]
        });
        return a;
    }, []);

    while (edges.length > 1) {
        edges.sort((a, b) => a.d - b.d);
        var shortest = edges.shift();

        path.push(shortest);
        shortest.fn.degree++;
        shortest.tn.degree++;

        edges = edges.filter(x => (x.fn.degree + x.tn.degree < 2 && x.fn.degree < 2 && x.tn.degree < 2));
    }

    return path;
}

t0 = performance.now();
var minEdgePath = tryMinEdge();
minLength = minEdgePath.reduce((x, y) => x + y.d, 0);
t1 = performance.now();
console.log(`Part1, minEdge: ${minLength}, in ${t1-t0}ms`);

// Try optimal solution with bruteforce

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
}

var calculateLength = function (names) {
    var totalDistance = 0;
    var cityCount = names.length;
    for (var i = 0; i < names.length - 1; i++) {
        totalDistance += map[names[i]][names[(i + 1)]];
    }
    return totalDistance;
}

t0 = performance.now();
var names = Object.keys(map);
var allPaths = getAllPermutations(names);
var allLengths = allPaths.map(x => calculateLength(x));
minLength = Math.min(...allLengths);
t1 = performance.now();
console.log(`Part1, Brute force: ${minLength}, in ${t1-t0}ms`);

// END Bruteforce

// The good thing is, that the brute force covers the maximum length as well:
var maxLength = Math.max(...allLengths);
console.log(`Part2, Brute force: ${maxLength}, in no time.`);

