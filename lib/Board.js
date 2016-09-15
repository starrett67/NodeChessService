var Piece = require('./Piece'), 
    Position = require('./Position'),
    BoardProperties = require('./BoardProperties'),
    Teams = require('./Teams'),
    WhiteTeam = Teams.White,
    BlackTeam = Teams.Black;

function Board ()
{
    this.Pieces = [];
    createNewBoard(this);
}

var insertWhiteTeam = function(self){
    BoardProperties.forEachColumn(function(col){
        for(var row = 1; row <= 2; row++){
            self.Pieces.push(new Piece(WhiteTeam, new Position(col, row)));   
        }
    });
};

var insertBlackTeam = function(self){
    BoardProperties.forEachColumn(function(col){
        for(var row = 7; row <= 8; row++){
            self.Pieces.push(new Piece(BlackTeam, new Position(col, row)));   
        }
    });
};

var createNewBoard = function(self){
    insertWhiteTeam(self);
    insertBlackTeam(self);
};

Object.prototype.forEachKey = function(callback){
    Object.keys(this).forEach(function(key){
        callback(key);
    });
};

Board.prototype.getPieceInPosition = function(pos){
    var locatedPiece;
    this.Pieces.forEach(function(piece){
        if (piece.position.equals(pos)){
            locatedPiece = piece;
        }
    });
    return locatedPiece;
};

Board.prototype.getPiecesForTeam = function(team){
    var pieces = [];
    this.Pieces.forEach(function(piece){
        if(piece.team === team){
            pieces.push(piece);
        }
    });
    return pieces;
};

Board.prototype.getMovesForTeam = function(team){
    var pieces = this.getPiecesForTeam(team);
    var moves = [];
    pieces.forEach(function(piece){
        moves = moves.concat(piece.validMoves);
    });
    return moves;
};

Board.prototype.removePiece = function(piece){
    for(var i = 0; i < this.Pieces.length; i++){
        if (this.Pieces[i].equals(piece)){
            this.Pieces.splice(i, 1);
            break;
        }
    }
};

Board.prototype.getKingPiece = function(team, log){
    var pieceFound = null;
    this.Pieces.forEach(function(piece){        
        if(piece.type === BoardProperties.PieceTypes.King && piece.team === team){
            pieceFound =  piece;
        }
    });
    return pieceFound;
};

//Extention Methods
Board.prototype.print = function(){
    var printingBoard = "";
    var self = this;
    BoardProperties.forEachPosition(function(pos){   
        if(pos.column === "a"){ printingBoard += pos.row + " "; } 
        var piece = self.getPieceInPosition(pos);
        if(piece)
        {
            printingBoard += " [" + piece.team.charAt(0) + piece.type.charAt(0) + "] ";
        }
        else
        {
            printingBoard += " [  ] ";
        }
        if(pos.column === "h"){ printingBoard += "\n"; }        
    });
    printingBoard += "  ";
    BoardProperties.forEachColumn(function(col){
        printingBoard += "  " + col.toUpperCase() + "   ";
    });    
    console.log(printingBoard);
};

var privateFunctions = {
    insertBlackTeam: insertBlackTeam,
    insertWhiteTeam: insertWhiteTeam,
    createNewBoard: createNewBoard
};

module.exports = Board;
exports.private = privateFunctions;