import React from 'react'
import { FaClipboardList, FaHome, FaUserAlt } from 'react-icons/fa'
import { BsGraphUpArrow, BsFillChatFill } from 'react-icons/bs'
import './NavBar.css'
import { Link, NavLink, Outlet } from 'react-router-dom'

function NavBar() {
    return (
        <div>
            <div className='containerNavBar'>
                <div className="logoNavBar">skinet</div>
                <div className="iconsNavBar">
                    <NavLink className='iconLinkDiv' to='/'>
                        <div>
                            <FaHome className='iconStyle' />
                            <p className='linkInNav' >Home</p>
                        </div>
                    </NavLink>

                    <NavLink className='iconLinkDiv' to='post'>
                        <div>
                            <FaClipboardList className='iconStyle' />
                            <p className='linkInNav' >Post</p>
                        </div>
                    </NavLink>

                    <NavLink className='iconLinkDiv' to='work'>
                        <div>
                            <BsGraphUpArrow className='iconStyle' />
                            <p className='linkInNav'>Work</p>
                        </div>
                    </NavLink>

                    <NavLink className='iconLinkDiv' to='user'>
                        <div>
                            <FaUserAlt className='iconStyle' />
                            <p className='linkInNav'>User</p>
                        </div>
                    </NavLink>
                </div>
            </div>

            <Outlet />
        </div>
    )
}

export default NavBar
