var performance = performance || Date;

var input = 34000000;
var target = input / 10;

var t0 = performance.now();

var getDivs = function (n) {
    var divs = [];
    for (var i = 1; i <= n; i++) {
        if ((n % i) == 0) {
            divs.push(i);
        }
    }
    return divs;
}

var sum = (a, b) => a + b;

var express = x => {
    var v = getDivs(x).reduce(sum);
    return v;
}

var prod = (a,b)=>a*b;
var express2 = x=> {
    var factors = factorize(x);
    var packed = factors.reduce((a,n)=>{
        a[n]=(a[n]||0)+1;
        return a;
    },{});
    var v = Object.keys(packed).map(x=>(Math.pow(Number(x),packed[x]+1)-1)/(Number(x)-1)).reduce(prod);
    return v;
}

var test = x => express(x) >= target;

var isPrime = function (x) {
    var d = Math.sqrt(x);
    for (var i = 2; i <= d; i++) {
        if ((x % i) == 0) {
            return false;
        }
    }
    return true;
};

var factorizationMemo = [];
var factorize = function (n) {
    if (isPrime(n)) {
        if (!factorizationMemo[n]) factorizationMemo[n] = [n];
        return [n];
    } else if (factorizationMemo[n]) {
        return factorizationMemo[n];
    } else {
        for (var i = 2; i <= n / 2; i++) {
            if (isPrime(i)) {
                if ((n % i) == 0) {
                    var res = [i].concat(factorize(n / i));
                    factorizationMemo[n] = res;
                    return res;
                }
            }
        }
    }
}

var distinct = function (arr) {
    return Object.keys(arr.reduce((x, a) => {
        x[a] = 1;
        return x;
    }, {}));
};

var eulerPhi = function (n) {
    var d = distinct(factorize(n));
    var prod = n;
    d.forEach(x => prod *= (1 - 1 / Number(x)));
    return Math.round(prod);
};

var whereUpperBoundHitsTarget = 100000;
while (whereUpperBoundHitsTarget * whereUpperBoundHitsTarget / eulerPhi(whereUpperBoundHitsTarget) < target) whereUpperBoundHitsTarget++;

console.log("upper bound:" + whereUpperBoundHitsTarget);

while(true){
    var s = express2(whereUpperBoundHitsTarget);
    if (s>target){
        break;
    }
};

var t1 = performance.now();

console.log(`Part1: ${whereUpperBoundHitsTarget}, in ${t1-t0}ms`);