var chai = require('chai'),
    should = chai.should(),
    expect = chai.expect(),
    sinon = require('sinon');

describe('board helper tests:', function(){
    var Board = require('../lib/Board');
    var Piece = require('../lib/Piece');
    var Position = require('../lib/Position');
    var Teams = require('../lib/Teams');
    var newBoard = require('../lib/NewBoard.json');
    var testBoard;
    var whiteTeam = Teams.White;
    var blackTeam = Teams.Black;

    beforeEach(function(){
        testBoard = new Board();
    });

    var whitePiecesTest = function(whiteRowLength){
        newBoard.forEachKey(function(col){
            for(var row = 1; row <= 8; row++){
                var spot = testBoard.Pieces.getPieceInPosition(col, row);
                if(row <= whiteRowLength){
                    var piece = new Piece(whiteTeam, new Position(col, row));
                    spot.should.deep.equal(piece);
                }                   
            }
        });
    }

    var blackPiecesTest = function(blackRowLength)
    {
        newBoard.forEachKey(function(col){
            for(var row = 1; row <= 8; row++){
                var spot = testBoard.Pieces.getPieceInPosition(col, row);
                if(row >= blackRowLength){
                    var piece = new Piece(blackTeam, new Position(col, row));
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
        })
    })
});