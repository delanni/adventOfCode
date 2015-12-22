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

// Incremental approach: postponed, not possible to move out of ditches from where everything is 0 value
var t0 = performance.now();

var incrementors = dimensions.map((x, i) => {
    var values = ingredients.map(x=>x.toArray()[i]);
    var maxIdx = values.indexOf(Math.max(...values));
    
    return maxIdx;
});

var testTube = new Array(ingredients.length).fill(1);

debugger;
for(var i =0; i<100; i++){
    var values = ingredients.map((x,i)=> x.take(testTube[i])).reduce((a, b) => a.add(b));
    if (values.every(x=>x>0)){
        break;
    }
    
    var worstIndex = values.indexOf(Math.min(...values));
    var incrementSpot = incrementors[worstIndex];
    testTube[incrementSpot]+=1;
}
var testTubeSize = testTube.reduce((x,y)=>x+y);
var ingredientArray = testTube.slice();
var totalQty = ingredientArray.reduce((x,y)=>x+y);

while (totalQty < 100){
    var bestIngredientValue = -Infinity;
    var bestIngredientIdx = -1;
    for(var i=0;i<ingredients.length;i++){
        ingredientArray[i]+=1;
        var val = evaluateRecipe(ingredientArray);
        if (val>bestIngredientValue){
            bestIngredientIdx = i;
            bestIngredientValue = val;
        }
        ingredientArray[i]-=1;
    }
    
    ingredientArray[bestIngredientIdx]+=1;
    
    totalQty++;
}

while (totalQty > 50){
    var bestIngredientValue = -Infinity;
    var bestIngredientIdx = -1;
    for(var i=0;i<ingredients.length;i++){
        ingredientArray[i]-=1;
        var val = evaluateRecipe(ingredientArray);
        if (val>bestIngredientValue){
            bestIngredientIdx = i;
            bestIngredientValue = val;
        }
        ingredientArray[i]+=1;
    }
    
    ingredientArray[bestIngredientIdx]-=1;
    
    totalQty--;
}

while (totalQty < 100){
    var bestIngredientValue = -Infinity;
    var bestIngredientIdx = -1;
    for(var i=0;i<ingredients.length;i++){
        ingredientArray[i]+=1;
        var val = evaluateRecipe(ingredientArray);
        if (val>bestIngredientValue){
            bestIngredientIdx = i;
            bestIngredientValue = val;
        }
        ingredientArray[i]-=1;
    }
    
    ingredientArray[bestIngredientIdx]+=1;
    
    totalQty++;
}


var resultingRecipeValue = evaluateRecipe(ingredientArray);

var t1 = performance.now();



console.log(testTube);

console.log(`Part1: ${resultingRecipeValue}, in ${t1-t0}ms`);