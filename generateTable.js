const _ = require('lodash');
module.exports = () => {
    const board = [];
    // board 9x9
    // per row have 4 blank cells
    for (let i = 1; i < 10; i++) {
        let min, max;
        if (i == 1) {
            min = 1;
            max = 10;
        }
        else {
            min = (i - 1) * 10 + 1; 
            max = i * 10;
        }
        board.push(_.shuffle(createArray(min, max)));
    }
    
    return generateTable(transpose(board));

};

function createArray(min, max) {
    const array = [];
    for (let i = min; i < max; i++) array.push(i);
    return array;
}

function transpose (matrix) {
    let [row] = matrix
    return row.map((value, column) => matrix.map(row => row[column]))
}

function generateTable(matrix) {
    // remove random 4 cells per row
    for (let i = 0; i < matrix.length; i++) {
        const rowShuffled = _.shuffle(matrix[i]);
        const toRemove = [];
        for (let j = 0; j < 4; j++) toRemove.push(rowShuffled.shift())
        for (let z = 0; z < matrix[i].length; z++) if (toRemove.includes(matrix[i][z])){
            matrix[i][z] = null;
        } 
    }
    return matrix;
}

// $(document).ready(function() {
// 	$("body").css("background-color", "hsla(" + Math.floor(Math.random() * (360)) + ", 75%, 58%, 1)");
// });