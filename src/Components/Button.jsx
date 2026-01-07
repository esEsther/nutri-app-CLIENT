// import "./css/button.css"
export const Button = ({ text, onClick, type = "button" }) => {
  return (
    <button className="button" type={type} onClick={onClick}>
      {text}
    </button>
  )
}
