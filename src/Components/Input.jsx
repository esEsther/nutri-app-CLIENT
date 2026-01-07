// import "./css/input.css"
export const Input = ({ type, name, placeholder }) => {
  return (
    <input
      className="input"
      type={type}
      name={name}
      placeholder={placeholder}
    />
  )
}