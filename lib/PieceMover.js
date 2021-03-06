var Position = require('./Position'),
    Directions = require('./Directions'),
    Direction = require('./Direction'),
    BoardProperties = require('./BoardProperties'),
    PieceTypes = BoardProperties.PieceTypes,
    Teams = require('./Teams'),
    WhiteTeam = Teams.White,
    BlackTeam = Teams.Black;

//move piece, update valid moves, update board
var movePiece = function(board, piece, move){
    if(board && piece && move.isValid()){
        if(piece.containsValidMove(move)){
            //kill piece first
            var killedPiece = board.getPieceInPosition(move);
            if(killedPiece){
                board.removePiece(killedPiece);
            }
            piece.position = move;
            piece.hasMoved = true;
            getAllValidMoves(board);            
            return true;
        }
        else{
            console.log('That move is not valid please select a valid move');
            return false;
        }
    }
    else{
        console.log('Move input invaild. Please select a valid move');
    }
};

//flag king in check
var flagKingInCheck = function(board, team){
    var king = board.getKingPiece(team);
    var enemyMoves = board.getMovesForTeam(Teams.getOtherTeam(team));
    var isInCheck = false;
    if(king){
        enemyMoves.forEach(function(move){
            if(move.equals(king.position)){
                isInCheck = true;
            }
        });
        king.inCheck = isInCheck;
    }
};

//set valid moves for all pieces on a team
var getAllValidMoves = function(board){
    board.Pieces.forEach(function(piece){
        getValidMoves(board, piece);
    });
    flagKingInCheck(board, WhiteTeam);
    flagKingInCheck(board, BlackTeam);
};

var getValidMoves = function(board, movingPiece){
    switch(movingPiece.type){
        case PieceTypes.Pawn:
            var moves = getPawnMoves(board, movingPiece);
            movingPiece.validMoves = moves;
            break;
        case PieceTypes.Bishop:
            var moves = getBishopMoves(board, movingPiece);
            movingPiece.validMoves = moves;
            break;
        case PieceTypes.King:
            var moves = getKingMoves(board, movingPiece);
            movingPiece.validMoves = moves;
            break;
        case PieceTypes.Queen:
            var moves = getQueenMoves(board, movingPiece);
            movingPiece.validMoves = moves;
            break;
        case PieceTypes.Rook:
            var moves = getRookMoves(board, movingPiece);
            //console.log(moves);
            movingPiece.validMoves = moves;
            //console.log(movingPiece);
            break;
        case PieceTypes.Knight:
            var moves = getKnightMoves(board, movingPiece);
            movingPiece.validMoves = moves;
            break;
    }
};

//get full list of pawn valid moves
var getPawnMoves = function(board, pawn){
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
        if(isValidMove(board, diagonalLeftMove, pawn, true))
        {
            moves.push(diagonalLeftMove);
        }
    }
    if(diagonalRightMove){
        if(isValidMove(board, diagonalRightMove, pawn, true))
        {
            moves.push(diagonalRightMove);
        }
    }
    //verticle moves
    if(verticalMove && isValidMove(board, verticalMove, pawn, false)){
        moves.push(verticalMove);
        if(verticalJumpMove && isValidMove(board, verticalJumpMove, pawn, false)){
            moves.push(verticalJumpMove);
        }
    }
    return moves;
};

//get all straight line moves
var getRookMoves = function(board, Rook){
    var moves = [];
    var directions = Directions.straightDirections;
    directions.forEach(function(direction){
        moves = moves.concat(createMovesLine(board, Rook, direction));
    });
    return moves;
};

//get all diagonal moves
var getBishopMoves = function(board, Bishop){
    var moves = [];
    var directions = Directions.diagonalDirections;
    directions.forEach(function(direction){
        moves = moves.concat(createMovesLine(board, Bishop, direction));
    });
    return moves;
};

//queen = bishop + rook
var getQueenMoves = function(board, Queen){
    var moves = [];
    moves = moves.concat(getBishopMoves(board, Queen));
    moves = moves.concat(getRookMoves(board, Queen));
    return moves;
};

var getKnightMoves = function(board, Knight){
    var moves = [];
    Directions.knightDirections.forEach(function(direction){
        var move = getNextMove(Knight.position, direction);
        if(isValidMove(board, move, Knight)){
            moves.push(move);
        }
    });
    return moves;
};

var getKingMoves = function(board, King){
    var moves = [];
    Directions.allDirections.forEach(function(direction){
        var move = getNextMove(King.position, direction);
        if (isValidMove(board, move, King)){
            moves.push(move);
        }
    });
    return moves;
};

//Create line of moves, used for rooks, bishops, and queens
var createMovesLine = function(board, piece, direction){
    var nextMove = getNextMove(piece.position, direction);
    var moves = [];
    while(nextMove){
        if(isValidMove(board, nextMove, piece, true)){
            moves.push(nextMove);
        }
        //need to stop if a piece is going to be attacked
        if(board.getPieceInPosition(nextMove))
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
        var nextRow = parseInt(row) + parseInt(rowDirection);   
        if(isValidCoordinate(nextRow)){
            return nextRow;
        }
    }
};

//get next column in a direction and return it if its valid
var getNextColumn = function(col, colDirection){
    if(col){
        var index = parseInt(BoardProperties.getColumnIndex(col)) + parseInt(colDirection);
        if(isValidCoordinate(index + 1)){
            return BoardProperties.Columns[index];
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
var isValidMove = function(board, move, movingPiece, canAttack){
    var valid = false;
    if(board && move && movingPiece){
        var obsticlePiece = board.getPieceInPosition(move);
        if(obsticlePiece){
            if(canTakePiece(obsticlePiece, movingPiece) && canAttack){
                valid = true;
            }
        }
        //Pawns that can attack, must attack in order to move
        else if(!obsticlePiece && movingPiece.isType(BoardProperties.PieceTypes.Pawn) && canAttack){
            valid = false;
        }
        else{
            valid = true;
        }
        //King cannot put itself in check
        if(movingPiece.type === PieceTypes.King){
            var enemyTeam = movingPiece.getEnemyTeam();
            var enemyValidMoves = board.getMovesForTeam(enemyTeam);
            enemyValidMoves.forEach(function(enemyMove){
                if(enemyMove.equals(move)){
                    valid = false;
                }
            });
        }
        //If king is in check, only moves that remove the king from check are valid
        var king = board.getKingPiece(movingPiece.team);
        if(king && valid && king.inCheck){
            valid = willMoveSaveTheKing(board, move, movingPiece);
        }
    }
    
    return valid;
};

//Check if a move will break king out of check
var willMoveSaveTheKing = function(board, move, movingPiece){
    //The idea is to simulate the move, then check if the king is inCheck
    var tempBoard = JSON.parse(JSON.stringify(board));
    var piece = tempBoard.getPieceInPosition(movingPiece.position);
    movePiece(tempBoard, movingPiece, move);
    return !tempBoard.getKingPiece(movingPiece.team).inCheck;
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
exports.getValidMoves = getValidMoves;
exports.movePiece = movePiece;
exports.getAllValidMoves = getAllValidMoves;