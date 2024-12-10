import PropTypes from "prop-types"

const LoginForm = (
  {
    loginUser,
    username,
    handleUsernameChange,
    password,
    handlePasswordChange
  }
) => {
  return (
    <div>
      <form onSubmit={loginUser}>

        <div>name: <input value={username} onChange={handleUsernameChange} /></div>
        <div>password: <input type="password" value={password} onChange={handlePasswordChange} /></div>
        <button type="submit">Log in</button>

      </form>
    </div>
  )
}

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  handlePasswordChange: PropTypes.func.isRequired
}

export default LoginForm