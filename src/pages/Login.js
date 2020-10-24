import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Login = ({ auth, showLoginError }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()
  const handleSubmit = (ev) => {
    ev.preventDefault()
    auth({ username, password }).then(() => {
      // if auth success we redirect users to home
      history.push('/')
    })
  }
  return (
    <form onSubmit={handleSubmit}>
      {showLoginError && <h3> Invalid credentials dude🚫</h3>}
      <input
        value={username}
        placeholder="username"
        onChange={({ target: { value } }) => setUsername(value)}
      />
      <input
        value={password}
        placeholder="secure password"
        onChange={({ target: { value } }) => setPassword(value)}
      />
      <button>send</button>
    </form>
  )
}

export default Login
