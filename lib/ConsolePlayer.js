var PieceMover = require('./PieceMover'),
    Position = require('./Position'),
    Board = require('./Board'),
    prompt = require('prompt-sync')(),
    Teams = require('./Teams'),
    WhiteTeam = Teams.White,
    BlackTeam = Teams.Black,
    statusMessage = "",
    turn = WhiteTeam,
    winner = "";

var board = new Board();
PieceMover.getAllValidMoves(board, turn);
function playGame(){
    while(!winner){        
        var piece = selectPiece();
        makeMove(piece);
        checkForWinner();
        swapTurn();        
    }
}

function checkForWinner(){
    var enemyTeam = Teams.getOtherTeam(turn);
    var enemyMovesCount = board.getMovesForTeam(enemyTeam).length;
    var enemyKing = board.getKingPiece(enemyTeam, true);
    console.log(enemyTeam + "'s king incheck status: " + enemyKing.inCheck);
    consol.log(enemyTeam + "'s moves count " + enemyMovesCount);
    if(enemyKing.inCheck && enemyMovesCount === 0){
        winner = turn;
    }
    if(!enemyKing.inCheck && enemyMovesCount === 0){
        winner = "draw";
    }
}

function selectPiece(){
    var validSelection = false;
    statusMessage = turn + "'s turn. Please select a piece to move by its position (ex: e2)\n";
    while(!validSelection){
        printCurrentState();
        try{
            var location = prompt('Select Piece:');
            var pos = new Position(location[0], location[1]);
            var piece = board.getPieceInPosition(pos);
            console.log(piece.position.toString());
            console.log(piece.validMoves.length);
            if(piece && piece.validMoves.length > 0 && piece.team == turn){
                return piece;
            }
            else{
                statusMessage = "Invalid selection. Pleae try selecting a valid piece (ex: e2)";
            }
        }
        catch(ex){
            statusMessage = "Invalid input. Pleae try selecting a valid piece (ex: e2)";
            throw(ex);
        }        
    }
}

function makeMove(piece){
    var validMove = false;
    statusMessage = piece.type + " " + piece.position.column + piece.position.row + " selected. Select position to move (ex: d5)";
    statusMessage += "\n " + piece.getValidMovesString() + "\n";
    defaultMessage = statusMessage;
    while(!validMove){
        printCurrentState();
        try{
            var move = prompt('Select Move: ');
            move = new Position(move[0], move[1]);
            validMove = PieceMover.movePiece(board, piece, move);
        }
        catch(ex){            
            statusMessage = defaultMessage + "\nError while moving the piece. Try again.";
            throw(ex);
        }        
    }
}

function swapTurn(){
    if(turn === WhiteTeam){
        turn = BlackTeam;
    }
    else{
        turn = WhiteTeam;
    }
}

function printCurrentState(){
    //console.reset();
    board.print();
    console.log(statusMessage);
}

console.reset = function () {
  return process.stdout.write('\033c');
};

playGame();