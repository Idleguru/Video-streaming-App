import React, { useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import { login, signup } from '../../firebase'
import netflix_spinner from '../../assets/netflix_spinner.gif'

const Login = () => {
  const [SignState, setSignState] = useState("Sign In")
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [Loading, setLoading] = useState(false)

  const user_auth = async (event) => {
    event.preventDefault();
    setLoading(true)
    if (SignState === "Sign In") {
      await login(email, password)
    } else {
      await signup(name, email, password)
    }
    setLoading(false)
  }

  return (
    Loading ? <div className="login-spinner"><img src={netflix_spinner} alt="" /></div> :
      <div className='login' >
        <img src={logo} alt="" className="login-logo" />
        <div className="login-form">
          <h1>{SignState}</h1>
          <form>
            {SignState === "Sign Up" ?
              <input type="text" value={name} onChange={(e) => { setname(e.target.value) }} placeholder='Your Name' /> : <></>}
            <input type="email" value={email} onChange={(e) => { setemail(e.target.value) }} placeholder='Email' />
            <input type="password" value={password} onChange={(e) => { setpassword(e.target.value) }} placeholder='Password' />
            <button onClick={user_auth} type='submit'>{SignState}</button>
            <div className="form-help">
              <div className="remember">
                <input type="checkbox" />
                <label htmlFor="">Remember Me</label>
              </div>
              <p>Need Help?</p>
            </div>
          </form>
          <div className="form-switch">
            {SignState === "Sign In" ? <><p>New to Netflix?
              <span onClick={() => setSignState("Sign Up")}>Sign Up Now</span>
            </p></> : <> <p>Already Have an Account?
              <span onClick={() => setSignState("Sign In")}>Sign In Now</span>
            </p></>}



          </div>
        </div>

      </div>
  )
}

export default Login