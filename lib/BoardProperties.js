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

exports.forEachRow = forEachRow;
exports.forEachColumn = forEachColumn;
exports.forEachPosition = forEachPosition;