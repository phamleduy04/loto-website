const _ = require('lodash');
module.exports = () => {
    const board = [];
    // board 9x9
    // per row have 4 blank cells
    for (let i = 1; i < 10; i++) {
        const min = (i - 1) * 10 + 1; 
        const max = i * 10;
        board.push(_.shuffle(createArray(min, max)));
    }
    
    return generateTable(transpose(board));

};

// tạo array từ min -> max
function createArray(min, max) {
    const array = [];
    for (let i = min; i < max; i++) array.push(i);
    return array;
};

// transpose matrix (đổi chỗ ma trận hàng ngang thành hàng dọc và ngược lại)
function transpose (matrix) {
    let [row] = matrix
    return row.map((value, column) => matrix.map(row => row[column]))
};


// tạo bảng và xoá random 4 vị trí trong bảng
function generateTable(matrix) {
    // remove random 4 cells per row
    for (let i = 0; i < matrix.length; i++) {
        // chọn 4 số đầu tiên sau khi shuffle array để xoá  
        const toRemove = _.shuffle(matrix[i]).slice(0, 4);
        for (let z = 0; z < matrix[i].length; z++) if (toRemove.includes(matrix[i][z])) matrix[i][z] = null;
    }
    return matrix;
};