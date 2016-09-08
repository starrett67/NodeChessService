var PieceMover = require('../lib/PieceMover'),
    Piece = require('../lib/Piece'),
    Position = require('../lib/Position'),
    chai = require('chai'),
    should = chai.should(),
    Teams = require('../lib/Teams'),
    WhiteTeam = Teams.White,
    BlackTeam = Teams.Black;

describe('PieceMover tests:', function(){
    describe('getNextRow ', function(){
        it('should return 6 when current row is 5 and moving in positive direction', function(){
           var row = 5;
           var expectedResult = 6;
           var direction = 1;
           PieceMover.private.getNextRow(row, direction).should.equal(expectedResult); 
        });
        it('should return 3 when current row is 4 and moving in negative direction', function(){
           var row = 4;
           var expectedResult = 3;
           var direction = -1;
           PieceMover.private.getNextRow(row, direction).should.equal(expectedResult); 
        });
        it('should return nothing when current row is 8 and moving in positive direction', function(){
           var row = 8;
           var direction = 1;
           should.not.exist(PieceMover.private.getNextRow(row, direction));
        });
        it('should return nothing when current row is 1 and moving in negative direction', function(){
           var row = 1;
           var direction = -1;
           should.not.exist(PieceMover.private.getNextRow(row, direction));
        });
    });

    describe('getNextColumn', function(){
        it('should return c when current column is b and moving in positive direction', function(){
           var column = 'b';
           var expectedResult = 'c';
           var direction = 1;
           PieceMover.private.getNextColumn(column, direction).should.equal(expectedResult); 
        });
        it('should return c when current column is d and moving in negative direction', function(){
           var column = 'd';
           var expectedResult = 'c';
           var direction = -1;
           PieceMover.private.getNextColumn(column, direction).should.equal(expectedResult); 
        });
        it('should return nothing when current column is h and moving in positive direction', function(){
           var column = 'h';
           var direction = 1;
           should.not.exist(PieceMover.private.getNextColumn(column, direction));
        });
        it('should return nothing when current column is a and moving in negative direction', function(){
           var column = 'a';
           var direction = -1;
           should.not.exist(PieceMover.private.getNextColumn(column, direction)); 
        });
    });

    describe('isValidCoordinate', function(){
        it('should be valid if coordinate is 1', function(){
            PieceMover.private.isValidCoordinate(1).should.be.true;
        });
        it('should be valid if coordinate is 5', function(){
            PieceMover.private.isValidCoordinate(5).should.be.true;
        });
        it('should be valid if coordinate is 8', function(){
            PieceMover.private.isValidCoordinate(8).should.be.true;
        });
        it('should be invalid if coordinate is 0', function(){
            PieceMover.private.isValidCoordinate(0).should.be.false;
        });
        it('should be invalid if coordinate is 9', function(){
            PieceMover.private.isValidCoordinate(9).should.be.false;
        });
        it('should be invalid if coordinate is 100', function(){
            PieceMover.private.isValidCoordinate(100).should.be.false;
        });
    });

    describe('canTakePiece', function(){
        it('should return false if the pieces are on the same team', function(){
            var pieceToTake = new Piece(WhiteTeam);
            var movingPiece = new Piece(WhiteTeam);
            PieceMover.private.canTakePiece(pieceToTake, movingPiece).should.equal.false;
        });
        it('should return false if the piece is a king', function(){
            var pieceToTake = new Piece(BlackTeam);
            var movingPiece = new Piece(WhiteTeam);
            pieceToTake.type = "king";
            PieceMover.private.canTakePiece(pieceToTake, movingPiece).should.equal.false;
        });
        it('should return true if the piece is an enemy piece', function(){
            var pieceToTake = new Piece(BlackTeam);
            var movingPiece = new Piece(WhiteTeam);
            PieceMover.private.canTakePiece(pieceToTake, movingPiece).should.equal.true;
        });
    });

    describe('isValidMove', function(){
        it('should return true if there isn\'t an existing piece in proposed move', function(){
            var movingPawn = new Piece(WhiteTeam, new Position('a', 2));
            var boardPieces = [ movingPawn ];
            PieceMover.private.isValidMove(boardPieces, new Position('a', 3), movingPawn).should.be.true; 
        });
        it('should return true if an enemy is in proposed move and canAttack', function(){
            var movingPawn = new Piece(WhiteTeam, new Position('a', 2));
            var existingPawn = new Piece(BlackTeam, new Position('b', 3));
            var boardPieces = [ movingPawn, existingPawn ];
            PieceMover.private.isValidMove(boardPieces, new Position('b', 3), movingPawn, true).should.be.true; 
        });
        it('should return false if an ally is in proposed move and canAttack', function(){
            var movingPawn = new Piece(WhiteTeam, new Position('a', 2));
            var existingPawn = new Piece(WhiteTeam, new Position('b', 3));
            var boardPieces = [ movingPawn, existingPawn ];
            PieceMover.private.isValidMove(boardPieces, new Position('b', 3), movingPawn, true).should.be.false; 
        });
        it('should return false if an enemy is in proposed move and cant attack', function(){
            var movingPawn = new Piece(WhiteTeam, new Position('a', 2));
            var existingPawn = new Piece(BlackTeam, new Position('b', 3));
            var boardPieces = [ movingPawn, existingPawn ];
            PieceMover.private.isValidMove(boardPieces, new Position('b', 3), movingPawn, false).should.be.false; 
        });
    });

    describe('getPawnMoves', function(){
        it('should return two moves if pawn has not moved', function(){
            var pawn = new Piece(WhiteTeam, new Position('a', 2));
            var boardPieces = [ pawn ];
            var moves = PieceMover.private.getPawnMoves(boardPieces, pawn);
            var expectedVerticalMove = new Position('a', 3);
            var expectedVerticalJumpMove = new Position('a', 4);
            moves.length.should.equal(2);
            moves.should.contain(expectedVerticalJumpMove);
            moves.should.contain(expectedVerticalMove);
        });

        it('should return one moves if pawn has not moved', function(){
            var pawn = new Piece(WhiteTeam, new Position('a', 2));
            pawn.hasMoved = true;
            var boardPieces = [ pawn ];
            var moves = PieceMover.private.getPawnMoves(boardPieces, pawn);
            var expectedMove = new Position('a', 3);
            moves.length.should.equal(1);
            moves.should.contain(expectedMove);
        });

        it('should return moves to take enemy pieces', function(){

            var enemyPos1 = new Position('a', 3),
                enemyPos2 = new Position('c', 3);
            var pawn = new Piece(WhiteTeam, new Position('b', 2));
            var enemy1 = new Piece(BlackTeam, enemyPos1);
            var enemy2 = new Piece(BlackTeam, enemyPos2);
            var boardPieces = [ pawn, enemy1, enemy2 ];
            var moves = PieceMover.private.getPawnMoves(boardPieces, pawn);
            moves.length.should.equal(4);
            moves.should.contain(enemyPos1);
            moves.should.contain(enemyPos2);
        });
        it('should return 0 moves when the white pawn reacheds row 8', function(){
            var pawn = new Piece(WhiteTeam, new Position('a', 2));
            pawn.hasMoved = true;
            pawn.position.row = 8;
            var boardPieces = [ pawn ];
            var moves = PieceMover.private.getPawnMoves(boardPieces, pawn);
            moves.length.should.equal(0);
        });
        it('should return 0 moves when the black pawn reacheds row 1', function(){
            var pawn = new Piece(BlackTeam, new Position('a', 7));
            pawn.hasMoved = true;
            pawn.position.row = 1;
            var boardPieces = [ pawn ];
            var moves = PieceMover.private.getPawnMoves(boardPieces, pawn);
            moves.length.should.equal(0);
        });
        it('should not return a move that would take a king', function(){
            var pawn = new Piece(BlackTeam, new Position('a', 7));
            var kingPos = new Position('b', 6);
            var king = new Piece(WhiteTeam, kingPos);
            king.type = "king";
            var boardPieces = [ pawn, king ];
            var moves = PieceMover.private.getPawnMoves(boardPieces, pawn);
            moves.should.not.contain(kingPos);
        });

    });
});