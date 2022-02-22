let obj = [1, 2, 3, 4, 5];
obj.sum = () => {
    let sum = 0;
    for (let i = 0; i < obj.length; i++) {
        sum += obj[i];
    }
    return sum;
};


obj.sum();


// });
// Marks: [
//     {_id: 1, marks: 1},
//     {_id: 2, marks: 2}
//     {_id: 3, marks: 4},
//     {_id: 4, marks: 1},
//     {_id: 5, marks: 1},
//     {_id: 6, marks: 2},
//     {_id: 7, marks: 2},
//     {_id: 8, marks: 7},
//     {_id: 9, marks: 7},
//     {_id: 10, marks: 1}
//     ]
//     Output: [{marks:1, count: 4},{marks:2, count: 3}, {marks:4, count: 1},{marks:7, count: 2}]



