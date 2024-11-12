import React from 'react'
import { FaGithub } from 'react-icons/fa'

const Footer = () => {
    return (
        <div>
            <footer className="flex fixed bottom-0 w-full bg-gray-800 text-white p-4 justify-around">
                <a href='https://github.com/kevinvongmany/vocalize-it' target='_blank'>
                <   FaGithub className="text-2xl text-gray-300 hover:text-white"/>
                </a>
                <p className='text-xs'>© W. Shan, J. Qin, A. Janikova & K. Vongmany </p>
            </footer>
        </div>
    )
}

export default Footer
