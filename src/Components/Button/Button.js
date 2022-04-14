import { useEffect, useState } from "react"
import './Button.css'

const Button = ({ text, type }) => {
  const [style, setStyle] = useState(null)

  useEffect(() => {
    setStyle({
      backgroundColor: type === "primary" ? "#F0A500" : "#334756",
      color: type === "primary" ? "#fff" : "#fff",
      border: "none",
      width: "50px",
      height: "50px",
      borderRadius: "10px",
      cursor: "pointer",
      fontSize: "1.5rem",
      fontWeight: "bold",
      outline: "none",
      boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.7)",
    })
  }, [])

  return (
    <button style={style}>
      <span>{text}</span>
    </button>
  )
}

export default Button