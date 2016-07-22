
function Piece(t, pos){
    this.team = t;
    this.position = pos;
    this.id = (t.charAt(0) + pos.row + pos.column);
}

function Piece(t, pos, type){
    this.team = t;
    this.position = pos;
    this.id = (t.charAt(0) + pos.row + pos.column);
}

module.exports = Piece;