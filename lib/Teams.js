var WhiteTeam = "White";
var BlackTeam = "Black";
Object.prototype.getOtherTeam = function(team){
    if(team === WhiteTeam){
        return BlackTeam;
    }
    else{
        return WhiteTeam;
    }
};
exports.White = WhiteTeam;
exports.Black = BlackTeam;

