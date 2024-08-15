const inputNum = (num, operand) => {
    return operand === "0" || ""
    ? num 
    : operand === "-0"
    ? "-" + num
    : operand.match(/\d/g) == null
    ? num
    : operand.match(/\d/g).length < 9 
    ? operand + num 
    : operand
}

const checkPoint = (num1, num2, operator) => {
    if (!operator && num1.search(/\./) !== 1) {
        return num1 + '.'
    } else if (operator && num2.search(/\./) !== 1) {
        return num2 + '.'
    }
}

const setSign = (num) => {
    return num === "0" || ""
        ? "-0" 
        : num === "-0" 
        ? "0" 
        : num * -1
}

const calculateResult = (num1, num2, operator) => {
    switch (operator) {
        case "×":
            return num1 * num2;
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        default:
            return num1 / num2;
    }
}

const standardDisplay = (num) => {
    if ((num >= 1000000000 || num <= -1000000000) || (num  < 0.00001 && num > -0.00001)) {
        return(num.toExponential(5))
        } else if (String(num).length > 9 && (num < 0.0001 || num > -0.0001)) {
            return(num.toPrecision(7))
        } else if (String(num).length > 9 && (num < 0.001 || num > -0.001)) {
            return(num.toPrecision(8))
        } else if (String(num).length > 9) {
            return(num.toPrecision(9))
        } else {
            return(num)
        } 
}

export { inputNum, calculateResult, checkPoint, setSign, standardDisplay }
