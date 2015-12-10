var require = require || null;
if (require){
    var document = require("../nodeDocumentShim");
}

// One liner with reduce
var endFloor = document.body.textContent.trim().split("").reduce((floor, letter)=> floor + ((letter == ")")?-1:1), 0);

console.log("Santa ended up on floor " + endFloor);



// Utilizing ES6's generator
function *getFloors(input){
    var floor = 0;
    for (var i=0; i<input.length; i++){
        floor += ((input[i] == ")")?-1:1);
        yield floor;
    }
}

// Handy generator usage to find first index of something
getFloors.prototype.indexOf = function(target){
    if (!this.__indexOfCache) this.__indexOfCache = {};
    if (this.__indexOfCache.hasOwnProperty(target)) return this.__indexOfCache[target];
    
    var index = 0;
    for(var val of this){
        if (val == target){
            this.__indexOfCache[target]=index;
            return index;
        } else {
            index++
        }
    }
}

var firstIndexToEnterBasement = getFloors(document.body.textContent.trim()).indexOf(-1) + 1;

console.log(`Santa entered the basement at the ${firstIndexToEnterBasement} th step.`);