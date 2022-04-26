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

  /**
   * Logique de la calculatrice
   * @param {*} value 
   * @returns 
   */
  const calculator = (value) => {
    if (!/\d/.test(value) && !/[\.+=\-/*C%]/.test(value)) {
      return
    } else if (/[\d\.]/.test(value)) {
      setCalcul([calcul.join('').concat(value)])
      if (/[\d\.]/.test(calcul.splice(-1, 1))) {
        setResult(result.concat(value))
      } else {
        setResult(value)
      }
      return
    }

    if (calcul.length === 0) { return }

    switch (value) {
      case '%':
        const splited = calcul.join('').split(/[\+\-*/]/)
        if (splited.length === 1) {
          setCalcul([calcul.join('') / 100])
          setResult(calcul.join('') / 100)
        } else {
          const replaced = calcul.join('').replace(splited[0], '')
          const pourcent = replaced.replace(splited[1], splited[1] / 100)
          setCalcul([splited[0].concat(pourcent)])
          setResult(splited[1] / 100)
        }
        break;
      case 'C':
        setCalcul([])
        setResult('')
        break;
      case '=':
        console.log(calcul.join(''))
        setCalcul([eval(calcul.join(''))])
        setResult(eval(calcul.join('')))
        break;
      case '+/-':
        const splitedC = calcul.join('').split(/[\+\-*/]/)
        if (splitedC.length === 1) { 
          setCalcul([calcul.join('') * -1])
          setResult(calcul.join('') * -1)
        } else if (splitedC.length === 2 && splitedC[0] === '') { 
          setCalcul([calcul.join('') * -1])
          setResult(calcul.join('') * -1)
        } else if (splitedC.length === 2 && !splitedC[1] === '') {
          // const pourcent = replaced.replace(splited[1], splited[1] / 100) A REVOIR
          // setCalcul([splitedC[0].concat(splitedC[1] * -1)])
          // setResult(splitedC[1] * -1)
        } else {
          // const replaced = calcul.join('').replace(splitedC[0], '')
          // const pourcent = replaced.replace(splitedC[1], splitedC[1] * -1) A REVOIR
          // setCalcul([splitedC[0].concat(pourcent)])
          // setResult(splitedC[1] * -1)
        }
        break;
      default:
        setCalcul([...calcul, value])
        setResult(eval(calcul.join('')))
        setHistory([...history, calcul.join('').concat(' = ').concat(result)])
        break;
    }
  }

  /**
   * evenement impression clavier
   * @param {*} event
   */
  const hanndleKeyPress = (event) => {
    calculator(event.key.toUpperCase())
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