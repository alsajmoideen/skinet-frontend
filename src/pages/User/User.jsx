import { useEffect, useState } from 'react'
import axios from 'axios'

import { FaEdit } from 'react-icons/fa';
import Popup from 'reactjs-popup';
import icons from '../Profile/IconExp'
import { BASE_URL } from '../env/env'
import './User.css'

import { useGetUserID } from '../Hooks/useGetUserID'
import { useNavigate } from 'react-router-dom';
import UserSkeleton from '../Skeleton Loading/UserSkeleton';
import { useCookies } from 'react-cookie';


function User() {
  const [click, setClick] = useState(false)
  const [icon, setIcon] = useState('')
  const [name, setName] = useState('')
  const [domain, setDomain] = useState('')
  const [bio, setBio] = useState('')
  const [link, setLink] = useState('')

  const [isLoading, setIsLoading] = useState(true)

  const [userEditMsg, setUserEditMsg] = useState('')

  const [_,setCookies] = useCookies()
  let navigate = useNavigate()

  const userID = useGetUserID()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        await axios.get(`${BASE_URL}/auth/user/${userID}`).then(res => {
          let user = res.data
          setName(user.name)
          setDomain(user.domain)
          setIcon(user.icon)
          setBio(user.bio)
          setLink(user.portfolioLink)
          setIsLoading(false)
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchUserData()
  }, [])

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
            navigate("")
            setUserEditMsg('User Details Updated..!')
            setClick(false)
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleLogout = () => {
    setCookies('accessToken', "")
    window.localStorage.removeItem("userID")
    navigate("/login")
  }

  return (
    <div>
      {isLoading ? <UserSkeleton /> : (
        <div className='containerUser'>
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

          <div className="messageDisplayUser">
            <p className="profileNameError">{userEditMsg}</p>
          </div>

          <div className="formSec">
            <form >
              <input type="text" className='userProfileInput ' placeholder='Name'
                value={name} onChange={(e) => setName(e.target.value)} />
              <input type="text" className="userProfileInput " placeholder='Domain'
                value={domain} onChange={(e) => setDomain(e.target.value)} />
              <textarea name="" className='userProfileTextarea' rows="3" maxLength={350} placeholder='Bio...'
                value={bio} onChange={(e) => setBio(e.target.value)}></textarea>
              <p className="textAreaLimitMsg">Max of 350 characters </p>
              <input type="text" className='userProfileInput ' placeholder='Portfolio Link'
                value={link} onChange={(e) => setLink(e.target.value)} />
              <button className='formSubmitBtn yellowShadeBg' onClick={onSubmit} >
                {click == false ? 'Edit' :
                  <div className="dotJump">
                    <div className="loadingDot"></div>
                    <div className="loadingDot"></div>
                    <div className="loadingDot"></div>
                  </div>
                }
              </button>
              <Popup
                trigger={
                  <div className='formSubmitBtn logoutColorUser logoutBtnAlignUser'
                  >Logout</div>
                }
                modal
                nested
              >
                {close => (
                  <div className="modalLogout">
                    <button className="close" onClick={close}>
                      &times;
                    </button>
                    <div className="header"> Are You Sure About This.. </div>
                    <div className="content">
                      <button className='formSubmitBtn logoutColorUser '
                        onClick={handleLogout}>Logout</button>
                      <button className='formSubmitBtn '
                        onClick={close}>Cancel</button>
                    </div>
                  </div>
                )}
              </Popup>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}

export default User
