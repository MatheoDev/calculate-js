import { useState } from 'react'
import Calculate from '../../Components/Calculate/Calculate'
import './Home.css'

const Home = () => {
  const [calcul, setCalcul] = useState([])
  const [result, setResult] = useState('')
  const [history, setHistory] = useState([])

  const calculator = (value) => {
    if (!/\d/.test(value) && !/[+=\-/*C]/.test(value)) {
      return
    }
    // soit on clique sur un chiffre
    // soit on clique sur C
    // soit on clique sur =
    // soit on clique sur un opérateur
    if (/\d/.test(value)) {
      setCalcul([...calcul, value])
      // si on le dernier caractère est un chiffre => on concatène
      // sinon on remplace le dernier chiffre/nombre par le nouveau
      if (/\d/.test(calcul.pop())) {
        setResult(result + value)
      } else {
        setResult(value)
      }
    } else if (value === 'C') {
      // reset
      setCalcul([])
      setResult('')
    } else if (value === '=' && calcul.length > 0) {
      // calcule
      setCalcul([eval(calcul.join(''))])
      setResult(eval(calcul.join('')))
      setHistory([...history, calcul.join('') + ' = ' + eval(calcul.join(''))])
    } else if (value && calcul.length > 0) {
      // gestion du changement d'opérateur si click sur un opérateur différent du précédent
      if (/\d/.test(calcul.slice(-1)[0])) {
        setResult(eval(calcul.join('')))
        // si contient un opérateur on affiche l'historique
        if (/[+=\-/*]/.test(calcul.join(''))) {
          setHistory([...history, calcul.join('') + ' = ' + eval(calcul.join(''))])
        }
      } else {
        setCalcul(calcul.splice(-1, 1))
      }
      // gestion de la multiplication/division/addition/soustraction
      // calcul chainé
      // ex : 2 + 2 * 4 = 16 car on enchaine 2 + 2 = 4 => 4 * 4 = 16 
      // le vrai calcul est donc (2 + 2) * 4 = 16
      setCalcul([eval(calcul.join('')), value])
    }
  }

  const hanndleKeyPress = (e) => {
    calculator(e.key)
  }

  const handleClick = (e) => {
    calculator(e.target.value)
  }

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