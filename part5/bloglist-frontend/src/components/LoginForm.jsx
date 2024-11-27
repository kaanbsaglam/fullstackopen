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
      
      <div>name: <input value={username} onChange={handleUsernameChange}/></div>
      <div>password: <input type="password" value={password} onChange={handlePasswordChange}/></div>
      <button type="submit">Log in</button>

    </form>
  </div>
  )
}

export default LoginForm