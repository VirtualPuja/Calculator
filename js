//Calculator Object to keep track of all props/values
const calculator = {
  displayValue: 0,
  firstNum: null,
  waitingForSecondNum: false,
  operator: null,  
};


//DOM Elements 
const display = document.querySelector(".calculator-screen");
const inputOperator = document.querySelector(".operator");
const numbers = document.querySelectorAll(".number");
const decimal = document.querySelector(".decimal");
const allClear = document.querySelector(".all-clear");
const equal = document.querySelector(".equal");
console.log(numbers)
//still can't get actual numbers to show --- this is one approach
const keys = document.querySelector(".keys");
numbers.forEach(number => {
  number.addEventListener("click", (event) => {
    num = document.querySelector("number");
    console.log(event)
  })
})
//rest of code
const keys = document.querySelector(".keys");
keys.addEventListener("click", e => {
  //if the target matches the element button, then do next steps
  if (e.target.matches("button")) { 
    if (e.target == numbers) {
      console.log("it's a number");
      return;
    } if (e.target == inputOperator) {
      console.log("operator");
     return;
    } if (e.target === decimal) {
      console.log("it's a decimal");
      return;
    } 
  }
});
