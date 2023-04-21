import { useState } from 'react'
import './Post.css'
import '../Auth/form.css'

import axios from 'axios'
import { BASE_URL } from '../env/env'
import { useGetUserID } from '../Hooks/useGetUserID'

function Post() {
  const [click, setClick] = useState(false)
  const [message, setMessage] = useState('')
  const [postMessage, setPostMessage] = useState('')

  const userID = useGetUserID()

  const [post, setPost] = useState({
    title: "",
    domain: "",
    discription: "",
    payment: 0,
  })

  const onSubmit = async (e) => {
    e.preventDefault();
    if (click == false) {
      setClick(!click)
    }
    if (isEmpty(post)) {
      setMessage('Fill all Inputs')
      setClick(false)
    }else{
      setMessage('')
      try {
        console.log(post)
        await axios.post(`${BASE_URL}/post/project/${userID}`,post).then(res=>{
          let data = res.data
          if(data.status){
            setPostMessage('Post created')
            setClick(false)
          }
        })
        .catch(error=>console.log(error))
      } catch (error) {
        console.log(error)
      }
    }

  }

  const isEmpty = (obj) => {
    let isPostEmpty = false
    for (let key in obj) {
      if (post[key] === '' || post[key] === 0) {
        isPostEmpty = true
      }
    }
    return isPostEmpty
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setPost({ ...post, [name]: value })
  }
  // console.log(post)
  return (
    <div>
      <div className="containerPost">
        <div className="headingPost">
          <p className="lgPost y_d_Color lgFontFamPost">Post Your Project</p>
        </div>
        <div className="postFormSec">
          <input type="text" name='title' className='postInputBar' placeholder='Title'
            onChange={handleChange} />

          <input type="text" name='domain' className='postInputBar' placeholder='Domain'
            onChange={handleChange} />

          <textarea name="discription" id="" rows="4" className='postTextarea' placeholder='Discription..'
            onChange={handleChange} />

          <input type="text" name='payment' className='postInputBar' placeholder='$ Price/hour'
            onChange={handleChange} />

          <div className="messageDiv">
            <p className="messagePost">{message} </p>
            <p className="messagePostGreen">{postMessage} </p>
          </div>

          <button className='postSubmitBtn y_d_BgColor' onClick={onSubmit}>
            {click == false ? 'Post' :
              <div className="dotJump">
                <div className="loadingDot"></div>
                <div className="loadingDot"></div>
                <div className="loadingDot"></div>
              </div>
            }
          </button>
        </div>
      </div>
    </div>
  )
}

export default Post