var BoardProperties = require('./BoardProperties'),
    newBoard = BoardProperties.NewBoard;

function Piece(t, pos){
    this.team = t;
    this.position = pos;
    if(pos) {
        this.type = GetPieceType(pos); 
        this.id = (t.charAt(0) + pos.row + pos.column);
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


module.exports = Piece;
module.exports.private = privateFunctions;