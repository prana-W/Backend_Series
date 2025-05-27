function add (a, b) {
    return a + b;
}

function subtract (a, b) {
    return a - b;
}
//! Exporting Module

// Method-I

//exporting both functions using module.exports
module.exports = {
    addFn: add,
    subFn: subtract
}

//Method-II

// Using exports.fn_name syntax to export functions

/*


exports.addFn = (a, b) => {
    return a + b;
};

exports.subtractFn = (a, b) => {
    return a - b;
};


 */