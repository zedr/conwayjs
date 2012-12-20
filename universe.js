(function (NS) {
    "use strict";

    var 
        pluginNS = "Conway";

    var Universe = function (width, height) {

        this.doReset = function () {
            this.state = [];
            this.generation = 1;
        };

        this.width = width || 100;
        this.height = height || 100;
        this.doReset();
    };

    Universe.prototype.addCell = function (cell) {
        if (cell.length === 2) this.state.push(cell);
    };

    Universe.prototype.addCells = function (sequence, x, y) {
        var i,
            cell,
            len = sequence.length,
            x = x || 0,
            y = y || 0;

        for (i=0; i < len; i++) {
            cell = sequence[i];
            this.addCell([cell[0] + x, cell[1] + y]);
        }
    };

    Universe.prototype.checkNeighbours = function (cell, dead) {
        var 
            count = 0,
            born = [],
            a,
            b,
            x,
            y,
            state = this.state,
            i,
            len,
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
                    len = state.length;
                    for (i=0; i < len; i++) {
                        elem = state[i];
                        if (elem[0] === x && elem[1] === y) count++;
                    };

                    // Now recurse and check if any neighbours will become
                    // alive.
                    if (!dead && this.checkNeighbours([x, y], 1)[0] === 3) {
                        born.push([x, y]);
                    }
                }
            };
        }

        return [count, born];
    };
    
    Universe.prototype.doTick = function () {
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
            state = this.state,
            i,
            l,
            stateLen,
            cellsLen,
            key,
            val;

        // Set an object using default keys.
        function setCoords (x, y) {
            (ns[x] || (ns[x] = {}))[y] = true;
        }

        // Iterate through the live cells in our plane.
        stateLen = state.length;
        for (i=0; i < stateLen; i++) {
            cell = this.state[i];
            result = this.checkNeighbours(cell);
            neighbours = result[0];
            bornCells = result[1];

            // Will the cell survive?
            if (neighbours > 1 && neighbours < 4) {
                setCoords(cell[0], cell[1]);
            }

            // If we have any cells to awaken, add them to the plane.
            cellsLen = bornCells.length;
            for (l=0; l < cellsLen; l++) {
                born = bornCells[l];
                setCoords(born[0], born[1]);
            };
        };

        // Reset the state.
        this.state = [];

        // Iterate the namespace and add the new cells to the state.
        for (key in ns) {
            for (val in ns[key]) {
               this.state.push([+key, +val]);
            };
        };

        // Increment the generation number.
        this.generation++;
    };

    // Plugin registration
    (NS[pluginNS] || (NS[pluginNS] = {}))["Universe"] = Universe;

}(this));
