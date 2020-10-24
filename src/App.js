import logo from './logo.svg'
import './App.css'
import { useState } from 'react'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
const BASE_URL = 'http://localhost:8080'

const getPrivateData = (token) => {
  return async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/privateInfo`, {
        headers: {
          token,
        },
      })
      console.log(data)
    } catch (err) {
      console.log('Invalid token', err)
    }
  }
}

function App() {
  const [showLoginError, setShowLoginError] = useState(false)
  const [token, setToken] = useState('')

  const auth = async (userData) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/login`, {
        ...userData,
      })
      setToken(data.token)
      showLoginError && setShowLoginError(false)
    } catch (err) {
      console.error(err)
      setShowLoginError(true)
    }
  }
  const logout = () => {
    setToken('')
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Router>
          <Switch>
            <Route path="/login">
              <Login auth={auth} showLoginError={showLoginError} />
            </Route>
            <Route
              path="/"
              render={() =>
                // if no token, we redirect users to /login
                token ? (
                  <Home logout={logout} getData={getPrivateData(token)}>
                    <img src={logo} className="App-logo" alt="logo" />
                  </Home>
                ) : (
                  <Redirect to="/login" />
                )
              }
            ></Route>
          </Switch>
        </Router>
      </header>
    </div>
  )
}

export default App
