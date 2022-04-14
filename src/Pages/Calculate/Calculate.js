import Button from './../../Components/Button/Button'
import './Calculate.css'

const Calculate = () => {
  const test = [
    { value: '1', type: 'secondary' },
    { value: '2', type: 'secondary' },
    { value: '3', type: 'secondary' },
    { value: '4', type: 'secondary' },
    { value: '5', type: 'secondary' },
    { value: '6', type: 'secondary' },
    { value: '7', type: 'secondary' },
    { value: '8', type: 'secondary' },
    { value: '9', type: 'secondary' },
    { value: '0', type: 'secondary' },
    { value: '+', type: 'primary' },
    { value: '-', type: 'primary' },
    { value: '*', type: 'primary' },
    { value: '/', type: 'primary' },
    { value: 'C', type: 'primary' },
    { value: '=', type: 'primary' },
  ]

  return (
    <>
      <div className="calculate">
        <div className="calculate__display">
          <input type="text" className="calculate__display--input"/>
          <div className='calculate__display--container'>
            {test.map((item, index) => (
              <Button key={index} text={item.value} type={item.type} />
            ))}
          </div>
        </div>
        <div className='calculate__history'>

        </div>
      </div>
    </>
  )
}

export default Calculate