var require = require || null;
if (require) {
    var document = require("../nodeDocumentShim");
}
var performance = performance || Date;

// Preparations

var parseRange = line => line.split(" ")
    .reverse()
    .slice(0, 3)
    .reverse()
    .filter((x, i) => i != 1)
    .map(o => {
        return {
            x: parseInt(o.split(",")[0]),
            y: parseInt(o.split(",")[1])
        }
    });

var instructions = document.body.textContent.trim()
    .split("\n")
    .map(x => {
        return {
            operation: {"n": "|", "f": "&", " ": "^"}[x[6]],
            range: parseRange(x)
        }
    });

// Part 1
// Algo start
var t0 = performance.now();

var map = new Array(1000).fill(0).map(x=> new Array(1000).fill(0) );

instructions.forEach((instruction,i)=>{
    var from = instruction.range[0];
    var to = instruction.range[1];
    var op = instruction.operation;
    
    for(var x=from.x; x<=to.x; x++){
        for(var y=from.y; y<=to.y; y++){
            switch(op){
                case "^":
                    map[x][y]^=1;
                    break;
                case "&":
                    map[x][y]=0;
                    break;
                case "|":
                    map[x][y]=1;
                    break;
            }
        }
    }
});

var sum = (x,y)=>x+y;
var total = map.reduce( (acc, next) => acc+next.reduce(sum) ,0 );
var t1 = performance.now();

console.log(`Part1: ${total}, in ${t1-t0}ms`);

// Part 2
// Algo start
t0 = performance.now();
map = new Array(1000).fill(0).map(x=> new Array(1000).fill(0) );

instructions.forEach((instruction,i)=>{
    var from = instruction.range[0];
    var to = instruction.range[1];
    var op = instruction.operation;
    
    for(var x=from.x; x<=to.x; x++){
        for(var y=from.y; y<=to.y; y++){
            switch(op){
                case "^":
                    map[x][y]+=2;
                    break;
                case "&":
                    map[x][y]-=1;
                    if (map[x][y]<0) map[x][y]=0;
                    break;
                case "|":
                    map[x][y]+=1;
                    break;
            }
        }
    }
});

var total2 = map.reduce( (acc, next) => acc+next.reduce(sum) ,0 );
var t2 = performance.now();
console.log(`Part2: ${total2}, in ${t2-t0}ms`);
