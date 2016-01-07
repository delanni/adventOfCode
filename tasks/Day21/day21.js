var require = require || null;
if (require) {
    var document = require("../nodeDocumentShim");
}
var performance = performance || Date;

var sum = (a, b) => a + b;

// Import descriptions
var weaponsDescription =
    `Dagger        8     4       0
Shortsword   10     5       0
Warhammer    25     6       0
Longsword    40     7       0
Greataxe     74     8       0`;

var armorsDescription =
    `None         0     0       0
Leather      13     0       1
Chainmail    31     0       2
Splintmail   53     0       3
Bandedmail   75     0       4
Platemail   102     0       5`;

var ringsDescription =
    `None        0     0       0
None2        0     0       0
Damage+1    25     1       0
Damage+2    50     2       0
Damage+3   100     3       0
Defense+1   20     0       1
Defense+2   40     0       2
Defense+3   80     0       3`;

// Part objects from it
var weapons = weaponsDescription.trim().split("\n").map(x => {
    var o = x.trim().split(/\s+/);
    return {
        name: o[0],
        cost: +o[1],
        atk: +o[2],
        def: +o[3]
    };
});

var armors = armorsDescription.trim().split("\n").map(x => {
    var o = x.trim().split(/\s+/);
    return {
        name: o[0],
        cost: +o[1],
        atk: +o[2],
        def: +o[3]
    };
});

var rings = ringsDescription.trim().split("\n").map(x => {
    var o = x.trim().split(/\s+/);
    return {
        name: o[0],
        cost: +o[1],
        atk: +o[2],
        def: +o[3]
    };
});

// Implementation taken from underscorejs
var cartesianProduct = function () {
    return [].slice.call(arguments).reduce(function (a, b) {
        return flatten(a.map(function (x) {
            return b.map(function (y) {
                return x.concat(y);
            });
        }), true);
    }, [[]]);
};

// Implementation taken from underscorejs
var flatten = function (input, shallow, strict, startIndex) {
    var output = [],
        idx = 0;
    for (var i = startIndex || 0, length = input.length; i < length; i++) {
        var value = input[i];
        if (value instanceof Array) {
            if (!shallow) value = flatten(value, shallow, strict);
            var j = 0,
                len = value.length;
            output.length += len;
            while (j < len) {
                output[idx++] = value[j++];
            }
        } else if (!strict) {
            output[idx++] = value;
        }
    }
    return output;
};

var t0 = performance.now();

// Create all possible gears
var allPossibleGear = cartesianProduct(weapons, armors, rings, rings);

// Kill the ones that are not valid
allPossibleGear = allPossibleGear.filter(e => (e[3].name != e[2].name));

// Get cost and sort
allPossibleGear.forEach(e => {
    e.cost = e.map(x => x.cost).reduce(sum);
});
allPossibleGear.sort((a, b) => a.cost - b.cost);

// Create player and boss
var me = {
    "Hit Points": 100,
    "Damage": 0,
    "Armor": 0,
    equip: function (gear) {
        var clone = Object.create(this);
        clone.Armor = gear.map(x => x.def).reduce(sum);
        clone.Damage = gear.map(x => x.atk).reduce(sum);
        return clone;
    }
};

var bossman = document.body.textContent.trim().split("\n").reduce((bossman, next) => {
    var p = next.split(": ");
    bossman[p[0]] = +p[1];
    return bossman
}, {});

bossman.clone = function () {
    return Object.create(this);
};

// Create function for simulating fight
var fight = function (player, enemy) {
    while (true) {
        enemy["Hit Points"] -= Math.max(player.Damage - enemy.Armor, 1);
        if (enemy["Hit Points"] <= 0) return "WIN";
        player["Hit Points"] -= Math.max(enemy.Damage - player.Armor, 1);
        if (player["Hit Points"] <= 0) return "LOSE";
    }
};

// Simulate all fights in increasing cost order, the first to win is our cheapest gear
var winningGearCost = -1;
for (var i = 0; i < allPossibleGear.length; i++) {
    var g = allPossibleGear[i];

    var player = me.equip(g);
    var enemy = bossman.clone();

    if (fight(player, enemy) == "WIN") {
        winningGearCost = g.cost;
        break;
    }
}

var t1 = performance.now();

console.log(`Part1: ${winningGearCost}, in ${t1-t0}ms`);

t0 = performance.now();

// Do the same thing for losing, in descending cost order
var losingGearCost = -1;
for (var i = allPossibleGear.length - 1; i >= 0; i--) {
    var g = allPossibleGear[i];

    var player = me.equip(g);
    var enemy = bossman.clone();

    if (fight(player, enemy) == "LOSE") {
        losingGearCost = g.cost;
        break;
    }
}

t1 = performance.now();

console.log(`Part2: ${losingGearCost}, in ${t1-t0}ms`);