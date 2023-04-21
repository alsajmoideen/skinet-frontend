import { useState, useEffect } from 'react'
import axios from 'axios'
import './Work.css'
import { BASE_URL } from '../env/env'
import { useGetUserID } from '../Hooks/useGetUserID'
import PostSketeton from '../Skeleton Loading/PostSkeleton'

function Work() {
  const [workList, setWorkList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const userID = useGetUserID()

  useEffect(() => {

    const fetchWorkList = async () => {
      try {
        await axios.get(`${BASE_URL}/post/worklist/${userID}`).then(res => {
          let data = res.data
          setWorkList(data.workList)
          setIsLoading(false)
        })

      } catch (error) {
        console.log(error)
      }
    }
    fetchWorkList()
  }, [])
  return (
    <div className='containerWork'>
      <div className="mainHeadingWork">
        Your Work
      </div>
      {isLoading ? <PostSketeton /> : null}
      {workList.map((work, idx) => {
        return (
          <div key={idx} className="cardWork">
            <div className="cardHeaderWork">
              <p className="cardHeaderFont">{work.title}</p>
            </div>
            <div className="cardBodyWork">
              <div className="cardDomainInfo">
                <p className="cardBodyFont">Domain</p>
                <p className="cardBodyContentDFont">{work.domain}</p>
              </div>
              <div className="cardPaymentInfo">
                <p className="cardBodyFont">Payment/hr</p>
                <p className="cardBodyContentPFont">{work.payment}$</p>
              </div>
            </div>
          </div>
        )
      })}

    </div>
  )
}

export default Work
