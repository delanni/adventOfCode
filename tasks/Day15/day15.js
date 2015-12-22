var require = require || null;
if (require) {
    var document = require("../nodeDocumentShim");
}
var performance = performance || Date;

var dimensions = ["capacity", "durability", "flavor", "texture", "calories"];

var ingredients = document.body.textContent.trim().split("\n").map(x => {
    var parts = x.match(/(^\w+)|(-?\d+)/g);
    return {
        name: parts[0],
        capacity: Number(parts[1]),
        durability: Number(parts[2]),
        flavor: Number(parts[3]),
        texture: Number(parts[4]),
        calories: Number(parts[5]),
        take: function (amount) {
            return [this.capacity, this.durability, this.flavor, this.texture /*, this.calories*/ ].scale(amount);
        },
        toArray: function () {
            return this.take(1);
        }
    }
});

Array.prototype.scale = function (scale) {
    return this.map(x => x * scale);
};

Array.prototype.add = function (vector) {
    return this.map((x, i) => vector[i] + x);
};

var evaluateRecipe = function (containmentValues) {
    var totalValues = containmentValues.map((x, i) => ingredients[i].take(x)).reduce((a, b) => a.add(b));
    var product = totalValues.reduce((a, b) => a * Math.max(0, b), 1);
    return product;
};

// Once again, brute force is almost inevitable, so generate and test
var t0 = performance.now();

var sum = a => a.reduce((x,y)=>x+y);
var cases = [];
var current = new Array(ingredients.length-1).fill(0);
var workoutLowerDimension = function(cases,current, currentIndex){
    for(var i=0;i<=100;i++){
        current[currentIndex]=i;
        if (currentIndex<current.length-1){
            workoutLowerDimension(cases,current, currentIndex+1);
        } else {
            var s = sum(current);
            if (s<=100){
                cases.push(current.slice().concat(100-s));
            }
        }
    }
    return cases;
}

workoutLowerDimension(cases,current,0);
var values = cases.map(x=>evaluateRecipe(x));
var bestResultingRecipeValue = Math.max(...values);

var t1 = performance.now();

console.log(`Part1: ${bestResultingRecipeValue}, in ${t1-t0}ms`);


var getCalorieCount = function(containmentValues){
    return containmentValues.map((x, i) => ingredients[i].calories*x).reduce((a,b)=>a+b);
}

t0 = performance.now();
var calories = cases.map(x=>getCalorieCount(x));
var candidates = values.filter((x,i)=>calories[i]==500);

var bestRecipeFor500Cal = Math.max(...candidates);

t1 = performance.now();

console.log(`Part2: ${bestRecipeFor500Cal}, in ${t1-t0}ms`);