import { useState } from 'react'
import './Login.css'
import './form.css'
import LoginLogo from '../Images/LoginHomeImg.gif'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../env/env'
import { useCookies } from 'react-cookie'

function Login() {
  const [click, setClick] = useState(false)
  const [message, setMessage] = useState('')
  const [msgColor, setMsgColor] = useState('formMessageRed')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [_, setCookies] = useCookies('accessToken')

  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault();
    if (click == false) {
      setClick(true)
    }

    try {
      await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password
      }).then(res => {
        if (!res.data.valid) {
          console.log(res.data)
          let msg = "Invalid Email"
          setMessage(msg)
          setMsgColor('formMessageRed')
          setClick(false)
        } if (!res.data.validPassword) {
          console.log(res.data)
          setMsgColor('formMessageRed')
          setMessage(res.data.message)
          setClick(false)
        } if (res.data.validPassword) {
          setMessage('')
          console.log(res.data)
          setCookies('accessToken', res.data.token)
          window.localStorage.setItem('userID', res.data.userID)
          { res.data.name === "" ? navigate('/profile') : navigate('/') }

        }
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='containerLogin'>
      <div className="destopPart1Login">
        <div className="imgWrapperLogin">
          <img className='logoImgLogin' src={LoginLogo} alt="" />
        </div>

        <div className="intoLogin">
          <p className="lgLogin creamLogin">Hi</p>
          <p className="mdLogin">Welcome</p>
          <p className="lgMdLogin creamLogin">Home..!</p>
        </div>

        <div className="midLogin">
          <p className="smLogin">if you are new/
            <div className="registerLink">
              <Link className='creamLogin reactLink' to='/register' >
                <span className=' pointerAuth spanFontStyle'>Create Account</span>
              </Link>
            </div>
          </p>
        </div>
      </div>
      <div className="destopPart2Login">
        <div className="messageDisplayOnForm">
          <p className={msgColor} >{message}</p>
        </div>
        <div className="formSec">
          <form  >
            <input type="text" name='email' className='authInputBar yellowBg' placeholder='User@gmail.com'
              onChange={(e) => setEmail(e.target.value)} />
            <input type="password" name='password' className="authInputBar yellowBg" placeholder='Password'
              onChange={(e) => setPassword(e.target.value)} />
            {/* <p className="formText">Forget Password ?<span className='creamLogin pointerAuth spanFontStyle'> Reset</span></p> */}
            <button type="submit" className='formSubmitBtn creamBgLogin' onClick={onSubmit} >
              {click == false ? 'Login' :
                <div className="dotJump">
                  <div className="loadingDot"></div>
                  <div className="loadingDot"></div>
                  <div className="loadingDot"></div>
                </div>
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
