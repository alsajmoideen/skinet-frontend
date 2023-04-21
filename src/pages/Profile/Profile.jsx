import { useState } from 'react'
import './Profile.css'
import { FaEdit } from 'react-icons/fa';
import Popup from 'reactjs-popup';
import icons from './IconExp'
import axios from 'axios'

import { BASE_URL } from '../env/env'
import { useGetUserID } from '../Hooks/useGetUserID'
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [click, setClick] = useState(false)
  const [icon, setIcon] = useState('')
  const [name, setName] = useState('')
  const [domain, setDomain] = useState('')
  const [bio, setBio] = useState('')
  const [link, setLink] = useState('')

  const [msgErrorName, setMsgErrorName] = useState('')

  let navigate = useNavigate()
  const userID = useGetUserID()

  const onSubmit = async (e) => {
    e.preventDefault();
    if (click == false) {
      setClick(true)
    }

    if (name == '') {
      setMsgErrorName('Name is Required...!')
      setClick(false)
    } else {
      try {
        await axios.put(`${BASE_URL}/auth/profile/${userID}`, {
          icon,
          name,
          domain,
          bio,
          link
        }).then(res => {
          if (res.data.status) {
            navigate("/")
          }
        })
      } catch (error) {
        console.log(error)
      }
    }


  }
  return (
    <div className='containerProfile'>
      <div className="profilePicSec">
        <p className='profileWelcome'>Create <span className='profileYouHg'>Your</span> Profile....</p>
        <div className="profilePic">
          {icon == '' ?
            <div className='innerProfileIcon'>
              <FaEdit className='editProfile' />
            </div> :
            <div>
              <img src={icon} className='changedIcon' alt="" />
            </div>}

          <Popup
            trigger={
              <div className='iconTrigger'></div>
            }
            modal
            nested
          >
            {close => (
              <div className="modalProfile">
                <button className="close" onClick={close}>
                  &times;
                </button>
                <div className="header"> Choose Profile Icon </div>
                <div className="content">
                  <img className='iconMargin' src={icons.icon1} alt=""
                    onClick={() => {
                      setIcon(icons.icon1)
                      close()
                    }} />
                  <img className='iconMargin' src={icons.icon2} alt=""
                    onClick={() => {
                      setIcon(icons.icon2)
                      close()
                    }} />
                  <img className='iconMargin' src={icons.icon3} alt=""
                    onClick={() => {
                      setIcon(icons.icon3)
                      close()
                    }} />
                  <img className='iconMargin' src={icons.icon4} alt=""
                    onClick={() => {
                      setIcon(icons.icon4)
                      close()
                    }} />
                </div>
              </div>
            )}
          </Popup>

        </div>
        <p className="picInfo">Add Icon</p>
      </div>

      <div className="messageDisplayProfile">
        <p className="profileNameError">{msgErrorName}</p>
      </div>

      <div className="formSec">
        <form >
          <input type="text" className='userProfileInput ' placeholder='Name'
            onChange={(e) => setName(e.target.value)} />
          <input type="text" className="userProfileInput " placeholder='Domain'
            onChange={(e) => setDomain(e.target.value)} />
          <textarea name="" className='userProfileTextarea' rows="3" maxLength={350} placeholder='Bio...'
            onChange={(e) => setBio(e.target.value)}></textarea>
          <p className="textAreaLimitMsg">Max of 350 characters </p>
          <input type="text" className='userProfileInput ' placeholder='Portfolio Link'
            onChange={(e) => setLink(e.target.value)} />
          <button className='formSubmitBtn creamBgLogin' onClick={onSubmit} >
            {click == false ? 'Create' :
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
  )
}

export default Profile
