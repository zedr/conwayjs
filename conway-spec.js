var universe = require('./conway.js').universe;


describe('Conway tests', function () {
    var univ = universe;

    afterEach(function () {
        univ.doReset();
    });

    it('can add a cell', function () {
        univ.addCell([1, 1]);
        expect(univ.getState()).toEqual([[1, 1]]);
    });

    it('can be resetted', function () {
        univ.addCell([1, 1]);
        univ.doReset();
        expect(univ.getState()).toEqual([]);
    });

    it('has no neighbours', function () {
        var cell = [1, 1]
        univ.addCell(cell);
        expect(univ.getNeighboursOf(cell)).toBe(0);
    });

    it('has two neighbours', function () {
        var seq = [[0, 1], [1, 0], [9, 9]],
            i;
        for (i in seq) { univ.addCell(seq[i]); }
        expect(univ.getNeighboursOf(seq[0])).toBe(1);
        expect(univ.getNeighboursOf(seq[1])).toBe(1);
        expect(univ.getNeighboursOf(seq[2])).toBe(0);
    });

    it('has three neighbours', function () {
        var seq = [[0, -2], [-1, -1], [0, -1], [1, -1], [1, 0], [0, 1]],
            i;
        for (i in seq) { univ.addCell(seq[i]); }
        expect(univ.getNeighboursOf(seq[0])).toBe(3);
    });

    it('becomes empty', function () {
        // Case 1
        var state1 = [[0, 1]];
        univ.setState(state1);
        univ.doTick();
        expect(univ.getState()).toEqual([]);
        // Case 2
        var state2= [[0, 1], [1, 0], [9, 9]];
        univ.setState(state2);
        univ.doTick();
        expect(univ.getState()).toEqual([]);
    });

    it('has one more cell and then is stable', function () {
        // Case 1
        var state1 = [[0, 0], [0, 1], [1, 1]];
        var state2 = [[ 0, 0 ], [ 0, 1 ], [ 1, 0 ], [ 1, 1 ]]
        univ.setState(state1);
        univ.doTick();
        expect(univ.getState()).toEqual(state2);
        // Case 2
        var state3 = [[ 0, 0 ], [ 0, 1 ], [ 1, 0 ], [ 1, 1 ]]
        univ.setState(state2);
        univ.doTick();
        expect(univ.getState()).toEqual(state3);
    });

    it('is and behaves as a glider', function () {
        var state1 = [[1, 0], [0, 1], [-1, -1], [0, -1], [1, -1]]
        var state2 = [[0, -1], [0, -2], [1, 0], [1, -1], [-1, 0]]
        univ.setState(state1);
        univ.doTick();
        expect(univ.getState()).toEqual(state2);
    });
});

