import { useState } from 'react'
import Calculate from '../../Components/Calculate/Calculate'
import './Home.css'

/**
 * Component for the home page
 * @returns {JSX}
 */
const Home = () => {
  const [calcul, setCalcul] = useState([])
  const [result, setResult] = useState('')
  const [history, setHistory] = useState([])
  const [isChain, setIsChain] = useState(false)

  /**
   * logics for the concatenation of the result
   * @param {String} number 
   * @returns 
   */
  const calculatorNumber = (number) => {
    if (result && result.includes('.') && number === '.') {
      return
    }
    if ((calcul.length && isChain)) {
      setResult(number)
      setIsChain(false)
    } else if (result === 'Infinity'
      || result === 'NaN' || result === '-Infinity'
      || result === '-NaN' || result === '0') {
      setCalcul([])
      setResult(number)
      setIsChain(false)
    } else { setResult(result.concat(number)) }
  }

  /**
   * logics for the operation of the result
   * @param {String} operator 
   */
  const calculatorOperator = (operator) => {
    switch (operator) {
      case '+/-':
        setResult(`${result * -1}`)
        break
      case '%':
        setResult(`${result / 100}`)
        break
      case 'C':
        setResult('')
        setCalcul([])
        break
      case '=':
        const resultCalcul = eval(calcul.join('').concat(result)).toString()
        setResult(resultCalcul)
        setCalcul([])
        setHistory([...history, calcul.join('').concat(result).concat('=').concat(resultCalcul)])
        break
      default:
        if (result === '.' || result === '') { return }
        const resultCalculChaine = calcul.length ? eval(calcul.join('').concat(result)).toString() : ''
        calcul.length ? setCalcul([eval(calcul.join('').concat(result)).toString(), operator]) : setCalcul([result, operator])
        setResult(eval(calcul.join('').concat(result)).toString())
        calcul.length && setHistory([...history, calcul.join('').concat(result).concat('=').concat(resultCalculChaine)])
        setIsChain(true)
        break
    }
  }

  /**
   * logique de la calculatrice
   * @param {*} value 
   * @returns 
   */
  const calculator = (value) => {
    if (!/\d/.test(value) && !/[.+=\-/*C%]/.test(value)) {
      return
    }
    if (/[\d.]/.test(value)) {
      calculatorNumber(value)
    } else {
      calculatorOperator(value)
    }
  }

  /**
   * evenement impression clavier
   * @param {*} event
   */
  const hanndleKeyPress = (event) => {
    let value = event.key.toUpperCase()
    if (value === 'ENTER') { value = '=' }
    else if (value === 'N') { value = '+/-' }
    calculator(value)
  }

  /**
   * evneemnt click sur les boutons
   * @param {*} event
   */
  const handleClick = (event) => {
    calculator(event.target.value)
  }

  // JSX 
  return (
    <>
      <div className="calculate" onKeyDown={hanndleKeyPress}>
        <Calculate handleClick={handleClick} result={result} />
        <div className='calculate__history'>
          <div className="calculate__history--container">
            {history.map((hist, index) => (
              <div key={index} className="calculate__history--item">{hist}</div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home