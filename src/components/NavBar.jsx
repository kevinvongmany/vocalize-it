import React from 'react'

const NavBar = () => {
    return (
        <nav className="navbar">
            <ul>
                <li><a href="tts.html">Try it out!</a></li>
                <li><button id="switchThemeBtn" className="outline contrast">Switch Theme</button></li>
            </ul>
        </nav>
    )
}

export default NavBar
