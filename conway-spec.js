var exports = require('./conway.js'),
    getNeighbours = exports.getNeighbours,
    doTick = exports.doTick;

describe('Conway tests', function () {
    it('has no neighbours', function () {
        var univ = [[0, 1]];
        expect(getNeighbours(univ, univ[0])[0]).toEqual(0);
    });

    it('has two neighbours', function () {
        var univ = [[0, 1], [1, 0], [9, 9]];
        expect(getNeighbours(univ, univ[0])[0]).toEqual(1);
        expect(getNeighbours(univ, univ[1])[0]).toEqual(1);
    });

    it('has three neighbours', function () {
        var univ = [[0, -2], [-1, -1], [0, -1], [1, -1], [1, 0], [0, 1]];
        expect(getNeighbours(univ, univ[0])[0]).toEqual(3);
    });

    it('becomes empty', function () {
        var univ1 = [[0, 1]];
        expect(doTick(univ1)).toEqual([]);
        var univ2 = [[0, 1], [1, 0], [9, 9]];
        expect(doTick(univ2)).toEqual([]);
    });

    it('has one more cell and then is stable', function () {
        var u1 = [[0, 0], [0, 1], [1, 1]];
        var u2 = [[ 0, 0 ], [ 0, 1 ], [ 1, 0 ], [ 1, 1 ]]
        var u3 = [[ 0, 0 ], [ 0, 1 ], [ 1, 0 ], [ 1, 1 ]]
        expect(doTick(u1)).toEqual(u2);
        expect(doTick(u2)).toEqual(u3);
    });

    it('is a glider', function () {
        var u1 = [[1, 0], [0, 1], [-1, -1], [0, -1], [1, -1]]
        var u2 = [[0, -1], [0, -2], [1, 0], [1, -1], [-1, 0]]
        expect(doTick(u1)).toEqual(u2);
    });
});

