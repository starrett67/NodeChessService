'use strict'
var chai = require('chai'),
    should = chai.should(),
    expect = chai.expect(),
    sinon = require('sinon');

describe('board helper tests:', function(){
    var boardHelper = require('../lib/BoardHelper');
    var Piece = require('../lib/Piece');
    var Position = require('../lib/Position');
    var board;
    beforeEach(function(){
        board = boardHelper.private.createBlankBoard();
    });

    var whitePiecesTest = function(whiteRowLength){
        board.forEachKey(function(col){
            for(var row = 0; row < 8; row++){
                var spot = board[col][row];
                if(row < whiteRowLength){
                    var piece = new Piece("White", new Position(col, row));
                    spot.should.deep.equal(piece);
                }                   
            }
        });
    }

    var blackPiecesTest = function(blackRowLength)
    {
        board.forEachKey(function(col){
            for(var row = 0; row < 8; row++){
                var spot = board[col][row];
                if(row > blackRowLength){
                    var piece = new Piece("Black", new Position(col, row));
                    spot.should.deep.equal(piece);
                }                  
            }
        });
    }

    describe('Creating a blank board', function(){
        
        it('should return an 8x8 board', function()
        {
            var spy = sinon.spy();
            board.forEachKey(function(col){
                board[col].length.should.equal(8);
                spy();
            });
            spy.callCount.should.equal(8);
        });

    });

    describe('Inserting white team', function(){
        var whiteRowLength = 2;
        it('should have white piece under row ' + whiteRowLength, function(){
            boardHelper.private.insertWhiteTeam(board);
            whitePiecesTest(whiteRowLength);
        });
    });

    describe('Inserting white team', function(){
        var blackRowLength = 5;
        it('should have black piece above row ' + blackRowLength, function(){
            boardHelper.private.insertBlackTeam(board);
            blackPiecesTest(blackRowLength);
        });
    });

    describe('Creating a new board', function(){
        it('should have 2 rows of black pieces and white pieces', function(){
            board = boardHelper.createNewBoard();
            whitePiecesTest(2);
            blackPiecesTest(5);
        })
    })
});