function Position(column, row){
    this.row = row;
    this.column = column;
}

Position.prototype.isValid = function(){
    return (this.row && this.column);
};

Position.prototype.equals = function(pos){
    return (this.row === pos.row && this.column === pos.column);
};

module.exports = Position;