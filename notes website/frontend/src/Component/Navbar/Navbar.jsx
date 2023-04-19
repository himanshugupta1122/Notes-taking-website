import React from 'react'
import "./Navbar.css"
import Cookies from 'js-cookie'
import { AiOutlineLogout } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux";


export default function Navbar() {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state)
    
    const logOut = () => {
        Cookies.remove("token")
        dispatch({
            type: "LOGOUT"
        })
        window.location.replace("/")
    }

    return (
        <>
            <nav className="navMenu cursor-pointer my-8">
                {user && <a class="dcc" href="/">MY Tasks</a>}
                {user ? <span class="dc" className='' onClick={logOut} >Logout <AiOutlineLogout className='inline m-auto text-sm' /></span> : <><a class="dc" href="/login">Login</a><a class="dc" href="/signup">signup</a></>}
            </nav>
        </>
    )
}
