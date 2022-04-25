import { useEffect, useState } from "react"
import './Button.css'

const Button = ({ text, type, click }) => {
  const styled = {
    backgroundColor: type === "primary" ? "#F0A500" : "#334756",
    color: type === "primary" ? "#fff" : "#fff",
  }

  const handleClick = (e) => {
    click(e)
  }

  return (
    <input type="submit" className='btn' style={styled} onClick={handleClick} value={text} />
  )
}

export default Button