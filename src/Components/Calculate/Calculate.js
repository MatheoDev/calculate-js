import json from '../../Data/calculate.json'
import Button from '../Button/Button'
import './Calculate.css'

/**
 * Component for the Calculate
 * @param {String} result
 * @param {Function} handleClick
 * @returns {JSX}
 */
const Calculate = ({result, handleClick}) => {
  return (
    <div className="calculate__display">
      <input type="text" className="calculate__display--input" value={result} readOnly/>
      <div className='calculate__display--container'>
        {json.calculate.map((char, index) => (
          <Button key={index} text={char.value} type={char.type} click={handleClick} size={char.size} />
        ))}
      </div>
    </div>
  )
}

export default Calculate