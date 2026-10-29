function Person_Proto(name) {
  this.name = name;
}
Person_Proto.prototype.showName = function () {
  console.log(`[Proto] Name: ${this.name}`);
};
function Student_Proto(name, branch) {
  Person_Proto.call(this, name);
  this.branch = branch;
}
Student_Proto.prototype = Object.create(Person_Proto.prototype);
Student_Proto.prototype.constructor = Student_Proto;
Student_Proto.prototype.showDetails = function () {
  console.log(`[Proto] Name: ${this.name} | Branch: ${this.branch}`);
};
class Person {
  constructor(name) {
    this.name = name; 
  }
  showName() {
    console.log(`[Class] Name: ${this.name}`);
  }
}
class Student extends Person {
  constructor(name, branch) {
    super(name);        
    this.branch = branch;
  }
  showDetails() {
    console.log(`[Class] Name: ${this.name} | Branch: ${this.branch}`);
  }
}
const protoStudent = new Student_Proto("Raghav", "CSE");
protoStudent.showName();    
protoStudent.showDetails(); 
const classStudent = new Student("Raghav", "CSE");
classStudent.showName();    
classStudent.showDetails(); 
console.log(classStudent instanceof Student); 
console.log(classStudent instanceof Person);  
console.log(typeof Person);
