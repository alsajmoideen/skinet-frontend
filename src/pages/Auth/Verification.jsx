import './Verification.css'
import './form.css'
import { FaEnvelope } from 'react-icons/fa';
import { GoVerified } from 'react-icons/go'
import { Link } from 'react-router-dom';

function Verification() {

    return (
        <div className='containerVerify'>
            <div className='verifyDesktopPart1'>
                <div className="verifyLogoDiv">
                    <FaEnvelope className='emailVerify' />
                </div>

                <div className="verifyInfo">
                    <p className="lgVerify">Your Email </p>
                    <p className="mdVerify">is Verified</p>
                </div>

                <p className='smVerify creamVerify formGmailLen'>
                    user@gmail.com
                </p>
            </div>
            <div className='verifyDesktopPart2'>
                <div className="verifyTickMark">
                    <GoVerified />
                </div>

                <div className="formSec">
                    <Link to='/login'>
                        <button className='formSubmitBtn creamBgVerify'>Login</button>
                    </Link>
                </div>
            </div>
        </div>

    )
}

export default Verification
