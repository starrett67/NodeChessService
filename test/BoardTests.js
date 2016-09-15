var chai = require('chai'),
    should = chai.should(),
    expect = chai.expect(),
    sinon = require('sinon');

describe('board tests:', function(){
    var Board = require('../lib/Board'),
        Piece = require('../lib/Piece'),
        Position = require('../lib/Position'),
        BoardProperties = require('../lib/BoardProperties'),
        Teams = require('../lib/Teams'),
        testBoard,
        whiteTeam = Teams.White,
        blackTeam = Teams.Black;

    beforeEach(function(){
        testBoard = new Board();
    });

    var whitePiecesTest = function(whiteRowLength){
        BoardProperties.forEachColumn(function(col){
            for(var row = 1; row <= 8; row++){
                var pos = new Position(col, row);
                var spot = testBoard.getPieceInPosition(pos);
                if(row <= whiteRowLength){
                    var piece = new Piece(whiteTeam, pos);
                    spot.should.deep.equal(piece);
                }                   
            }
        });
    }

    var blackPiecesTest = function(blackRowLength)
    {
        BoardProperties.forEachColumn(function(col){
            for(var row = 1; row <= 8; row++){
                var pos = new Position(col, row);
                var spot = testBoard.getPieceInPosition(pos);
                if(row >= blackRowLength){
                    var piece = new Piece(blackTeam, pos);
                    spot.should.deep.equal(piece);
                }                  
            }
        });
    }

    describe('Creating a new board', function(){
        
        it('should have 32 pieces', function()
        {
            testBoard.Pieces.length.should.equal(32);
            testBoard.print();
        });

    });

    describe('Inserting white team', function(){
        var whiteRowLength = 2;
        it('should have white piece under row ' + whiteRowLength, function(){
            whitePiecesTest(whiteRowLength);
        });
    });

    describe('Inserting black team', function(){
        var blackRowLength = 7;
        it('should have black piece above row ' + blackRowLength, function(){
            blackPiecesTest(blackRowLength);
        });
    });

    describe('Creating a new board', function(){
        it('should have 2 rows of black pieces and white pieces', function(){
            whitePiecesTest(2);
            blackPiecesTest(7);
        });
    });
});