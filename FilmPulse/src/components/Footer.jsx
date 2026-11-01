import React from 'react'

function Footer() {
    return (
        <div className='footer h-auto md:h-90 fixed w-full bottom-0 left-0 -z-10 cursor-pointer'>

            <div className='h-auto md:h-70 w-full bg-linear-50 from-[#000000] via-[#101010] to-[#040404] px-5 md:px-15 py-8 md:py-10 flex flex-col md:flex-row gap-10 md:gap-0 justify-between border-t-2 border-white/30'>
                
                <h1 className='text-white/70 text-[18px] font0 font-semibold tracking-wider hover:text-cyan text-center md:text-left'>
                    FILMPULSE
                </h1>

                <ul className='text-white/50 text-[15px] font3 font-light flex flex-col gap-2 text-center md:text-left'>
                    <li>Home</li>
                    <li>About</li>
                    <li>Subscription</li>
                    <li>Techniques</li>
                    <li className='mt-5 md:mt-10'>hello@filmpulse.com</li>
                </ul>

                <ul className='text-white/50 text-[15px] font3 tracking-wider flex flex-col gap-2 text-center md:text-left'>
                    <li>Instagram</li>
                    <li>Github</li>
                    <li>X.com</li>
                </ul>

            </div>

            <div className='h-auto md:h-20 w-full bg-black px-5 md:px-15 py-4 md:py-0 flex items-center justify-center border-t-2 border-white/30 text-white/60 text-center'>
                <h1 className='font3 text-white/30 tracking-wide text-[13px] md:text-[14px]'>
                    ©2025.Copyrights owned by FilmPulse
                </h1>
            </div>

        </div>
    )
}

export default Footer