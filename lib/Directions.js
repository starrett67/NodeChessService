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

exports.allDirections = [
    verticalDown,
    verticalUp,
    horizontalLeft,
    horizontalRight,
    diagonalDownLeft,
    diagonalDownRight,
    diagonalUpLeft,
    diagonalUpRight
]