var input = "hxbxwxba";

var performance = performance || Date;

// Part 1 

var incrementPassword = function(strArr, at){
    if (typeof at === 'undefined') at = strArr.length -1;
    var cc = strArr[at];
    if (cc==122){
        strArr[at]=97;
        incrementPassword(strArr,at-1);
    } else if (cc==104 || cc==110 || cc==107){
        strArr[at]+=2;
    } else {
        strArr[at]+=1;
    }
    return strArr;
}

Array.prototype.slicedApply = function(sliceWidth, callback, thisarg){
    for(var i=0;i<this.length-sliceWidth+1;i++){
        var s = this.slice(i,i+sliceWidth);
        callback.call(thisarg, s);
    }
};

var testRequirements = function(strArray){
    // Criteria1 must have an incrementing triplet
    var criteria1 = false;
    strArray.slicedApply(3, x=> { if (x[0]==(x[1]-1) && (x[1]+1)==x[2]) criteria1 = true; });
    
    var criteria2 = null;
    strArray.slicedApply(2, x=> { if (x[0]==x[1]) {
        if (!criteria2){
            criteria2 = x[0];
        } else if (criteria2 === true){
        } else if (criteria2 != x[0]) {
            criteria2 = true;
        }
    }});
    return criteria1 && criteria2 === true;
}

var t0 = performance.now();

var iArr = input.split("").map(x=>x.charCodeAt());
var isOk = false;
while (!isOk){
    incrementPassword(iArr);
    isOk = testRequirements(iArr);
}

var nextPassword = String.fromCharCode.apply(null, iArr);

var t1 = performance.now();

console.log(`Part1: ${nextPassword}, in ${t1-t0}ms`);


t0 = performance.now();
var newInput = "hxbxxyzz";

iArr = newInput.split("").map(x=>x.charCodeAt());
isOk = false;
while (!isOk){
    incrementPassword(iArr);
    isOk = testRequirements(iArr);
}

nextPassword = String.fromCharCode.apply(null, iArr);
t1 = performance.now();

console.log(`Part2: ${nextPassword}, in ${t1-t0}ms`);