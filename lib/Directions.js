var Direction = require('./Direction');

//straight
var verticalUp = new Direction(0, 1);
var verticalDown = new Direction(0, -1);
var horizontalRight = new Direction(1, 0);
var horizontalLeft = new Direction(-1, 0);

//diagonal
var diagonalUpRight = new Direction(1, 1);
var diagonalDownRight = new Direction(1, -1);
var diagonalDownLeft = new Direction(-1, -1);
var diagonalUpLeft = new Direction(-1, 1);

//knights
var knightVertUpRight = new Direction(2, 1);
var knightVertUpLeft = new Direction(2, -1);
var knightVertDownRight = new Direction(-2, 1);
var knightVertDownLeft = new Direction(-2, -1);
var knightHorzUpRight = new Direction(1, 2);
var knightHorzUpLeft = new Direction(1, -2);
var knightHorzDownRight = new Direction(-1, 2);
var knightHorzDownLeft = new Direction(-1, -2);

exports.verticalUp = verticalUp;
exports.verticalDown = verticalDown;
exports.horizontalLeft = horizontalLeft;
exports.horizontalRight = horizontalRight;
exports.diagonalDownLeft = diagonalDownLeft;
exports.diagonalDownRight = diagonalDownRight;
exports.diagonalUpLeft = diagonalUpLeft;
exports.diagonalUpRight = diagonalUpRight;

exports.straightDirections = [
    verticalDown,
    verticalUp,
    horizontalLeft,
    horizontalRight
];

exports.diagonalDirections = [
    diagonalDownLeft,
    diagonalDownRight,
    diagonalUpLeft,
    diagonalUpRight
];

exports.knightDirections = [
    knightVertUpRight,
    knightVertUpLeft,
    knightVertDownRight,
    knightVertDownLeft,
    knightHorzUpRight,
    knightHorzUpLeft,
    knightHorzDownRight,
    knightHorzDownLeft
];

exports.allDirections = [
    verticalDown,
    verticalUp,
    horizontalLeft,
    horizontalRight,
    diagonalDownLeft,
    diagonalDownRight,
    diagonalUpLeft,
    diagonalUpRight
];