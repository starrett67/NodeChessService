var Position = require('./Position'),
    Directions = require('./Directions'),
    Direction = require('./Direction'),
    BoardProperties = require('./BoardProperties'),
    PieceTypes = BoardProperties.PieceTypes,
    Teams = require('./Teams'),
    WhiteTeam = Teams.White,
    BlackTeam = Teams.Black;

var columns = ["index0","a","b","c","d","e","f","g","h"];

var getValidMoves = function(boardPieces, movingPiece){
    switch(movingPiece.type){
        case PieceTypes.Pawn:
            var moves = getPawnMoves(boardPieces, movingPiece);
            movingPiece.validMoves = moves;
            break;
        case PieceTypes.Bishop:
            var moves = getBishopMoves(boardPieces, movingPiece);
            movingPiece.validMoves = moves;
            break;
        case PieceTypes.King:
            var moves = getKingMoves(boardPieces, movingPiece);
            movingPiece.validMoves = moves;
            break;
        case PieceTypes.Queen:
            var moves = getQueenMoves(boardPieces, movingPiece);
            movingPiece.validMoves = moves;
            break;
        case PieceTypes.Rook:
            var moves = getRookMoves(boardPieces, movingPiece);
            movingPiece.validMoves = moves;
            break;
        case PieceTypes.Knight:
            var moves = getKnightMoves(boardPieces, movingPiece);
            movingPiece.validMoves = moves;
            break;
    }
};

//get full list of pawn valid moves
var getPawnMoves = function(boardPieces, pawn){
    var direction = Directions.verticalUp,
        moves = [],
        currentRow = pawn.position.row,
        currentCol = pawn.position.column;
    
    //Determine direction the pawn can move
    if(pawn.team == BlackTeam) { direction = Directions.verticalDown; }
    
    var diagonalLeftMove = getNextMove(pawn.position, new Direction(-1, direction.rowDirection));
    var diagonalRightMove = getNextMove(pawn.position, new Direction(1, direction.rowDirection));
    var verticalMove = getNextMove(pawn.position, direction);
    var verticalJumpMove;
    if(!pawn.hasMoved) { verticalJumpMove = getNextMove(verticalMove, direction);  }
    if(diagonalLeftMove){
        if(isValidMove(boardPieces, diagonalLeftMove, pawn, true))
        {
            moves.push(diagonalLeftMove);
        }
    }
    if(diagonalRightMove){
        if(isValidMove(boardPieces, diagonalRightMove, pawn, true))
        {
            moves.push(diagonalRightMove);
        }
    }
    //verticle moves
    if(verticalMove && isValidMove(boardPieces, verticalMove, pawn, false)){
        moves.push(verticalMove);
        if(verticalJumpMove && isValidMove(boardPieces, verticalJumpMove, pawn, false)){
            moves.push(verticalJumpMove);
        }
    }
    return moves;
};

//get all straight line moves
var getRookMoves = function(boardPieces, Rook){
    var moves = [];
    var directions = Directions.straightDirections;
    directions.forEach(function(direction){
        moves = moves.concat(createMovesLine(boardPieces, Rook, direction));
    });
    return moves;
};

//get all diagonal moves
var getBishopMoves = function(boardPieces, Bishop){
    var moves = [];
    var directions = Directions.diagonalDirections;
    directions.forEach(function(direction){
        moves = moves.concat(createMovesLine(boardPieces, Bishop, direction));
    });
    return moves;
};

//queen = bishop + rook
var getQueenMoves = function(boardPieces, Queen){
    var moves = [];
    moves = moves.concat(getBishopMoves(boardPieces, Queen));
    moves = moves.concat(getRookMoves(boardPieces, Queen));
    return moves;
};

var getKnightMoves = function(boardPieces, Knight){
    var moves = [];
    Directions.knightDirections.forEach(function(direction){
        var move = getNextMove(Knight.position, direction);
        if(isValidMove(move)){
            moves.push(move);
        }
    });
    return moves;
};

var getKingMoves = function(boardPieces, King){
    var moves = [];
    Directions.allDirections.forEach(function(direction){
        var move = getNextMove(King.position, direction);
        if (isValidMove(boardPieces, move, King)){
            moves.push(move);
        }
    });
    return moves;
};

//Create line of moves, used for rooks, bishops, and queens
var createMovesLine = function(boardPieces, piece, direction){
    var nextMove = getNextMove(piece.position, direction);
    var moves = [];
    while(nextMove){
        if(isValidMove(boardPieces, nextMove, piece, true)){
            moves.push(nextMove);
        }
        //need to stop if a piece is going to be attacked
        if(boardPieces.getPieceInPosition(nextMove))
        {
            nextMove = undefined;
        }
        else
        {
            nextMove = getNextMove(nextMove, direction);
        }
    }
    return moves;
};

//Returns the next space in the given direction. Does not check to see if another piece already exists.
var getNextMove = function(currentPos, direction){
    if(currentPos){
        var move = new Position(getNextColumn(currentPos.column, direction.colDirection),
                                    getNextRow(currentPos.row, direction.rowDirection));
        //move has a col and row
        if(move.isValid()){
            return move;
        }
    }
};

//get next row in a direction and return it if its valid
var getNextRow = function(row, rowDirection){
    if(row){
        var nextRow = row + rowDirection;
        if(isValidCoordinate(nextRow)){
            return nextRow;
        }
    }
};

//get next column in a direction and return it if its valid
var getNextColumn = function(col, colDirection){
    if(col){
        var index = (BoardProperties.getColumnIndex(col) + colDirection);
        if(isValidCoordinate(index)){
            return columns[index];
        }
    }
};

//check that a coordinate (col or row) falls in the boundries of the board
var isValidCoordinate = function(coord){
    var valid = false;
    if(coord){
        if(coord >= 1 && coord <= 8)
        {
            valid = true;
        }
    }
    return valid;
};

//Check to make sure a move is valid works for all moves except when a king 
//tries to put itself in check.
var isValidMove = function(boardPieces, move, movingPiece, canAttack){
    var valid = false;
    if(boardPieces && move && movingPiece){
        var obsticlePiece = boardPieces.getPieceInPosition(move);
        if(obsticlePiece){
            if(canTakePiece(obsticlePiece, movingPiece) && canAttack){
                valid = true;
            }
        }
        //pawns that can attack, must attack in order to move
        else if(!obsticlePiece && movingPiece.isType("pawn") && canAttack)
        {
            valid = false;
        }
        else{
            valid = true;
        }
        //King cannot put itself in check
        if(movingPiece.type === PieceTypes.King){
            var enemyTeam = movingPiece.getEnemyTeam();
            var enemyValidMoves = boardPieces.getMovesForTeam(enemyTeam);
            enemyValidMoves.forEach(function(enemyMove){
                if(enemyMove.equals(move)){
                    valid = false;
                }
            });
        }
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
    createMovesLine: createMovesLine,
    getRookMoves: getRookMoves,
    getPawnMoves: getPawnMoves,
    getBishopMoves: getBishopMoves,
    getQueenMoves: getQueenMoves,
    getKingMoves: getKingMoves,
    getKnightMoves: getKnightMoves
};

exports.private = privateFunctions;