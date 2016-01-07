var performance = performance || Date;

var input = 34000000;

var t0 = performance.now();

// In essence, the first part breaks down to the problem: the smallest n, where sigma1(n)>3400000
// Where sigma1 is the divisor sum of powers 1

// For this, we'll need to bruteforce our way through, since the sigma1 series is not monotonous, so no binary search, no tricks are working.

var sum = (a, b) => a + b;
var prod = (a, b) => a * b;

// The divisor sum can be expressed by the formula: sum((e^k - 1) / (e-1))
// For every e, who's a prime factor of k exponent in the prime factorization of n.
// This is quicker then 'get all divisors, then sum them' method on big numbers
var expressQuick = x => {
    var factors = factorize(x);
    var packed = factors.reduce((a, n) => {
        a[n] = (a[n] || 0) + 1;
        return a;
    }, {});
    var v = Object.keys(packed).map(x => (Math.pow(Number(x), packed[x] + 1) - 1) / (Number(x) - 1)).reduce(prod);
    return v;
};

// Simple stupid prime test
var isPrime = function (x) {
    var d = Math.sqrt(x);
    for (var i = 2; i <= d; i++) {
        if ((x % i) == 0) {
            return false;
        }
    }
    return true;
};

// Factorization with memoization to be quick
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
};

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


// So we target 1/10th of the original input, since each elf delivers 10 presents at a time
var target = input / 10;
var test = x => express(x) >= target;

// The divisor sum has an upper bound, that we can start from, which is given by the below formula
// It means, that the number at which 'whereUpperBoundHitsTarget' stops, could be the first candidate for the solution
var whereUpperBoundHitsTarget = 100000;
while (whereUpperBoundHitsTarget * whereUpperBoundHitsTarget / eulerPhi(whereUpperBoundHitsTarget) < target) whereUpperBoundHitsTarget++;

// After that, it's brute force
while (true) {
    var s = expressQuick(whereUpperBoundHitsTarget);
    if (s >= target) {
        break;
    } else {
        whereUpperBoundHitsTarget++;
    }
};

var t1 = performance.now();

console.log(`Part1: ${whereUpperBoundHitsTarget}, in ${t1-t0}ms`);

// Part2:

t0 = performance.now();

// Now each elf delivers 11 presents
var newTarget = input / 11;

// No tricky resolution of divisor sum now, since it's not proper divisor sum
var express = x => {
    var v = getDivs(x).reduce(sum);
    return v;
};

// We only need those divisors, who hasn't been used 50 times before - meaning, n / divisor <= 50
var getDivs = function (n) {
    var divs = [];
    for (var i = 1; i <= n; i++) {
        if ((n % i) == 0 && n/i<=50) {
            divs.push(i);
        }
    }
    return divs;
};

// Brute force it again, now we can expect our number to be higher, so we can start from where we left off
while (true) {
    var s = express(whereUpperBoundHitsTarget);
    if (s >= newTarget) {
        break;
    } else {
        whereUpperBoundHitsTarget++;
    }
};

t1 = performance.now();

console.log(`Part2: ${whereUpperBoundHitsTarget}, in ${t1-t0}ms`);