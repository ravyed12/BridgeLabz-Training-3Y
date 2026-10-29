const userArrow = {
  name: "Raghav",
  showName: () => {
    console.log("Arrow - this.name:", this.name); 
  }
};
userArrow.showName();
const userNormal = {
  name: "Raghav",
  showName: function () {
    console.log("Normal - this.name:", this.name); 
  }
};
userNormal.showName();
