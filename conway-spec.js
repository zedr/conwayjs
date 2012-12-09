var exports = require('./conway.js'),
    getNeighbours = exports.getNeighbours,
    doTick = exports.doTick;


describe('Conway tests', function () {
    it('has no neighbours', function () {
        var univ = [[0, 1]];
        expect(getNeighbours(univ, 0)).toEqual(0);
    });

    it('has two neighbours', function () {
        var univ = [[0, 1], [1, 0], [9, 9]];
        expect(getNeighbours(univ, 0)).toEqual(1);
        expect(getNeighbours(univ, 1)).toEqual(1);
    });

    it('becomes empty', function () {
        var univ = [[0, 1]];
        expect(doTick(univ)).toEqual([]);
    });

    it('does not change', function () {
        var univ = [[0, 1], [0, 0], [1, 1]];
        expect(doTick(univ)).toEqual(univ);
    });
});

