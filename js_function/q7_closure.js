function makeMultiplier(multiplier) {
  return function (number) {
    return number * multiplier; 
  };
}
const triple = makeMultiplier(3); 
const double = makeMultiplier(2); 
const quintuple = makeMultiplier(5); 
console.log(triple(5));     
console.log(double(10));    
console.log(quintuple(4));
