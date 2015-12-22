var require = require || null;
if (require) {
    var document = require("../nodeDocumentShim");
}
var performance = performance || Date;

var totalTime = 2503;

// Parse input text
var deers = document.body.textContent.trim().split("\n").map(x => {
    var parts = x.match(/(^\w+)|(\d+)/g);

    return {
        name: parts[0],
        speed: Number(parts[1]),
        stamina: Number(parts[2]),
        recovery: Number(parts[3]),
        cycleLength: Number(parts[2]) + Number(parts[3])
    };
});

var t0 = performance.now();
// Value function
var getPerformance = function (deer, time) {
    var ct = deer.cycleLength;
    var cycles = (time / ct) | 0;
    var remainder = time % ct;
    var distance = (Math.min(deer.stamina, remainder) + deer.stamina * cycles) * deer.speed;
    return distance;
};

// Map deer values over the given time & get max
var performances = deers.map(x => getPerformance(x, totalTime));
var maxDistance = Math.max(...performances);

var t1 = performance.now();

console.log(`Part1: ${maxDistance}, in ${t1-t0}ms`);



// Part 2
// Plots out the continuous distances over the whole interval
var getDistancePlot = function (deer, time) {
    var actualTime = 0;
    var d = 0;
    var array = new Array(time);

    while (actualTime < time) {
        var t = actualTime % deer.cycleLength;
        if (t < deer.stamina) {
            d += deer.speed;
            array[actualTime] = d;
            actualTime++;
        } else {
            array.fill(d, actualTime, actualTime + deer.recovery);
            actualTime+=deer.recovery;
        }
    }
    return array;
};

t0 = performance.now();

// Get all distance plots
var distancePlots = deers.map(x=> getDistancePlot(x, totalTime));

// Exchange current leaders to 1, laggers to 0
for(var i=0;i<totalTime; i++){
    var iStepDistances = distancePlots.map(x=> x[i]);
    var max = Math.max(...iStepDistances);
    var idx = iStepDistances.indexOf(max);
    
    for(var j=0; j<iStepDistances.length;j++){
        distancePlots[j][i]=idx==j;
    }
}

// Summarize & get max
var totalPoints = distancePlots.map(x=>x.reduce((a,b)=>a+b));
var maxPoints = Math.max(...totalPoints);

t1 = performance.now();

console.log(`Part2: ${maxPoints}, in ${t1-t0}ms`);