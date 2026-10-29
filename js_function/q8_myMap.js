Array.prototype.myMap = function (callback) {
  const result = []; 
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }
  return result; 
};
const doubled = [1, 2, 3].myMap(num => num * 2);
console.log("Double:", doubled); 
const squared = [1, 2, 3, 4].myMap(num => num ** 2);
console.log("Square:", squared); 
const withIndex = ["a", "b", "c"].myMap((char, i) => `${i}:${char}`);
console.log("With Index:", withIndex); 
const original = [10, 20, 30];
original.myMap(x => x + 1);
console.log("Original unchanged:", original); 
const nativeResult = [1, 2, 3].map(num => num * 2);
const customResult = [1, 2, 3].myMap(num => num * 2);
console.log("Matches native map:", JSON.stringify(nativeResult) === JSON.stringify(customResult));
