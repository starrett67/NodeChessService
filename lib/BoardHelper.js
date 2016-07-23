var Piece = require('./Piece');
var Position = require('./Position');

var createBlankBoard = function(){
    var board = {};
    board.a = new Array(8);
    board.b = new Array(8);
    board.c = new Array(8);
    board.d = new Array(8);
    board.e = new Array(8);
    board.f = new Array(8);
    board.g = new Array(8);
    board.h = new Array(8);
    return board;
}

var Print = function(board){
    var printingBoard = "";
    for(var row = 7; row >= 0; row--){    
        board.forEachKey(function(col){
            var spot = board[col][row];
            if(spot){
                printingBoard += "[ " + spot.team.charAt(0) + spot.type.charAt(0) + " ]"  
            }
            else
            {
                printingBoard += "[ Ee ]";  
            }            
        });
        printingBoard += "\n"
    }
    console.log(printingBoard);
}

var insertWhiteTeam = function(board){
    board.forEachKey(function(col){
        for(var row = 0; row < 2; row++){
            board[col][row] = new Piece("White", new Position(col, row + 1));   
        }
    });
}

var insertBlackTeam = function(board){
    board.forEachKey(function(col){
        for(var row = 6; row < 8; row++){
            board[col][row] = new Piece("Black", new Position(col, row + 1));   
        }
    });
}

var createNewBoard = function(){
    var board = createBlankBoard();
    insertWhiteTeam(board);
    insertBlackTeam(board);
    Print(board);
    return board;
}

Object.prototype.forEachKey = function(callback){
    Object.keys(this).forEach(function(key){
        callback(key);
    });
}

var privateFunctions = {
    createBlankBoard: createBlankBoard,
    insertBlackTeam: insertBlackTeam,
    insertWhiteTeam: insertWhiteTeam
};

exports.createNewBoard = createNewBoard;
exports.printBoard = Print;
exports.private = privateFunctions;