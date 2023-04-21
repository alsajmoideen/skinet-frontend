import React from 'react'
import './UserSkeleton.css'

function UserSkeleton() {
    return (
        <div className='containerProfileSkeleton'>
            <div className="profilePicSecSkeleton skeletonAnime">
                <p className='profileWelcomeSkeleton'> <span className='profileYouHg'></span></p>
                <div className="profilePicSkeleton">
                    
                </div>
            </div>


            <div className="formSec">
                <form >
                    <input type="text" className='userProfileInputSkeleton '
                         />
                    <input type="text" className="userProfileInputSkeleton "
                       />
                    <textarea name="" className='userProfileTextareaSkeleton' rows="3" maxLength={350}
                      ></textarea>
                    <p className="textAreaLimitMsgSkeleton"></p>
                    <input type="text" className='userProfileInputSkeleton ' 
                       />
                  
                </form>
            </div>
        </div>
    )
}

export default UserSkeleton
