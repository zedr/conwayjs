var getNeighbours = function (universe, cell, dead) {
    "use strict";

    var 
        count = 0,
        member,
        a,
        b,
        x,
        y,
        i,
        born = [];

    for (a = -1; a < 2; a++) {
        for (b = -1; b < 2; b++) {
            if (a === 0 && b === 0) continue;

            var x = cell[0] + a,
                y = cell[1] + b;

            for (i in universe) {
                member = universe[i];
                if (member[0] === x && member[1] === y) count++;
            };
            
            if (!dead && getNeighbours(universe, [x, y], 1)[0] === 3) {
                born.push([x, y]);
            }
        };
    };

    return [count, born];
};

var doTick = function (universe) {
    "use strict";

    var cell,
        ns = {},
        next = [],
        idx,
        i,
        result,
        neighbours,
        bCells,
        born,
        k,
        v;

    for (idx in universe) {
        cell = universe[idx];
        result = getNeighbours(universe, cell);
        neighbours = result[0];
        bCells = result[1];

        if (neighbours > 1 && neighbours < 4) {
            (ns[cell[0]] || (ns[cell[0]] = {}))[cell[1]] = true;
        }

        for (i in bCells) {
            born = bCells[i];
            (ns[born[0]] || (ns[born[0]] = {}))[born[1]] = true;
        }
    };

    for (k in ns) {
        for (v in ns[k]) {
            next.push([+k, +v]);
        }
    }

    return next;
};

exports.getNeighbours = getNeighbours;
exports.doTick = doTick;
