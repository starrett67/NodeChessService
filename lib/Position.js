function Position(column, row){
    this.row = row;
    this.column = column;
}

Position.prototype.isValid = function(){
    return (this.row && this.column);
};

module.exports = Position;