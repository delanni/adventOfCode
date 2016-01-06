var require = require || null;
if (require) {
    var document = require("../nodeDocumentShim");
}
var performance = performance || Date;

// Oh shit, it's game of life?
var backup = document.body.textContent;

// #1 index: row, #2 index column
var board = backup.trim().split("\n").map(row => row.split("").map(x => x == "#" ? 1 : 0));
board.w = board[0].length;
board.h = board.length;
board.name = "Board";

// For safe getting:
board.get = function (row, col) {
    if (row < 0 || row >= board.h) return 0;
    if (col < 0 || col >= board.w) return 0;
    return this[row][col];
};

var swap = board.map(x => x.slice());
swap.w = board.w;
swap.h = board.h;
swap.get = board.get;
swap.name = "Swap";

var getNeighbours = function (row, col) {
    return [board.get(row - 1, col - 1), board.get(row - 1, col), board.get(row - 1, col + 1),
     board.get(row, col - 1), board.get(row, col + 1),
     board.get(row + 1, col - 1), board.get(row + 1, col), board.get(row + 1, col + 1)];
};

var sum = (x, y) => x + y;
var isCorner = (r, c) => {
    return ((r == 0) || (r == board.h - 1)) && ((c == 0) || (c == board.w - 1));
};

var determineCellState = function (row, col, cornersAlwaysOn) {
    if (cornersAlwaysOn && (isCorner(row, col))) return true;
    var c = board.get(row, col);
    var n = getNeighbours(row, col).reduce(sum);
    return (c && (n == 2 || n == 3) || !c && n == 3);
};

var nextState = function (n, hackCorners, callback) {
    n--;
    for (var r = 0; r < board.h; r++) {
        for (var c = 0; c < board.w; c++) {
            swap[r][c] = determineCellState(r, c, hackCorners);
        }
    }
    var t = swap;
    swap = board;
    board = t;

    document.body.firstChild.textContent = board.map(x=>x.map(y=>y?"#":".").join("")).join("\n");

    if (n) {
        setTimeout(function () {
            nextState(n, hackCorners, callback);
        }, 0);
    } else {
        callback.call(this, null);
    }
}

var t0 = performance.now();
nextState(100, false, function () {
    var lights = board.reduce((a, b) => a + b.reduce(sum), 0);
    var t1 = performance.now();
    console.log(`Part1: ${lights}, in ${t1-t0}ms`);
    startSecondPart();
});


var startSecondPart = function () {
    // Part 2

    // Reinitialize everything

    // #1 index: row, #2 index column
    board = backup.trim().split("\n").map(row => row.split("").map(x => x == "#" ? 1 : 0));
    board.w = board[0].length;
    board.h = board.length;
    board.name = "Board";

    // For safe getting:
    board.get = function (row, col) {
        if (isCorner(row, col)) return 1;
        if (row < 0 || row >= board.h) return 0;
        if (col < 0 || col >= board.w) return 0;
        return this[row][col];
    };

    swap = board.map(x => x.slice());
    swap.w = board.w;
    swap.h = board.h;
    swap.get = board.get;
    swap.name = "Swap";

    t0 = performance.now();
    nextState(100, true, function () {
        var lights = board.reduce((a, b) => a + b.reduce(sum), 0);
        var t1 = performance.now();
        console.log(`Part2: ${lights}, in ${t1-t0}ms`);
    });
};