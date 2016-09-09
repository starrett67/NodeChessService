var Piece = require('./Piece'),
    Position = require('./Position'),
    Columns = ["a","b","c","d","e","f","g","h"],
    Rows = [1,2,3,4,5,6,7,8];

var forEachRow = function(callback){
    Rows.forEach(function(row){
        callback(row);
    });
};

var forEachColumn = function(callback){
    Columns.forEach(function(col){
        callback(col);
    });
};

var forEachPosition = function(callback){
    forEachRow(function(row){
        forEachColumn(function(col){
            callback(new Position(col, row));
        });
    });
};

var getColumnIndex = function(col){
    return Columns.indexOf(col) + 1;
};

function PieceTypes() {
    this.Pawn = "pawn";
    this.Rook = "rook";
    this.Knight = "knight";
    this.Queen = "queen";
    this.Bishop = "bishop";
    this.King = "King";
}

var pieceTypes = new PieceTypes();

var NewBoard = {
    a:{
        1: pieceTypes.Rook,
        2: pieceTypes.Pawn,
        7: pieceTypes.Pawn,
        8: pieceTypes.Rook
    },
    b:{
        1: pieceTypes.Knight,
        2: pieceTypes.Pawn,
        7: pieceTypes.Pawn,
        8: pieceTypes.Knight
    },
    c:{
        1: pieceTypes.Bishop,
        2: pieceTypes.Pawn,
        7: pieceTypes.Pawn,
        8: pieceTypes.Bishop
    },
    d:{
        1: pieceTypes.Queen,
        2: pieceTypes.Pawn,
        7: pieceTypes.Pawn,
        8: pieceTypes.Queen
    },
    e:{
        1: pieceTypes.King,
        2: pieceTypes.Pawn,
        7: pieceTypes.Pawn,
        8: pieceTypes.King
    },
    f:{
        1: pieceTypes.Bishop,
        2: pieceTypes.Pawn,
        7: pieceTypes.Pawn,
        8: pieceTypes.Bishop
    },
    g:{
        1: pieceTypes.Knight,
        2: pieceTypes.Pawn,
        7: pieceTypes.Pawn,
        8: pieceTypes.Knight
    },
    h:{
        1: pieceTypes.Rook,
        2: pieceTypes.Pawn,
        7: pieceTypes.Pawn,
        8: pieceTypes.Rook
    }
};

exports.forEachRow = forEachRow;
exports.forEachColumn = forEachColumn;
exports.forEachPosition = forEachPosition;
exports.getColumnIndex = getColumnIndex;
exports.NewBoard = NewBoard;
exports.PieceTypes = pieceTypes;
exports.Columns = Columns;
exports.Rows = Rows;