const fs = require('fs')

/**
 * read  input from file as matrix, and the variable start means the maximum length of rows
 */
function readAsMatrix() {
    let filepath = process.argv[2];
        if (!filepath) {
        console.error('you should provide a file path as input');
        process.exit(1);
    }
    let inputData = fs.readFileSync(filepath).toString();
    let matrix = [];
    let start = 0;
    inputData.split('\n').forEach((row, index) => {
        if (row !== '') {
            let rowData = row.split(',');
            matrix.push(rowData.map((n) => parseInt(n)));
            if (rowData.length > start) start = rowData.length;
       }
    })
    return {matrix, start}
}

/**
 * if the matrix is of  magic square, then the sum is returned, otherwise 0 is returned
 */
function sumOfMagicSquare(mat) {
    let sum = 0;
    let n = mat[0].length
    for (let i = 0; i < n; i++) {
        sum += mat[i][i];
    }
    for (let i = 0; i < n; i++) {
        let rowSum = 0;
        for (let j = 0; j < n; j++)
            rowSum += mat[i][j];
        if (rowSum != sum)
            return 0;
    }
    for (let i = 0; i < n; i++) {
        let colSum = 0;
        for (let j = 0; j < n; j++)
            colSum += mat[j][i];
        if (sum != colSum)
            return 0;
    }
    return sum;

}

/**
 * save the result into the output file
 */
function saveResult(mat, sum) {
    let filepath = process.argv[2];
    let result = '';
    if(mat.length >= 1){
      mat.forEach((m) => {
        result += m.join('\n');
        result += '\n\n';
      })
      result += sum;
    }
    else result = 'no magic square';
    fs.writeFileSync(filepath+'.magic', result);
}

/**
 *  find all the valid sub matrices with dimension n.
 *  Like, if n is 3, then we will get all the valid 3x3 matrices from the input large matrix
 */
function findAllSubMatrices(matrix, n) {
    let matrices = [];
    for(let i = 0; i <= matrix.length - n; i++) {
        for( let j = 0; j <= matrix[i].length - n; j++ ) {
            let moveDown = false;
            let m = [];
            for(let k = i; k < i+n; k++) {
                //if the length of the row start from j is less than n, it means this is not a valid matrix
                //then we need to move the start point from (i, j) to (i+1, 0)
                if(matrix[k].slice(j, j+n).length !== n) {
                    moveDown = true;
                    break;
                }
                m.push(matrix[k].slice(j, j+n))
            }
            if (moveDown) break;
            matrices.push(m);
    }}
    return matrices;
}

/**
 * search for the largest magic square by iterating from the variable start, which is the maximum length of rows, until
 * start is equal to 3 which is the minimum dimension of possible magic square(3x3 matrix).
 */
function searchForLargestMagicSquare() {
    let {matrix, start} = readAsMatrix();
    let sum = 0;
    let target =  []
    while (start > 2) {
        let matrices = findAllSubMatrices(matrix, start);
        for (let i = 0; i < matrices.length; i++) {
            let res = sumOfMagicSquare(matrices[i]);
            if (res > sum ) {
                    sum =  res;
                    target = [];
                    target.push(matrices[i]);
            } else if (res === sum) {
                 target.push(matrices[i]);
            }
        }
        start -= 1;
    }
    saveResult(target, sum);
}

searchForLargestMagicSquare()
