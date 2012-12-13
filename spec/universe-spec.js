var Universe = require('../universe.js').Conway.Universe;
var Library = require('../library.js').Conway.Library;


describe('Conway tests', function () {
    var univ = new Universe();

    afterEach(function () {
        univ.doReset();
    });

    it('can add a cell', function () {
        univ.addCell([1, 1]);
        expect(univ.state).toEqual([[1, 1]]);
    });

    it('can be resetted', function () {
        univ.addCell([1, 1]);
        univ.doReset();
        expect(univ.state).toEqual([]);
    });

    it('has no neighbours', function () {
        var cell = [1, 1]
        univ.addCell(cell);
        expect(univ.checkNeighbours(cell)[0]).toBe(0);
    });

    it('has two neighbours', function () {
        var seq = [[0, 1], [1, 0], [9, 9]],
            i;
        for (i in seq) { univ.addCell(seq[i]); }
        expect(univ.checkNeighbours(seq[0])[0]).toBe(1);
        expect(univ.checkNeighbours(seq[1])[0]).toBe(1);
        expect(univ.checkNeighbours(seq[2])[0]).toBe(0);
    });

    it('has three neighbours', function () {
        var seq = [[0, -2], [-1, -1], [0, -1], [1, -1], [1, 0], [0, 1]],
            i;
        for (i in seq) { univ.addCell(seq[i]); }
        expect(univ.checkNeighbours(seq[0])[0]).toBe(3);
    });

    it('becomes empty', function () {
        // Case 1
        var state1 = [[0, 1]];
        univ.state = state1;
        univ.doTick();
        expect(univ.state).toEqual([]);

        // Case 2
        var state2= [[0, 1], [1, 0], [9, 9]];
        univ.state = state2;
        univ.doTick();
        expect(univ.state).toEqual([]);
    });

    it('has one more cell and then is stable', function () {
        // Case 1
        var state1 = [[0, 0], [0, 1], [1, 1]];
        var state2 = [[ 0, 0 ], [ 0, 1 ], [ 1, 0 ], [ 1, 1 ]]
        univ.state = state1;
        univ.doTick();
        expect(univ.state).toEqual(state2);
        // Case 2
        var state3 = [[ 0, 0 ], [ 0, 1 ], [ 1, 0 ], [ 1, 1 ]]
        univ.state = state3;
        univ.doTick();
        expect(univ.state).toEqual(state3);
    });

    it('is and behaves as a glider', function () {
        var state1 = Library['glider'];
        var state2 = [[0, -1], [0, -2], [1, 0], [1, -1], [-1, 0]];
        univ.state = state1;
        univ.doTick();
        expect(univ.state).toEqual(state2);
    });
});

