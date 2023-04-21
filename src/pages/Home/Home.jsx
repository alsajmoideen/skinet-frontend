import { useEffect, useState } from 'react'
import axios from 'axios'

import PostSketeton from '../Skeleton Loading/PostSkeleton'
import './Home.css'
import { BASE_URL } from '../env/env'
import { Link } from 'react-router-dom'

function Home() {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        await axios.get(`${BASE_URL}/post`).then(res => {
          setPosts(res.data)
          setIsLoading(false)
        })

      } catch (error) {
        console.log(error)
      }
    }
    fetchPost()
  }, [])
  return (
    <div className='containerHome'>

      {isLoading ? <PostSketeton /> : null}

      {posts.map((post, idx) => {
        return (
          <Link key={idx} className="cardHome" to={`postview/${post._id}`} >
            <div>
              <div className="cardHeaderHome">
                <p className="cardHeaderFont">{post.title}</p>
              </div>
              <div className="cardBodyHome">
                <div className="cardDomainInfo">
                  <p className="cardBodyFont">Domain</p>
                  <p className="cardBodyContentDFont">{post.domain}</p>
                </div>
                <div className="cardPaymentInfo">
                  <p className="cardBodyFont">Payment/hr</p>
                  <p className="cardBodyContentPFont">{post.payment}$</p>
                </div>
              </div>
            </div>
          </Link>
        )
      })}

    </div>
  )
}

export default Home
