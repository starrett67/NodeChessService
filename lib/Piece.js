var newBoard = require('./NewBoard');

function Piece(t, pos){
    this.team = t;
    this.position = pos;
    this.type = GetPieceType(pos);
    this.id = (t.charAt(0) + pos.row + pos.column);
}

function GetPieceType(pos) {
    return newBoard[pos.column][pos.row];
}

var privateFunctions = {
    GetPieceType: GetPieceType
};


module.exports = Piece;
module.exports.private = privateFunctions