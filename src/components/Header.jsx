import React from 'react'
import NavBar from './NavBar'

const Header = () => {
    return (
        // useTailwind classes to mount the header to top of the page
        // and center it    
            
        <header className="header w-full h-24 bg-gray-900 text-white  top-0  z-50 fixed flex items-center justify-between">
            <strong>VocalizeIt</strong>
            <NavBar/>   
        </header>

    )
}

export default Header

