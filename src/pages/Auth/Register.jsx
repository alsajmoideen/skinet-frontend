import { useState } from 'react'
import './form.css'
import './Register.css'

import axios from 'axios'
import { BASE_URL } from '../env/env'

function Register() {
    const [click, setClick] = useState(false)
    const [message, setMessage] = useState('')
    const [msgColor, setMsgColor] = useState('formMessageRed')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    const onSubmit = async (e) => {
        e.preventDefault();
        if (click == false) {
            setClick(!click)
        }
        try {
            if (password == confirmPassword) {

                await axios.post(`${BASE_URL}/auth/register`, {
                    email,
                    password
                }).then(res => {
                    if (!res.data.valid) {
                        let msg = "Invalid Email"
                        console.log(msg)
                        setMessage(msg)
                        setMsgColor('formMessageRed')
                        setClick(false)
                    } if (res.data.userExist) {
                        setMsgColor('formMessageRed')
                        setMessage(res.data.message)
                        setClick(false)
                    } else {
                        setMsgColor('formMessageGreen')
                        setMessage(res.data.message)
                        setClick(false)
                    }
                })
            } else {
                let msg = "Password mismatch"
                setMessage(msg)
                setClick(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div className='containerLogin'>
                <div className="desktopPart1Register">
                    <div className="intoLogin">
                        <p className="lgLogin creamLogin">You</p>
                        <p className="mdLogin">Make The</p>
                        <p className="mdLogin creamLogin">Best Choice...</p>
                    </div>
                </div>
                <div className="desktopPart1Register">
                    <p className="registerAlign">Register Here</p>
                    <div className="messageDisplayOnForm">
                        <p className={msgColor} >{message}</p>
                    </div>
                    <div className="formSec">
                        <form  >
                            <input type="text" className='authInputBar yellowBg' placeholder='User@gmail.com'
                                onChange={(e) => setEmail(e.target.value)} value={email} />
                            <input type="password" className="authInputBar yellowBg" placeholder='Password'
                                onChange={(e) => setPassword(e.target.value)} value={password} />
                            <input type="password" className="authInputBar yellowBg" placeholder='Confirm Password'
                                onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />

                            <button type="submit" className='formSubmitBtn creamBgLogin' onClick={onSubmit} >
                                {click == false ? 'Register' :
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
        </div>
    )
}

export default Register
