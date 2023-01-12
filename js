//variable for calc display 
const display = document.querySelector(".calculator-screen");

//Calculator Object to keep track of all props/values 
const calculator = {
  displayValue: "0",
  firstVal: null,
  waitingForSecondNum: false,
  operator: null,  
};

//function for any key that is initially pressed
function inputVal(val) {
//destructuring assignment for two of the calc properties, so these are the values that will constantly change when a number key or decimal key is pressed 
  const { displayValue, waitingForSecondNum } = calculator;  
//if this prop is strictly true, then calculator.displayValue is overwritten with the number/deicmal key that was clicked
    if (waitingForSecondNum === true) {
    calculator.displayValue = val;
    calculator.waitingForSecondNum = false;
  } else {
  //ternary operator is used to check if the current value on the screen is zero, if that's the case then screen is overwritten with the value of the key that was pressed and if there is already a number that isn't zero on the display, then the number is appended to it 
    calculator.displayValue = displayValue === "0" ? val : displayValue + val;
  }
  console.log(calculator)
}
//function for decimal
function inputDecimal(dot) {
  //if true, then displayValue will have a decimal with the number and waitingForSecondNum would be false, so that any additional digits are appended to the second number 
  if (calculator.waitingForSecondNum === true) {
  	calculator.displayValue = "0."
    calculator.waitingForSecondNum = false;
    return
  }
  //if displayValue doesn't contain a decimal point, then a dot is appended to the number 
  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
}
//function for operators 
function handleOperator(nextOperator) {
  const { firstVal, displayValue, operator } = calculator
//variable to store string value that is convereted to a floating-point number using parseFloat method 
  const convToNum = parseFloat(displayValue);
  //if decide to change operator from one to another 
  if (operator && calculator.waitingForSecondNum) {
    calculator.operator = nextOperator;
    return;
  }
  //if firstVal is a number, then convert to a floating-point number
  if (firstVal == null && !isNaN(convToNum)) {
    calculator.firstVal = convToNum;
  } else if (operator) {
    //variable stores result of math function from below
    const result = mathOper(firstVal, convToNum, operator);
    
    calculator.displayValue = parseFloat(result.toFixed(7));
    calculator.firstVal = result;
  }  
  calculator.waitingForSecondNum = true;
  //nextOperator would be the equal sign 
  calculator.operator = nextOperator;
}

console.log(mathOper(77, 9, "+"))
//function for math calculations
function mathOper(firstVal, secondNum, operator) {
    if (operator === '+') {
    return firstVal + secondNum;
  } else if (operator === '-') {
    return firstVal - secondNum;
  } else if (operator === '*') {
    return firstVal * secondNum;
  } else if (operator === '/') {
    return firstVal / secondNum;
  }
  return secondNum;
}

//reset calculator
function clearCalc(){
  calculator.displayValue = "0";
  calculator.firstVal = null;
  calculator.waitingForSecondNum = false;
  calculator.operator = null;
}

function updateDisplay() {
  display.value = calculator.displayValue;
}
updateDisplay();

const keys = document.querySelectorAll("#button");

function pressKey(event){
  const {target} = event;
  console.log(target)
  //value attribute for each target element
  const  {value} = target;
  console.log(value)
 //switch method for various cases and the function that corresponds with said cases 
   switch(value) {
    case '+':
    case '-':
    case '*':
    case '/':
    case '=':  
      handleOperator(value);      
      console.log(calculator)
      break;
    case '.':
      inputDecimal(value);
      break;
    case 'all-clear':
      clearCalc();
      break;   
      default:
        if (Number.isInteger(parseFloat(value))) {
          inputVal(value);
        }   
  }
     updateDisplay(); 
} //for loop to iterate through all the keys
 for (let i = 0; i < keys.length; i++) {
  keys[i].addEventListener("click", pressKey);   
  console.log(keys[0])}
