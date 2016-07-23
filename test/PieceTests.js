'use strict'
var chai = require('chai'),
    should = chai.should(),
    Piece = require('../lib/Piece'),
    Position = require('../lib/Position');


describe('GetPieceType', function(){
    it("should return rook at a1", function(){
        var expectOutput = "rook";
        Piece.private.GetPieceType(new Position("a", 1)).should.equal(expectOutput)
    });
    it("should return bishop at f8", function(){
        var expectOutput = "bishop";
        Piece.private.GetPieceType(new Position("f", 8)).should.equal(expectOutput)
    });
    it("should be undefined at e4", function(){
        should.not.exist(Piece.private.GetPieceType(new Position("e", 4)));
    });
});