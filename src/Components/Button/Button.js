import { useEffect, useState } from "react"
import './Button.css'

/**
 * Component for the calculate Button
 * @param {String} text 
 * @param {String} type 
 * @param {Function} click 
 * @returns {JSX}
 */
const Button = ({ text, type, click }) => {
  // style du bouton en fonction du type
  const styled = {
    backgroundColor: type === "primary" ? "#F0A500" : "#334756",
    color: type === "primary" ? "#fff" : "#fff",
  }

  /**
   * Event handler for the click event
   * @param {*} event 
   */
  const handleClick = (event) => {
    click(event)
  }

  // JSX
  return (
    <input type="submit" className='btn' style={styled} onClick={handleClick} value={text} />
  )
}

export default Button