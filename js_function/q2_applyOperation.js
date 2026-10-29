function applyOperation(numbers, operation) {
  const result = [];
  for (let i = 0; i < numbers.length; i++) {
    result.push(operation(numbers[i])); 
  }
  return result;
}
const doubled = applyOperation([1, 2, 3, 4], function double(n) {
  return n * 2;
});
console.log("Doubled:", doubled); 
const squared = applyOperation([1, 2, 3, 4], function square(n) {
  return n * n;
});
console.log("Squared:", squared);
