var require = require || null;
if (require) {
    var document = require("../nodeDocumentShim");
}
var performance = performance || Date;

var createOperation = function (opName, arg1, arg2) {
    switch (opName) {
    case "jmp":
        return InstructionSet.jump(parseInt(arg1));
    case "jio":
        return InstructionSet.jumpIfOne(parseInt(arg2), arg1);
    case "jie":
        return InstructionSet.jumpIfEven(parseInt(arg2), arg1);
    case "hlf":
        return InstructionSet.half(arg1);
    case "tpl":
        return InstructionSet.triple(arg1);
    case "inc":
        return InstructionSet.increment(arg1);
    default:
        return InstructionSet.halt();
    }
};

var InstructionSet = {
    noop: function () {
        return function NOOP(machine) {
            machine.ip++;
        }
    },
    jump: function (offset) {
        return function JMP(machine) {
            machine.ip += offset;
        }
    },
    jumpIfOne: function (offset, register) {
        return function JIO(machine) {
            if (machine[register] == 1) {
                machine.ip += offset;
            } else {
                machine.ip++;
            }
        }
    },
    jumpIfEven: function (offset, register) {
        return function JIE(machine) {
            if (machine[register] % 2 == 0) {
                machine.ip += offset;
            } else {
                machine.ip++;
            }
        }
    },
    half: function (register) {
        return function HLF(machine) {
            machine[register] = Math.floor(machine[register] / 2);
            machine.ip++;
        }
    },
    triple: function (register) {
        return function TPL(machine) {
            machine[register] *= 3;
            machine.ip++;
        }
    },
    increment: function (register) {
        return function INC(machine) {
            machine[register]++;
            machine.ip++;
        }
    },
    halt: function () {
        return function HALT(machine) {
            machine.ip = -1;
        }
    }
};

var instructions = document.body.textContent.trim().split("\n").map(next => {
    var parts = next.trim().replace(",", "").split(/\s+/);
    return createOperation(parts[0], parts[1], parts[2]);
});

var machine = {
    instructions: instructions,
    a: 0,
    b: 0,
    ip: 0
};

var t1 = performance.now();

var instruction;

while (instruction = machine.instructions[machine.ip]) {
    if (instruction) {
        instruction(machine);
    }
}

var t0 = performance.now();

console.log(`Part1: ${machine.b}, in ${t1-t0}ms`);

t1 = performance.now();

machine.ip=0;
machine.a=1;
machine.b=0;

while (instruction = machine.instructions[machine.ip]) {
    if (instruction) {
        instruction(machine);
    }
}

t0 = performance.now();

console.log(`Part2: ${machine.b}, in ${t1-t0}ms`);
