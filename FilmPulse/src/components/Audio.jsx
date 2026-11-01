import React, { useRef, useState } from 'react'
import { FaHeadphonesAlt } from "react-icons/fa";


function Audio() {
    const audioRef = useRef(null)
    const [playAudio, setPlayAudio] = useState(false)
    const handleAudio = () => {
        const audiobtn = document.getElementById('audio-btn')

        if (playAudio) {
            audioRef.current.pause()
            audiobtn.style.backgroundColor = '#00ffff19'
            audiobtn.style.borderColor = 'cyan'
            audiobtn.style.color = 'cyan'
            audiobtn.style.transition = 'all 0.2s'
            audiobtn.style.backdropFilter = 'blur(50px)'
        }

        else {
            audioRef.current.play()
            audiobtn.style.backgroundColor = 'cyan'
            audiobtn.style.borderColor = 'cyan'
            audiobtn.style.color = 'black'
            audiobtn.style.transition = 'all 0.2s'
        }
        setPlayAudio(!playAudio)
    }

    return (
        <div>
            <button id='audio-btn' onClick={handleAudio} className='border-2 border-[cyan] hover:bg-[cyan] hover:text-[#000000] bg-[cyan]/10 rounded-full h-15 w-15 p-4 flex items-center justify-center text-[cyan] cursor-pointer transition-all duration-180'><FaHeadphonesAlt id='audio-icon' size={24} /></button>
            <audio ref={audioRef} loop>
                <source src='/public/audio/The_Weeknd_-_Blinding_Lights.mp3' type='audio/mpeg' />
            </audio>
        </div>
    )
}

export default Audio
