import { MoveUpRight, X } from 'lucide-react';
import React, { useRef, useState } from 'react'
import { FaHeadphonesAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { RiLogoutCircleRLine } from "react-icons/ri";



function AdminHeader() {
    const [active, setActive] = useState("home");

    return (
        <div className='fixed top-0 w-full z-20'>
            <div className='bg-black/75 backdrop-blur-[100px] w-full h-30 flex items-center justify-center relative border-b-2 border-[#8f8f8f] z-10'>
                <a href="/admin-home" className='h-full flex items-center justify-center'><h1 className='text-[20px] text-[#ccc] font-semibold font3 absolute tracking-widest left-10'>FILM PULSE</h1></a>
                <ul className='text-[#ccc] flex items-center justify-center gap-16 font-semibold bg-[#cccccc3b] backdrop-blur-[100px] rounded-full px-2 py-2'>

                    <Link to={'/admin-home'}>
                        <li onClick={() => setActive('home')}
                            className={`px-5 py-2 rounded-full transition-all duration-150 border-2 border-[cyan]/0 hover:border-[cyan] hover:text-[cyan]
                        ${active === 'home' ? 'bg-[cyan] text-black hover:text-black' : 'bg-[cyan]/0'}`}>
                            Home
                        </li>
                    </Link>

                    <Link to={'/admin-requests'}>
                        <li onClick={() => setActive('request')}
                            className={`px-5 py-2 rounded-full transition-all duration-150 border-2 border-[cyan]/0 hover:border-[cyan] hover:text-[cyan]
                        ${active === 'request' ? 'bg-[cyan] text-black hover:text-black' : 'bg-[cyan]/0'}`}>
                            Requests
                        </li>
                    </Link>

                    <Link to={'/admin-techniques'}>
                        <li onClick={() => setActive('techniques')}
                            className={`px-5 py-2 rounded-full transition-all duration-150 border-2 border-[cyan]/0 hover:border-[cyan] hover:text-[cyan] 
                        ${active === 'techniques' ? 'bg-[cyan] text-black hover:text-black' : 'bg-[cyan]/0'}`}>
                            Techniques
                        </li>
                    </Link>

                    <Link to={'/admin-users'}>
                        <li onClick={() => setActive('users')}
                            className={`px-5 py-2 rounded-full transition-all duration-150 border-2 border-[cyan]/0 hover:border-[cyan] hover:text-[cyan] 
                        ${active === 'users' ? 'bg-[cyan] text-black hover:text-black' : 'bg-[cyan]/0'}`}>
                            Users
                        </li>
                    </Link>

                    {/* <Link to={''}>
                        <li onClick={() => setActive('profile')}
                            className={`px-5 py-2 rounded-full transition-all duration-150 border-2 border-[cyan]/0 hover:border-[cyan] hover:text-[cyan]
                        ${active === 'profile' ? 'bg-[cyan] text-black hover:text-black' : 'bg-[cyan]/0'}`}>
                            Profile
                        </li>
                    </Link> */}

                </ul>


                <Link to={'/'} className='absolute right-0'>
                    <div className=' h-full w-60  flex items-center justify-center'>
                        <button className='flex font3 uppercase items-center relative gap-3 tracking-wider bg-[#cccccc3b] backdrop-blur-[100px] rounded-full w-40 h-14 pl-7 cursor-pointer hover:bg-[#cccccc3b]/90'>
                            Log Out
                            <RiLogoutCircleRLine size={2} className='bg-[#ff4400]/60 text-[#ccc] p-1.5 rounded-full absolute right-2 h-10 w-10' />
                        </button>
                    </div>
                </Link>
            </div>






        </div>
    )
}

export default AdminHeader
