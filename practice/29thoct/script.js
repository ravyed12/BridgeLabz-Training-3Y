// console.log("start")
// console.log("end")


//sync-
//async-settiemout setintercal fetch event 
console.log("start");

function getUser(callback) {          
  setTimeout(() => {                
    console.log("hello");
    callback();
  }, 5000);
}

function getUserbankdetail() {
  setTimeout(() => {                 
    console.log("end");
  }, 2000);

  setTimeout(() => {                  
    console.log("welcome");
  }, 1000);
}

getUser(() => {
  getUserbankdetail();
});