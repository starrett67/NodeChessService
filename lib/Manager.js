var shortId = require('shortid');


function ChessBoard(){
    this.Board = CreateNewBoard();
    this._id = shortId.generate();
}