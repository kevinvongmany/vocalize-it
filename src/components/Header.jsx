import React from 'react'

const Header = () => {
    return (
        <div>
            <header>
                <nav class="navbar">
                    <ul>
                        <li><strong>Group 04: Codey the AI</strong></li>
                    </ul>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="about.html">About</a></li>
                        <li><a href="faq.html">FAQ</a></li>
                        <li><a href="tts.html">Try it out!</a></li>
                        <li><button id="switchThemeBtn" class="outline contrast">Switch Theme</button></li>
                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default Header

