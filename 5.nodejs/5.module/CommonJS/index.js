const { add, sub, mul, div } = require("./calculation");

const sum = add(10, 2);
const diff = sub(10, 2);
let prod = mul(10, 2);
let quot = div(10, 2);

console.log(sum, diff, prod, quot);
