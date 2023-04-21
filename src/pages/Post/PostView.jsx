import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import PostViewSkeleton from '../Skeleton Loading/PostViewSkeleton'

import { useGetUserID } from '../Hooks/useGetUserID'
import { BASE_URL } from '../env/env'
import './PostView.css'

function PostView() {
    const { postID } = useParams()
    const [post, setPost] = useState([])
    const [click, setClick] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [wokList, setWorkList] = useState([])

    const userID = useGetUserID()

    useEffect(() => {
        const fetchPost = async () => {
            try {
                await axios.get(`${BASE_URL}/post/postview/${postID}`).then(res => {
                    let data = res.data
                    setPost(data)
                })

            } catch (error) {
                console.log(error)
            }
        }

        const fetchWorkList = async () => {
            try {
                await axios.get(`${BASE_URL}/auth/user/${userID}`).then(res => {
                    let data = res.data
                    setWorkList(data.workList)
                    setIsLoading(false)
                })

            } catch (error) {
                console.log(error)
            }
        }
        fetchPost()
        fetchWorkList()
    }, [])

    const onSubmit = async (e) => {
        e.preventDefault();
        if (click == false) {
            setClick(true)
        }
        try {
            await axios.put(`${BASE_URL}/post`, {
                userID,
                postID
            }).then(res => {
                console.log(res.data)
                setWorkList(res.data.workList)
                setClick(false)
            })
        } catch (error) {
            console.log(error)
        }
    }
    const inWorkList = (postId) => wokList.includes(postId)
    return (
        <div>
            {isLoading ? <PostViewSkeleton /> : (
                <>
                    <div className='containerPostView'>
                        <div className="titlePostView">
                            <div className="topTitleView">Title</div>
                            <div className="bottomTitleView">{post.title}</div>
                        </div>

                        <div className="titlePostView">
                            <div className="topTitleView">Domain</div>
                            <div className="bottomTitleView">{post.domain}</div>
                        </div>

                        <div className="descriptionPostView">
                            <div className="topDescriptionView">Description</div>
                            <div className="bottomDescriptionView">
                                <p className="descriptionview">{post.discription}</p>
                            </div>
                        </div>

                        <div className="titlePostView">
                            <div className="topTitleView">Posted User</div>
                            <div className="bottomTitleView">{post.postedUser}</div>
                        </div>

                        <div className="titlePostView">
                            <div className="topTitleView">Payment</div>
                            <div className="bottomTitleView">{post.payment}$</div>
                        </div>
                        {inWorkList(post._id) ? (
                            <button className='applyWorkBtn appliedPost' onClick={onSubmit} disabled={inWorkList(post._id)} >
                                {click == false ? "Applied" :
                                    <div className="dotJump">
                                        <div className="loadingDot"></div>
                                        <div className="loadingDot"></div>
                                        <div className="loadingDot"></div>
                                    </div>
                                }
                            </button>) :
                            (<button className='applyWorkBtn creamBgLogin' onClick={onSubmit} >
                                {click == false ? "Apply" :
                                    <div className="dotJump">
                                        <div className="loadingDot"></div>
                                        <div className="loadingDot"></div>
                                        <div className="loadingDot"></div>
                                    </div>
                                }
                            </button>)}

                        {/* <button className='applyWorkBtn creamBgLogin' onClick={onSubmit} >
                            {click == false ? "Apply" :
                                <div className="dotJump">
                                    <div className="loadingDot"></div>
                                    <div className="loadingDot"></div>
                                    <div className="loadingDot"></div>
                                </div>
                            }
                        </button> */}
                    </div>
                </>
            )}

        </div>
    )
}

export default PostView
