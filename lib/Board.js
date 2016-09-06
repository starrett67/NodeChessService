var Piece = require('./Piece'), 
    Position = require('./Position'),
    NewBoard = require('./NewBoard.json'),
    Teams = require('./Teams'),
    WhiteTeam = Teams.White,
    BlackTeam = Teams.Black;    

function Board ()
{
    this.Pieces = [];
    createNewBoard(this);
}

Array.prototype.getPieceInPosition = function(col, row){
    var locatedPiece;
    this.forEach(function(piece){
        if (piece.position.column === col && piece.position.row === row)
        {
            locatedPiece = piece;
        }
    });
    return locatedPiece;
};

Board.prototype.print = function(){
    var printingBoard = "";
    var self = this;
    for(var row = 1; row <= 8; row++){
        NewBoard.forEachKey(function(col){
            var piece = self.Pieces.getPieceInPosition(col, row);
            if(piece)
            {
                printingBoard += " [" + piece.team.charAt(0) + piece.type.charAt(0) + "] ";
            }
            else
            {
                printingBoard += " [  ] ";
            }
        });
        printingBoard += "\n";
    }
    
    console.log(printingBoard);
};

var insertWhiteTeam = function(self){
    NewBoard.forEachKey(function(col){
        for(var row = 1; row <= 2; row++){
            self.Pieces.push(new Piece(WhiteTeam, new Position(col, row)));   
        }
    });
};

var insertBlackTeam = function(self){
    NewBoard.forEachKey(function(col){
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

var privateFunctions = {
    insertBlackTeam: insertBlackTeam,
    insertWhiteTeam: insertWhiteTeam,
    createNewBoard: createNewBoard
};

module.exports = Board;
exports.private = privateFunctions;