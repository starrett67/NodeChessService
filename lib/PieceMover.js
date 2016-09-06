var Position = require('./Position'),
    Directions = require('./Directions'),
    Teams = require('./Teams'),
    WhiteTeam = Teams.White,
    BlackTeam = Teams.Black;

var columns = ["index0","a","b","c","d","e","f","g","h"];

//get full list of pawn valid moves
var getPawnMoves = function(boardPieces, pawn){
    var direction = Directions.verticalUp,
        moves = [],
        currentRow = pawn.position.row,
        currentCol = pawn.position.column;
    
    //Determine direction the pawn can move
    if(pawn.team == BlackTeam) { direction = Directions.verticalDown; }
    //Validate next row and get next row
    var nextRow = getNextRow(currentRow, direction.rowDirection);
    if (nextRow){
        var diagonalLeftMove = new Position(getNextColumn(currentCol, -1), nextRow);
        var diagonalRightMove = new Position(getNextColumn(currentCol, 1), nextRow);
        var verticalMove = new Position(currentCol, nextRow);
        var verticalJumpMove;
        if(!pawn.hasMoved) { verticalJumpMove = new Position(currentCol, getNextRow(nextRow, direction.rowDirection));  }
        if(diagonalLeftMove.column){
            var move = diagonalLeftMove;
            //Diagonal moves must take a piece
            if(boardPieces.getPieceInPosition(move.column, move.row)){
                if(isValidMove(boardPieces, move, pawn, true))
                {
                    moves.push(move);
                }
            }
        }
        if(diagonalRightMove.column){
            var move = diagonalRightMove;
            //Diagonal moves must take a piece
            if(boardPieces.getPieceInPosition(move.column, move.row)){
                if(isValidMove(boardPieces, move, pawn, true))
                {
                    moves.push(move);
                }
            }
        }
        //verticle moves
        if(isValidMove(boardPieces, verticalMove, pawn, false)){
            moves.push(verticalMove);
            if(verticalJumpMove && isValidMove(boardPieces, verticalJumpMove, pawn, false)){
                moves.push(verticalJumpMove);
            }
        }
    }
    return moves;
};

//get full list of rook valid moves
var getRookMoves = function(boardPieces, Rook){
    var moves = [];
    var directions = Directions.straightDirections;
    directions.forEach(function(direction){
        moves.push(createMovesLine(boardPieces, piece, direction));
    });
    return moves;
};

//Create line of moves, used for rooks, bishops, and queens
var createMovesLine = function(boardPieces, piece, direction){
    var nextMove = getNextMove(piece.position, direction);
    var moves = [];
    while(nextMove){
        //Check move is valid. These pieces can always attack
        if(isValidMove(boardPieces, move, piece, true)){
            moves.push(move);
        }
        nextMove = getNextMove(nextMove, direction);
    }
    return moves;
};

var getNextMove = function(currentPos, direction){
    var move = new Position(getNextColumn(currentPos.column, direction.colDirection),
                                getNextRow(currentPos.row, direction.rowDirection));
    if(move.isValid()){
        return move;
    }
};

//get next row in a direction and return it if its valid
var getNextRow = function(row, direction){
    var nextRow = row + direction;
    if(isValidCoordinate(nextRow)){
        return nextRow;
    }
};

//get next column in a direction and return it if its valid
var getNextColumn = function(col, direction){
    var index = (columns.indexOf(col) + direction);
    if(isValidCoordinate(index)){
        return columns[index];
    }
};

//check that a coordinate (col or row) falls in the boundries of the board
var isValidCoordinate = function(coord){
    var valid = false;
    if(coord >= 1 && coord <= 8)
    {
        valid = true;
    }
    return valid;
};

//Check to make sure a move is valid works for all moves except when a king 
//tries to put itself in check.
var isValidMove = function(boardPieces, move, movingPiece, canAttack){
    var col = move.column;
    var row = move.row;
    var obsticlePiece = boardPieces.getPieceInPosition(col, row);
    var valid = false;

    if(obsticlePiece){
        if(canTakePiece(obsticlePiece, movingPiece) && canAttack){
            valid = true;
        }
    }
    else{
        valid = true;
    }

    return valid;
};

//Valid friendly fire and attacks on king
var canTakePiece = function(pieceToTake, currentPiece){
    var canTake = true;
    if(currentPiece.team === pieceToTake.team){ canTake = false; }
    else if(pieceToTake.type === "king"){
        canTake = false;
    }
    return canTake;
};

var privateFunctions = {
    getNextRow: getNextRow,
    getNextColumn: getNextColumn,
    isValidCoordinate: isValidCoordinate,
    isValidMove: isValidMove,
    canTakePiece: canTakePiece,
    getPawnMoves: getPawnMoves
};

exports.private = privateFunctions;