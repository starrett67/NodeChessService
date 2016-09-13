var PieceMover = require('../lib/PieceMover'),
    Piece = require('../lib/Piece'),
    Position = require('../lib/Position'),
    Directions = require('../lib/Directions'),
    Board = require('../lib/Board'),
    BoardProperties = require('../lib/BoardProperties'),
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
        it('should return one move if pawn has moved', function(){
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
        it('should return 0 moves when the white pawn reaches row 8', function(){
            var pawn = new Piece(WhiteTeam, new Position('a', 2));
            pawn.hasMoved = true;
            pawn.position.row = 8;
            var boardPieces = [ pawn ];
            var moves = PieceMover.private.getPawnMoves(boardPieces, pawn);
            moves.length.should.equal(0);
        });
        it('should return 0 moves when the black pawn reaches row 1', function(){
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

    describe('createMovesLine', function(){
        it('should return 7 moves in the vertical direction if on row 1', function(){
            var rook = new Piece(WhiteTeam, new Position('a', 1));
            var boardPieces = [ rook ];
            var moves = PieceMover.private.createMovesLine(boardPieces, rook, Directions.verticalUp);
            moves.length.should.equal(7);
            for(var i = 2; i <= 8; i++){
                var pos = new Position('a', i);
                moves.should.contain(pos);
            }
        });
        it('should return 7 moves in the vertical direction if on row 8', function(){
            var rook = new Piece(BlackTeam, new Position('a', 8));
            var boardPieces = [ rook ];
            var moves = PieceMover.private.createMovesLine(boardPieces, rook, Directions.verticalDown);
            moves.length.should.equal(7);
            for(var i = 1; i <= 7; i++){
                var pos = new Position('a', i);
                moves.should.contain(pos);
            }
        });
        it('should return 7 moves in the horizontal direction if on col A', function(){
            var rook = new Piece(BlackTeam, new Position('a', 8));
            rook.position.row = 5;
            var boardPieces = [ rook ];
            var moves = PieceMover.private.createMovesLine(boardPieces, rook, Directions.horizontalRight);
            moves.length.should.equal(7);
            BoardProperties.forEachColumn(function(col){
                if(col != 'a'){
                    var pos = new Position(col, rook.position.row);
                    moves.should.contain(pos);
                }
            });
        });
        it('should return 7 moves in the horizontal direction if on col h', function(){
            var rook = new Piece(BlackTeam, new Position('h', 8));
            rook.position.row = 3;
            var boardPieces = [ rook ];
            var moves = PieceMover.private.createMovesLine(boardPieces, rook, Directions.horizontalLeft);
            moves.length.should.equal(7);
            BoardProperties.forEachColumn(function(col){
                if(col != 'h'){
                    var pos = new Position(col, rook.position.row);
                    moves.should.contain(pos);
                }
            });
        });
        it('should should be interrupted by enemy piece', function(){
            var rook = new Piece(BlackTeam, new Position('h', 8));
            var pawn = new Piece(WhiteTeam, new Position('h', 2)); 
            pawn.position.row = 4;
            var boardPieces = [ rook, pawn ];
            var moves = PieceMover.private.createMovesLine(boardPieces, rook, Directions.verticalDown);
            moves.length.should.equal(rook.position.row - pawn.position.row);
            var pos = new Position(rook.position.column, 3);
            moves.should.not.contain(pos);
            for(var i = 7; i >= 4; i--){
                pos = new Position(rook.position.column, i);
                moves.should.contain(pos);
            }
        });
        it('should should be interrupted by ally piece', function(){
            var rook = new Piece(BlackTeam, new Position('h', 8));
            var pawn = new Piece(BlackTeam, new Position('h', 7)); 
            pawn.position.row = 4;
            var boardPieces = [ rook, pawn ];
            var moves = PieceMover.private.createMovesLine(boardPieces, rook, Directions.verticalDown);
            moves.length.should.equal(rook.position.row - pawn.position.row - 1);
            var pos = new Position(rook.position.column, 3);
            moves.should.not.contain(pos);
            pos = new Position(rook.position.column, 4);
            moves.should.not.contain(pos);
            for(var i = 7; i > 4; i--){
                pos = new Position(rook.position.column, i);
                moves.should.contain(pos);
            }
        });
        it('should return 7 moves in the diagonal direction if on a1', function(){
            var bishop = new Piece(BlackTeam, new Position('a', 1));
            bishop.type = "bishop";
            var boardPieces = [ bishop ];
            var moves = PieceMover.private.createMovesLine(boardPieces, bishop, Directions.diagonalUpRight);
            moves.length.should.equal(7);
            moves.should.contain(new Position('c', 3));
            moves.should.contain(new Position('h', 8));
        });
        it('should return 7 moves in the diagonal direction if on a8', function(){
            var bishop = new Piece(BlackTeam, new Position('a', 8));
            bishop.type = "bishop";
            var boardPieces = [ bishop ];
            var moves = PieceMover.private.createMovesLine(boardPieces, bishop, Directions.diagonalDownRight);
            moves.length.should.equal(7);
            moves.should.contain(new Position('f', 3));
            moves.should.contain(new Position('h', 1));
        });
        it('should be blocked by ally piece', function(){
            var bishop = new Piece(BlackTeam, new Position('h', 1));
            var piece = new Piece(BlackTeam, new Position('d', 5));
            bishop.type = "bishop";
            var boardPieces = [ bishop, piece ];
            var moves = PieceMover.private.createMovesLine(boardPieces, bishop, Directions.diagonalUpLeft);
            moves.length.should.equal(3);
            moves.should.contain(new Position('f', 3));
            moves.should.contain(new Position('e', 4));
            moves.should.not.contain(new Position('d', 5));
            moves.should.not.contain(new Position('c', 6));
        });
        it('should be stopped by enemy piece', function(){
            var bishop = new Piece(BlackTeam, new Position('h', 8));
            var piece = new Piece(WhiteTeam, new Position('c', 3));
            bishop.type = "bishop";
            var boardPieces = [ bishop, piece ];
            var moves = PieceMover.private.createMovesLine(boardPieces, bishop, Directions.diagonalDownLeft);
            moves.length.should.equal(5);
            moves.should.contain(new Position('f', 6));
            moves.should.contain(new Position('c', 3));
            moves.should.not.contain(new Position('b', 2));
        });
    });
    describe('getRookMoves', function(){
        it('should return all vertical and horizontal moves in each direction', function(){
             var rook = new Piece(BlackTeam, new Position('h', 8));
            rook.position.row = 4;
            rook.position.column = 'd';
            var boardPieces = [ rook ];
            var moves = PieceMover.private.getRookMoves(boardPieces, rook);
            moves.length.should.equal(14);
        });
        it('should return all vertical and horizontal moves if one direction does not return an multiple moves', function(){
             var rook = new Piece(BlackTeam, new Position('h', 8));
            rook.position.row = 7;
            var boardPieces = [ rook ];
            var moves = PieceMover.private.getRookMoves(boardPieces, rook);
            moves.length.should.equal(14);
        });
        it('should return all vertical and horizontal moves in two directions', function(){
            var rook = new Piece(BlackTeam, new Position('h', 8));
            var boardPieces = [ rook ];
            var moves = PieceMover.private.getRookMoves(boardPieces, rook);
            moves.length.should.equal(14);
        });
        it('should return all vertical and horizontal moves in two directions and blocked by pieces', function(){
            var rook = new Piece(BlackTeam, new Position('a', 8));
            var piece1 = new Piece(BlackTeam, new Position('e', 8));
            var piece2 = new Piece(WhiteTeam, new Position('a', 3));
            var boardPieces = [ rook, piece1, piece2 ];
            var moves = PieceMover.private.getRookMoves(boardPieces, rook);
            moves.length.should.equal(8);
        });
    });
    describe('getBishopMoves', function(){
        it('should return all diagonal moves in each direction', function(){
             var bishop = new Piece(BlackTeam, new Position('f', 8));
            bishop.position.row = 4;
            bishop.position.column = 'd';
            var boardPieces = [ bishop ];
            var moves = PieceMover.private.getBishopMoves(boardPieces, bishop);
            moves.length.should.equal(13);
        });
        it('should return all diagonal moves if one direction does not return an multiple moves', function(){
             var bishop = new Piece(BlackTeam, new Position('f', 8));
            bishop.position.row = 7;
            var boardPieces = [ bishop ];
            var moves = PieceMover.private.getBishopMoves(boardPieces, bishop);
            moves.length.should.equal(9);
        });
        it('should return all diagonal moves in two directions', function(){
            var bishop = new Piece(BlackTeam, new Position('f', 8));
            var boardPieces = [ bishop ];
            var moves = PieceMover.private.getBishopMoves(boardPieces, bishop);
            moves.length.should.equal(7);
        });
        it('should return all diagonal moves in two directions and blocked by pieces', function(){
            var bishop = new Piece(BlackTeam, new Position('c', 8));
            var piece1 = new Piece(BlackTeam, new Position('a', 6));
            var piece2 = new Piece(WhiteTeam, new Position('f', 5));
            var boardPieces = [ bishop, piece1, piece2 ];
            var moves = PieceMover.private.getBishopMoves(boardPieces, bishop);
            moves.length.should.equal(4);
        });
    });
    describe('getKingMoves', function(){
        it('should return a move in each direction if king is in middle of board', function(){
            var king = new Piece(WhiteTeam, new Position('e', 8));
            king.position.row = 5;
            var boardPieces = [ king ];
            var moves = PieceMover.private.getKingMoves(boardPieces, king);
            moves.should.contain(new Position('e', 6));
            moves.should.contain(new Position('e', 4));
            moves.should.contain(new Position('d', 5));
            moves.should.contain(new Position('f', 5));
        });
        it('should return a move that puts the king in check', function(){
            var king = new Piece(BlackTeam, new Position('e', 8));
            var rook = new Piece(WhiteTeam, new Position('a', 1));
            rook.position.column = 'd';
            var boardPieces = [ king, rook ];
            rook.validMoves = PieceMover.private.getRookMoves(boardPieces, rook);
            var moves = PieceMover.private.getKingMoves(boardPieces, king);
            moves.should.not.contain(new Position('d', 8));
            moves.length.should.equal(3);
        });
        it('should not allow the king to attack a piece and put itself in check', function(){
            var king = new Piece(BlackTeam, new Position('e', 8));
            var rook = new Piece(WhiteTeam, new Position('a', 1));
            var enemyPiece = new Piece(WhiteTeam, new Position('d', 8));
            rook.position.column = 'd';
            var boardPieces = [ king, rook, enemyPiece ];
            rook.validMoves = PieceMover.private.getRookMoves(boardPieces, rook);
            var moves = PieceMover.private.getKingMoves(boardPieces, king);
            moves.should.not.contain(new Position('d', 8));
            moves.length.should.equal(3);
        });
    });
    describe('getKnightMoves', function(){
        it('should return 4 moves in the middle of the board', function(){
            var knight = new Piece(WhiteTeam, new Position('b', 1));
            knight.position.row = 5;
            knight.position.column = 'e';
            var boardPieces = [ knight ];
            var moves = PieceMover.private.getKnightMoves(boardPieces, knight);
            moves.length.should.equal(8);
            moves.should.contain(new Position('f', 7));
            moves.should.contain(new Position('c', 4));
        });
        it('should only return moves within boundries of the board', function(){
            var knight = new Piece(WhiteTeam, new Position('b', 1));
            var boardPieces = [ knight ];
            var moves = PieceMover.private.getKnightMoves(boardPieces, knight);
            moves.length.should.equal(3);
            moves.should.contain(new Position('a', 3));
            moves.should.contain(new Position('c', 3));
            moves.should.contain(new Position('d', 2));
        });
    });
    describe('movePiece', function(){
        it('should move if the move is valid', function(){
            var queen = new Piece(WhiteTeam, new Position('d', 1));
            var board = new Board();
            board.Pieces = [ queen ];
            var move = new Position('h', 5);
            PieceMover.getValidMoves(board.Pieces, queen);
            PieceMover.movePiece(board, queen, move);
            queen.position.equals(move);
        });
        it('should refresh valid moves after a move', function(){
            var board = new Board();
            var piece = board.Pieces[1];
            var move = new Position('a', 4);
            PieceMover.getValidMovesForTeam(board, WhiteTeam);
            PieceMover.movePiece(board, piece, move);
            piece.position.equals(move);
            PieceMover.getValidMovesForTeam(board, BlackTeam);
            PieceMover.getValidMovesForTeam(board, WhiteTeam);
            piece.validMoves.length.should.not.equal(0);
        });
    });
});