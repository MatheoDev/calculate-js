import { useState } from 'react'
import Calculate from '../../Components/Calculate/Calculate'
import './Home.css'

const Home = () => {
  const [calcul, setCalcul] = useState([])
  const [result, setResult] = useState('')
  const [history, setHistory] = useState([])

  const handleClick = (e) => {
    // soit on clique sur un chiffre
    // soit on clique sur C
    // soit on clique sur =
    // soit on clique sur un opérateur
    if (/\d/.test(e.target.value)) {
      setCalcul([...calcul, e.target.value])
      // si on le dernier caractère est un chiffre => on concatène
      // sinon on remplace le dernier chiffre/nombre par le nouveau
      if (/\d/.test(calcul.pop())) {
        setResult(result + e.target.value)
      } else {
        setResult(e.target.value)
      }
    } else if (e.target.value === 'C') {
      // reset
      setCalcul([])
      setResult('')
    } else if (e.target.value === '=' && calcul.length > 0) {
      // calcule
      setCalcul([eval(calcul.join(''))])
      setResult(eval(calcul.join('')))
      setHistory([...history, calcul.join('') + ' = ' + eval(calcul.join(''))])
    } else if (e.target.value && calcul.length > 0) {
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
      setCalcul([eval(calcul.join('')), e.target.value])
    }
  }

  return (
    <>
      <div className="calculate">
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