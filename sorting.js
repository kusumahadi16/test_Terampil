// const inputArray = ['D','H','S','A','G','F','D','O','I','O','U']
const inputArray = [3, 2, 4, 5, 1, 6, 6]
let finalArray = inputArray.filter((item, index) => inputArray.indexOf(item) === index).sort().reverse();
console.log(finalArray);