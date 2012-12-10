(function (NS) {
    "use strict";

    var 
        state = [];

    function addCell (cell) {
        if (cell.length === 2) state.push(cell);
    };

    function checkNeighbours (cell, dead) {
        var 
            count = 0,
            born = [],
            a,
            b,
            x,
            y,
            i,
            elem;
        
        // Check the Moore neighbourhood of a cell,
        // returning the number of live neighbours and
        // any dead cells that will become alive in the
        // next tick.
        for (a = -1; a < 2; a++) {
            for (b = -1; b < 2; b++) {

                // Skip the cell itself (no offsets).
                if ( !(a === 0 && b === 0) ) {

                    // Get the position of the neighbour to inspect.
                    var x = cell[0] + a,
                        y = cell[1] + b;

                    // Check if the universe contains it.
                    for (i in state) {
                        elem = state[i];
                        if (elem[0] === x && elem[1] === y) count++;
                    };

                    // Now recurse and check if any neighbours will become
                    // alive.
                    if (!dead && checkNeighbours([x, y], 1)[0] === 3) {
                        born.push([x, y]);
                    }
                }
            };
        }

        return [count, born];
    };
    
    function doTick () {
        var
            idx,
            cell,
            ns = {},
            x,
            y,
            result,
            neighbours,
            bornCells,
            born,
            i,
            key,
            val;

        // Set an object using default keys.
        function setCoords (x, y) {
            (ns[x] || (ns[x] = {}))[y] = true;
        }

        // Iterate through the live cells in our plane.
        for (idx in state) {
            cell = state[idx];
            result = checkNeighbours(cell);
            neighbours = result[0];
            bornCells = result[1];

            // Will the cell survive?
            if (neighbours > 1 && neighbours < 4) {
                setCoords(cell[0], cell[1]);
            }

            // If we have any cells to awaken, add them to the plane.
            for (i in bornCells) {
                born = bornCells[i];
                setCoords(born[0], born[1]);
            };
        };

        // Reset the state.
        state = [];

        // Iterate the namespace and add the new cells to the state.
        for (key in ns) {
            for (val in ns[key]) {
               state.push([+key, +val]);
            };
        };
    };

    function doReset () {
        state = [];
    };

    function getState () {
        return state;
    };

    function setState(seq) {
        state = seq
    };

    NS.universe = {
        'addCell': addCell,
        'doTick': doTick,
        'doReset': doReset,
        'getState': getState,
        'setState': setState,
        'getNeighboursOf': function (cell) {
            return checkNeighbours(cell)[0]; 
        }
    };

}(this));
