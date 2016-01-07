var require = require || null;
if (require) {
    var document = require("../nodeDocumentShim");
}
var performance = performance || Date;

var stats = {
    playerHealth: 50,
    playerMana: 500,
    shieldRemaining: 0,
    rechargeRemaining: 0,
    poisonRemaining: 0,
    bossHealth: 0,
    bossDamage: 0,
    totalManaSpent: 0,
    spellList: "",
    hardModePenalty: 0
};

var t0 = performance.now();

var bossStats = document.body.textContent.trim().split("\n").map(x => +x.match(/\d+/));
stats.bossHealth = bossStats[0];
stats.bossDamage = bossStats[1];

var toExpress = [];
var leafs = [];
var winningLeafs = [];

var spellCosts = {
    arcaneMissle: 53,
    drain: 73,
    shield: 113,
    poison: 173,
    recharge: 229
};

var cast = function (spellName, stats) {
    stats.spellList += "," + spellName;
    stats.playerMana -= spellCosts[spellName];
    stats.totalManaSpent += spellCosts[spellName];
    switch (spellName) {
    case "arcaneMissle":
        stats.bossHealth -= 4;
        break;
    case "drain":
        stats.bossHealth -= 2;
        stats.playerHealth += 2;
        break;
    case "shield":
        stats.shieldRemaining = 6;
        break;
    case "poison":
        stats.poisonRemaining = 6;
        break;
    case "recharge":
        stats.rechargeRemaining = 5;
    }
};

var express = function (stats) {
    if (stats.totalManaSpent > 3000) {
        stats.result = "MANA TOO MUCH";
    }
    if (stats.result) {
        leafs.push(stats);
        if (stats.result === "WIN") {
            winningLeafs.push(stats);
        }
        return;
    }
    var mana = stats.playerMana;
    Object.keys(spellCosts).forEach(k => {
        var v = spellCosts[k];
        var resultingStatus = Object.create(stats);

        resultingStatus.playerHealth -= resultingStatus.hardModePenalty;
        if (resultingStatus.playerHealth <= 0) {
            resultingStatus.result = "LOSE";
            toExpress.push(resultingStatus);
            return;
        }

        if (resultingStatus.rechargeRemaining) {
            resultingStatus.playerMana += 101;
            resultingStatus.rechargeRemaining--;
        }
        if (resultingStatus.poisonRemaining) {
            resultingStatus.bossHealth -= 3;
            resultingStatus.poisonRemaining--;
        }
        if (resultingStatus.shieldRemaining) {
            resultingStatus.shieldRemaining--;
        }

        if (resultingStatus[k + "Remaining"]) return;


        if (v <= mana) {
            cast(k, resultingStatus);
            if (resultingStatus.bossHealth <= 0) {
                resultingStatus.result = "WIN";
            } else {
                if (resultingStatus.hardModePenalty == 0 && stats.poisonRemaining == 0 && k !== "poison") return;
                if (resultingStatus.rechargeRemaining) {
                    resultingStatus.playerMana += 101;
                    resultingStatus.rechargeRemaining--;
                }
                if (resultingStatus.poisonRemaining) {
                    resultingStatus.bossHealth -= 3;
                    resultingStatus.poisonRemaining--;
                    if (resultingStatus.bossHealth <= 0) {
                        resultingStatus.result = "WIN";
                        toExpress.push(resultingStatus);
                        return;
                    }
                }
                if (resultingStatus.shieldRemaining) {
                    resultingStatus.shieldRemaining--;
                    resultingStatus.playerHealth -= (resultingStatus.bossDamage - 7);
                } else {
                    resultingStatus.playerHealth -= resultingStatus.bossDamage;
                }
                if (resultingStatus.playerHealth <= 0) {
                    resultingStatus.result = "LOSE";
                }
            }
            toExpress.push(resultingStatus);
        }
    });
};

express(stats);
for (var i = 0; toExpress.length; i++) {
    var s = toExpress.shift();
    if (s) {
        express(s);
    }
    if ((i % 10000) == 0) {
        console.log(`i:${i}\tleafs:${leafs.length}\tremaining:${toExpress.length}`);
    }
    if (winningLeafs.length > 1) {
        break;
    }
}

var winningLeafs = leafs.filter(x => x.result == "WIN");
var minManaCost = Math.min.apply(null, winningLeafs.map(x => x.totalManaSpent));
var t1 = performance.now();

console.log(`Part1: ${minManaCost}, in ${t1-t0}ms`);

stats.hardModePenalty = 1;
toExpress = [];
leafs = [];
winningLeafs = [];

t0 = performance.now();
debugger;
express(stats);
for (var i = 0; toExpress.length; i++) {
    var s = toExpress.shift();
    if (s) {
        express(s);
    }
    if ((i % 10000) == 0) {
        console.log(`i:${i}\tleafs:${leafs.length}\tremaining:${toExpress.length}`);
    }
    if (winningLeafs.length > 1) {
        break;
    }
}

winningLeafs = leafs.filter(x => x.result == "WIN");
minManaCost = minManaCost = Math.min.apply(null, winningLeafs.map(x => x.totalManaSpent));
t1 = performance.now();

console.log(`Part2: ${minManaCost}, in ${t1-t0}ms`);