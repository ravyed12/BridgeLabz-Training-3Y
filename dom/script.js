console.log("hello aryan!")

console.log(document)



// changing the color

// let headingE1=document.getElementById("heading");

// headingE1.style.color="red";

// // background color
// headingE1.style.backgroundColor="skyblue";

// console.log(heading1);


//


// another way of above

// let headingE1=document.querySelector("#heading");
// headingE1.style.color="green";



// to insert a h2 in existing h1

// headingE1.style.backgroundColor="lightblue";
// headingE1.textContent="qwertyuiop"
// headingE1.innerHTML += "<h2>hello this is a  new elemnet </h2>"



// let headingE1=document.querySelector("#heading");
// headingE1.style.color="green";
// let btnE1=document.querySelector("#btn");

// func =()=>{
// headingE1.style.color="red";
// }

// funct =()=>{
// headingE1.style.color="blue";
// }

// btnE1.addEventListener("dblclick",func)
// btnE1.addEventListener("click",funct)


let headingE1=document.querySelector("#heading");
let btnE1=document.querySelector("#inc");
let btnDecrE1=document.querySelector("#Decr");
let btnresE1=document.querySelector("#res");

let count=0;

btnE1.addEventListener("click",()=>{
    count++;
    headingE1.textContent=count
})

btnDecrE1.addEventListener("click",()=>{
    count--;
    headingE1.textContent=count
})


btnresE1.addEventListener("click",()=>{
    count=0;
    headingE1.textContent=count
})
