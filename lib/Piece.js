var BoardProperties = require('./BoardProperties'),
    newBoard = BoardProperties.NewBoard,
    Teams = require('./Teams'),
    WhiteTeam = Teams.White,
    BlackTeam = Teams.Black;

function Piece(t, pos){
    this.team = t;
    this.position = pos;
    if(pos) {
        this.type = GetPieceType(pos); 
        this.id = (t.charAt(0) + pos.row + pos.column);
    }
    if(this.type === BoardProperties.PieceTypes.King){
        this.inCheck = false;
    }
    this.validMoves = [];
    this.hasMoved = false;
}

function GetPieceType(pos) {
    var col = pos.column,
        row = pos.row;
    return newBoard[col][row];
}

var privateFunctions = {
    GetPieceType: GetPieceType
};

Piece.prototype.isType = function(type){
    return (this.type === type);
};

Piece.prototype.getEnemyTeam = function(){
    if(this.team === WhiteTeam){
        return BlackTeam;
    }
    else{
        return WhiteTeam;
    }
};

Piece.prototype.containsValidMove = function(move){
    var containsValidMove = false;
    this.validMoves.forEach(function(validMove){
        if(validMove.equals(move)){
            containsValidMove = true;
        }
    });
    return containsValidMove;
};

Piece.prototype.equals = function(piece){
    return (this.id === piece.id);
};

Piece.prototype.getValidMovesString = function(){
    var moves = "";
    this.validMoves.forEach(function(move){
        moves += move.toString() + " ";
    });
    return moves;
};

module.exports = Piece;
module.exports.private = privateFunctions;