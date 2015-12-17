var performance = performance || Date;

var input = "1113122113"

// Create the core function to mimic the saying out loud mechanic
var sayOutLout = function(string){
    var n = 0;
    var c = string[0];
    var out = "";
    for (var i=0;i<string.length;i++){
        var char = string[i];
        if (char!=c){
            out+=n+c;
            c = char;
            n=1;
        } else {
            n++;
        }
    }
    out+=n+c;
    return out;
}

// This is how you do it with Regexps, but the performance is apparently slower.
var regexpSayOutLoud = function(c){
    return c.match(/(\d)\1*/g).map(function(e){ return e.length + e[0] }).join("");
}

// Part 1

// Start algo
var t0 = performance.now();
var output = input;
for (var i=0;i<40;i++){
    output = sayOutLout(output);
}
var t1 = performance.now();

console.log(`Part1: ${output.length}, in ${t1-t0}ms`);

// Part 2

t0 = performance.now();
output = input;
for (var i=0;i<50;i++){
    output = sayOutLout(output);
}
t1 = performance.now();

console.log(`Part2: ${output.length}, in ${t1-t0}ms`);

