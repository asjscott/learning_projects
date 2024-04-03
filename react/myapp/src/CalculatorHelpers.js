import { useState } from 'react'

const CalculatorHelpers = () => {

    const [calculationState, setCalculationState] = useState({
        operand1: "0",
        operand2: "",
        operator: "",
        equalPressed: false,
    })

    const [displayValue, setDisplayValue] = useState(calculationState.operand1)

    function handleNum(e) {
        const num = e.target.innerText
        if (!calculationState.operator) {
            setCalculationState({
                ...calculationState,
                operand1: calculationState.operand1 === "0" ? num : calculationState.operand1 === "-0" ? "-" + num : calculationState.operand1 + num,
            })
            setDisplayValue(calculationState.operand1 === "0" ? num : calculationState.operand1 === "-0" ? "-" + num : calculationState.operand1 + num)
            return;
        }
        setCalculationState({
            ...calculationState,
            operand2: calculationState.operand2 === "0" ? num : calculationState.operand2 === "-0" ? "-" + num : calculationState.operand2 + num,
        })
        setDisplayValue(calculationState.operand2 === "0" ? num : calculationState.operand2 === "-0" ? "-" + num : calculationState.operand2 + num)
    }

    function handleOperator(e) {
        let operator = e.target.innerText
        if (calculationState.operand1 !== "" && calculationState.operand2 !== "" && calculationState.equalPressed) {
            setCalculationState({
                operand1: calculationState.operand2,
                operand2: "",
                operator: operator,
                equalPressed: false,
            })
            return
        }
        if (calculationState.operand1 !== "" && calculationState.operand2 !== "") {
            const result = calculateResult(
                Number(calculationState.operand1),
                calculationState.operand2 === "" ? Number(calculationState.operand1) : Number(calculationState.operand2),
                calculationState.operator,
            )
            setCalculationState({
                operand1: result,
                operand2: "",
                operator: operator
            })
            setDisplayValue(result)
            return;
        
        }
        setCalculationState({
            ...calculationState,
            operator: operator
        })

    }

    function handleEqual() {

        const result = calculateResult(
            Number(calculationState.operand1),
            calculationState.operand2 === "" ? Number(calculationState.operand1) : Number(calculationState.operand2),
            calculationState.operator,
        )
        setCalculationState({
            ...calculationState,
            operand1: result,
            operand2: "",
            equalPressed: true,
        })
        setDisplayValue(result)
    }

    function handlePoint() {
        if (!calculationState.operator && calculationState.operand1.search(/\./) !== 1) {
            setCalculationState({
                ...calculationState,
                operand1: calculationState.operand1 + "."
            })
            setDisplayValue(calculationState.operand1 + ".")
            return;
        }
        if (calculationState.operator && calculationState.operand2.search(/\./) !== 1) {
            setCalculationState({
                ...calculationState,
                operand2: calculationState.operand2 + "."
            })
            setDisplayValue(calculationState.operand2 + ".")
            return;
        }
    }

    function handleSign() {
        if (!calculationState.operator || (calculationState.operator && calculationState.equalPressed && calculationState.operand2 === "")) {
            setCalculationState({
                ...calculationState,
                operand1: calculationState.operand1 === "0" ? "-0" : calculationState.operand1 === "-0" ? "0" : calculationState.operand1 * -1
            })
            setDisplayValue(calculationState.operand1 === "0" ? "-0" : calculationState.operand1 === "-0" ? "0" : calculationState.operand1 * -1)
            return
        }
        setCalculationState({
            ...calculationState,
            operand2: calculationState.operand2 === "" ? "-0" : calculationState.operand2 === "-0" ? "0" : calculationState.operand2 * -1
        })
        setDisplayValue(calculationState.operand2 === "" ? "-0" : calculationState.operand2 === "-0" ? "0" : calculationState.operand2 * -1)
    }

    function handlePercent() {

        if (calculationState.operand2 === "") {
            setCalculationState({
                ...calculationState,
                operand1: calculationState.operand1 / 100
            })
            setDisplayValue(calculationState.operand1/100)
            return
        }
        setCalculationState({
            ...calculationState,
            operand2: calculationState.operand2/100
        })
        setDisplayValue(calculationState.operand2/100)
        }



    function calculateResult(num1, num2, operator) {
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

    function handleClear() {
        setCalculationState({
            operand1: "0",
            operand2: "",
            operator: "",
            equalPressed: false
        })
        setDisplayValue("0")
    }
  return (
    handleClear,
    handleNum,
    handleEqual,
    handleOperator,
    handlePercent,
    handlePoint,
    handleSign,
    displayValue
  )
}

export default CalculatorHelpers