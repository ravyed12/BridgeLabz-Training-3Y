// async: setTimeout, setInterval, fetch, event
//  console.log("Start");




// function getuser(callback){
//     setTimeout(() => {
//     console.log("user data..");
//     callback();
// }, 2000);

// }
 
// function getuserBankDeatils(){
//     setTimeout(() => {
//     console.log("user bank details");
// }, 1000);  
// }

// function getuserInc(){
//     setTimeout(() => {
//     console.log("user income details"); 
// }, 2000);  
// }

// callback, promise, async await

// getuser();  
// getuserBankDeatils();
// console.log(getuser());
// console.log(getuserBankDeatils());

// this is callback hell below
// getuser(()=>{
//     getuserBankDeatils()
//     getuserInc()
// })

// console.log("End");


let mypromise = new Promise((resolve, reject)=>{
    let age=20;
    if(age>18){
        resolve("You are eligible to vote");
    } else {
        reject("You are not eligible to vote");
    }
});



mypromise
.then((msg)=>{
    console.log(msg)
})
.catch((err)=>{
    console.log(err)
});