import PropTypes from "prop-types"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { loginUser } from "../reducers/userReducer"
const LoginForm = () => {

  const dispatch = useDispatch()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(loginUser({ username, password }))
    setUsername("")
    setPassword("")
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          name:{" "}
          <input
            data-testid="name"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          password:{" "}
          <input
            data-testid="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Log in</button>
      </form>
    </div>
  )
}



export default LoginForm
