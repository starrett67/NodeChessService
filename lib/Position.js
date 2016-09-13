function Position(column, row){
    this.row = row;
    this.column = column;
}

Position.prototype.isValid = function(){
    return (this.row && this.column);
};

Position.prototype.equals = function(pos){
    var aRow = this.row.toString().trim();
    var aCol = this.column.toString().trim();
    var eRow = pos.row.toString().trim();
    var eCol = pos.column.toString().trim();
    return (aRow === eRow && aCol === eCol);
};

Position.prototype.toString = function(){
    return "(" + this.column + "," + this.row + ")";
};

module.exports = Position;