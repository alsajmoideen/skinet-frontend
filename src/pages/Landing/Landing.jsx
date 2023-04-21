import {useEffect, useRef, useState } from 'react'
import './Landing.css'
import { FaAngleDoubleDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Landing = () => {
    const serviceBar = useRef(null)
    const [hight,setHight] = useState(false)

    const handleHight = () =>{
        if(window.scrollY >= 600){
            setHight(true);
        }
        else{
            setHight(false);
        }
     };
     const handleClick = () => {
        serviceBar.current?.scrollIntoView({behavior: 'smooth'});
      };

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    
   

    window.addEventListener('scroll', handleHight);
    return (
        <div className='containerLanding'>
            <div  className="bannerLanding">
                <div className={hight?"banner_topLanding bannerTopScrollLanding":"banner_topLanding "}>
                    <h2 className='logoLanding' onClick={goToTop}>skinet</h2>
                    <Link to='/login'>
                    <button className='LoginBtnLanding'>Login</button>
                    </Link>  
                </div>
                <div className="banner_bottomLanding">
                    <p className='lg_2Landing'>Looking</p>
                    <p className='lg_3Landing'>for</p>
                    <p className='lg_2Landing'>Talent..?</p>
                    <p className='lg_1Landing'>Look No</p>
                    <p className='lg_1Landing'> Further</p>
                    <p  className='lg_3Landing'>You are in Right place</p>
                    
                    <FaAngleDoubleDown  className='downIconLanding' onClick={handleClick}/>
                    <div ref={serviceBar}></div>
                </div>

            </div>

            <div  className="servicesLanding">
                <p  className='lg_3Landing'>Our </p>
                <p className='lg_1_1Landing'>Features</p>
                <div className="pointRLanding">
                    <p className='pInfoLanding'>Find the best freelancers for your project</p>
                </div>
                <div className="pointLLanding">
                    <p className='pInfoLanding'>Discover top talent by sifting through pool of applied candidates</p>
                </div>
                <div className="pointRLanding">
                    <p className='pInfoLanding'> Experience the flexibility of being a job seeker and provider simultaneously</p>
                </div>
                <div className="pointLLanding">
                    <p className='pInfoLanding'>Transform your passion into a successful independent career</p>
                </div>
            </div>

            <div className="visionLanding">
                <p className='lg_3Landing'>Future</p>
                <p className='lg_1_2Landing'>Vision</p>
                <p className='vInfoLanding'>"Our vision is to create an ecosystem where job providers and seekers coexist in harmony.
                    Our platform ensures that job seekers are paid for their work,
                    while job providers only pay for the services they need.
                    Skinet brings together developers and designers with diverse talents and experience to provide a seamless hiring experience.
                    Join us and take the first step towards building your dream team or career."
                </p>
            </div>

            <div className="footerLanding">
                <p className="pLg_1Landing">skinet</p>
                <p className="pLg_4Landing">Were We All Gather</p>
                <p className="pLg_2Landing">Contact Us</p>
                <p className="pLg_3Landing">skinet@gmail.com</p>
                <p className="pLgFoLanding">copyright &#169; 2023 All Rights Reserved | Developed by Alsaj Moideen</p>
            </div>
        </div>
    )
}

export default Landing
