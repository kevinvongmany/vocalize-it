import React from 'react'
import NavBar from './NavBar'
import { Link } from 'react-router-dom'
import Logo from '../assets/logo.png'

const Header = () => {
    return (
        // useTailwind classes to mount the header to top of the page
        // and center it    
            
        <header className="header w-full h-24 bg-gray-800 text-white z-50 flex items-center justify-between">
            <Link to='/' className="flex items-center text-white pl-12">
                <p className="mr-1 text-white">VocaliseIt</p>
                <img src={Logo} className='h-8 w-8'></img>
            </Link>
            <NavBar/>   
        </header>

    )
}

export default Header

