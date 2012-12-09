var universe = [];

var getNeighbours = function (universe, idx) {
    "use strict";

    var cell = universe[idx],
        offset = [-1, 0, 1],
        count = -1,
        member,
        el,
        a,
        b,
        x,
        y,
        i;

    for (a in offset) {
        for (b in offset) {
            var x = cell[0] + offset[a],
                y = cell[1] + offset[b];

            for (i in universe) {
                member = universe[i];
                if (member[0] === x && member[1] === y) count++;
            };
        };
    };

    return count;
};

var doTick = function (universe) {
    "use strict";

    var cell,
        next = [],
        idx,
        neighbours;

    for (idx in universe) {
        neighbours = getNeighbours(universe, idx);
        if (neighbours > 1 && neighbours < 4) {
            next.push(cell);
        }
    };

    return next;
};

exports.getNeighbours = getNeighbours;
exports.doTick = doTick;
