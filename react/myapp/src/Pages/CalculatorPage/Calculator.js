import { useState } from 'react'
import CodeLink from '../../components/CodeLink'
import CalculatorButton from './CalculatorButton'
import { inputNum, calculateResult, checkPoint, setSign, standardDisplay } from './calculatorHelpers'

const CalculatorPage = () => {
    
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
            const result = inputNum(num, calculationState.operand1)
            setCalculationState({
                ...calculationState,
                operand1: result})
            setDisplayValue(result)
            return;
        } 
        const result = inputNum(num, calculationState.operand2)
        setCalculationState({
            ...calculationState,
            operand2: result,
        })
        setDisplayValue(result)
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
                Number(calculationState.operand2),
                calculationState.operator,
            )
            setCalculationState({
                operand1: result,
                operand2: "",
                operator: operator
            })
            handleDisplay(result)
            return;    
            }   
        
        setCalculationState({
            ...calculationState,
            operator: operator
        })

    }

    function handleEqual() {
        if (!calculationState.operator) {
            setCalculationState({
                ...calculationState,
                operand1: "0",
            })
            return;
        }
        const result = calculateResult(
            Number(calculationState.operand1),
            Number(calculationState.operand2),
            calculationState.operator,
        )
        setCalculationState({
            ...calculationState,
            operand1: result,
            operand2: "",
            equalPressed: true,
        })
        handleDisplay(result)
    }

    function handlePoint() {
        const result = checkPoint(calculationState.operand1, calculationState.operand2, calculationState.operator)
        if (!calculationState.operator) {
            setCalculationState({
                ...calculationState,
                operand1: result
            })
        } else {
            setCalculationState({
                ...calculationState,
                operand2: result
            })
        }
        handleDisplay(result);
    }

    function handleSign() {
        if (!calculationState.operator || (calculationState.operator && calculationState.equalPressed && calculationState.operand2 === "")) {
            const result = setSign(calculationState.operand1)
            setCalculationState({
                ...calculationState,
                operand1: result
            })
            setDisplayValue(result)
            return
        }
        const result = setSign(calculationState.operand2)
        setCalculationState({
            ...calculationState,
            operand2: result
        })
        setDisplayValue(result)
    }

    function handlePercent() {
        if (calculationState.operand2 === "") {
            const result1 = calculationState.operand1 / 100
            setCalculationState({...calculationState, operand1: result1})
            handleDisplay(result1)
            return
        }
        const result2 = calculationState.operand2/100
        setCalculationState({...calculationState, operand2: result2})
        handleDisplay(result2)
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

    function handleDisplay(num) {
        setDisplayValue(standardDisplay(num))
    }

    const gridClasses = "grid grid-cols-4 gap-2 py-1 text-[30px] sm:text-[40px] text-bold text-center"

  return (
    <>
        <div className='flex flex-col h-full text-center items-center'>
            <div className='mt-16 mb-3 text-3xl'>Calculator</div>
            <div className="bg-black rounded-3xl p-6 sm:p-10 max-w-[350px] sm:max-w-[450px]">
                <div>
                    <div><input type="text" className="bg-black text-white border-0 w-full text-[40px] sm:text-[50px] text-right pr-4 mb-4 rounded-lg" disabled={true} value={displayValue}/></div>
                </div>
                <div className='grid grid-rows-5'>  
                    <div className={gridClasses}>
                        <CalculatorButton special onClick={handleClear}>AC</CalculatorButton>
                        <CalculatorButton special onClick={handleSign}>±</CalculatorButton>
                        <CalculatorButton special onClick={handlePercent}>%</CalculatorButton>
                        <CalculatorButton operator onClick={(e) => handleOperator(e)}>÷</CalculatorButton>
                    </div>
                    <div className={gridClasses}>
                        <CalculatorButton number onClick={(e) => handleNum(e)}>7</CalculatorButton>
                        <CalculatorButton number onClick={(e) => handleNum(e)}>8</CalculatorButton>
                        <CalculatorButton number onClick={(e) => handleNum(e)}>9</CalculatorButton>
                        <CalculatorButton operator onClick={(e) => handleOperator(e)} value="*">×</CalculatorButton>
                    </div>
                    <div className={gridClasses}>
                        <CalculatorButton number onClick={(e) => handleNum(e)}>4</CalculatorButton>
                        <CalculatorButton number onClick={(e) => handleNum(e)}>5</CalculatorButton>
                        <CalculatorButton number onClick={(e) => handleNum(e)}>6</CalculatorButton>
                        <CalculatorButton operator onClick={(e) => handleOperator(e)}>-</CalculatorButton>
                    </div>
                    <div className={gridClasses}>
                        <CalculatorButton number onClick={(e) => handleNum(e)}>1</CalculatorButton>
                        <CalculatorButton number onClick={(e) => handleNum(e)}>2</CalculatorButton>
                        <CalculatorButton number onClick={(e) => handleNum(e)}>3</CalculatorButton>
                        <CalculatorButton operator onClick={(e) => handleOperator(e)}>+</CalculatorButton>
                    </div>
                    <div className={gridClasses}>
                        <CalculatorButton zero number onClick={(e) => handleNum(e)}>0</CalculatorButton>
                        <CalculatorButton number onClick={handlePoint}>.</CalculatorButton>
                        <CalculatorButton operator onClick={handleEqual}>=</CalculatorButton>
                    </div>
                </div>
            </div>
    <CodeLink />
    </div>
    </>
  )
}

export default CalculatorPage