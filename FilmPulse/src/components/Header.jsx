import { X, Menu } from 'lucide-react';
import React, { useRef, useState } from 'react'
import { FaHeadphonesAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Audio from './Audio';
import Switch from './ToggleSwitch';
import { useEffect } from 'react';



function Header() {
    const [openDrawer, setOpenDrawer] = useState(false)
    const [openMobileMenu, setOpenMobileMenu] = useState(false)
    const [active, setActive] = useState("home");


    //to hold userdata
    const [userData, setUserData] = useState({})

    const userDetails = JSON.parse(sessionStorage.getItem('userDetails'))
    // console.log(userDetails);

        

    useEffect(() => {
        setUserData(userDetails)
    }, [])


    return (
        <div className='fixed top-0 w-full z-20'>
            <div className='bg-black/75 backdrop-blur-[100px] w-full h-30 flex items-center justify-between md:justify-center relative border-b-2 border-[#8f8f8f] z-10 px-4 md:px-0'>
                <a href="/home" className='h-full flex items-center justify-center'>
                    <h1 className='text-[16px] md:text-[20px] text-[#ccc] font-semibold font3 md:absolute tracking-widest md:left-10'>FILM PULSE</h1>
                </a>

                {/* Desktop Navigation */}
                <ul className='hidden lg:flex text-[#ccc] items-center justify-center gap-16 font-semibold bg-[#cccccc3b] backdrop-blur-[100px] rounded-full px-2 py-2'>

                    <Link to={'/home'}>
                        <li onClick={() => setActive('home')}
                            className={`px-5 py-2 rounded-full transition-all duration-150 border-2 border-[cyan]/0 hover:border-[cyan] hover:text-[cyan]
                        ${active === 'home' ? 'bg-[cyan] text-black hover:text-black' : 'bg-[cyan]/0'}`}>
                            Home
                        </li>
                    </Link>

                    <Link to={'/about'}>
                        <li onClick={() => setActive('about')}
                            className={`px-5 py-2 rounded-full transition-all duration-150 border-2 border-[cyan]/0 hover:border-[cyan] hover:text-[cyan]
                        ${active === 'about' ? 'bg-[cyan] text-black hover:text-black' : 'bg-[cyan]/0'}`}>
                            About
                        </li>
                    </Link>

                    <Link to={'/subscription'}>
                        <li onClick={() => setActive('subscription')}
                            className={`px-5 py-2 rounded-full transition-all duration-150 border-2 border-[cyan]/0 hover:border-[cyan] hover:text-[cyan]
                        ${active === 'subscription' ? 'bg-[cyan] text-black hover:text-black' : 'bg-[cyan]/0'}`}>
                            Subscription
                        </li>
                    </Link>

                    <Link to={'/cinematography'}>
                        <li onClick={() => setActive('cinematography')}
                            className={`px-5 py-2 rounded-full transition-all duration-150 border-2 border-[cyan]/0 hover:border-[cyan] hover:text-[cyan] 
                        ${active === 'cinematography' ? 'bg-[cyan] text-black hover:text-black' : 'bg-[cyan]/0'}`}>
                            Techniques
                        </li>
                    </Link>
                </ul>

                {/* Desktop Right Section */}
                <div className='hidden lg:flex items-center justify-center absolute right-10 gap-9 border-l-2 border-[#8f8f8f] h-full pl-10'>
                    <Audio />

                    {userData && <div>
                        <button onClick={() => setOpenDrawer(true)} className='user border-2 border-[#00ffff] w-15 h-15 rounded-full overflow-hidden p-px'>
                            <img src={userData.profile ? `http://localhost:5000${userData.profile}` : "https://i.pinimg.com/736x/57/99/8d/57998dcb4df036da2094c3071be7657a.jpg"} className='w-full h-full object-cover opacity-95 rounded-full scale-101' alt="" />
                        </button>
                    </div>}

                    {!userData && <div>
                        <Link to={'/'}>
                            <button className="border md:scale-90 flex gap-3 border-[cyan] text-[cyan] text-[15px] hover:bg-[cyan] bg-[cyan]/10 px-9 py-3 font3 uppercase font-semibold hover:text-[#000000] backdrop-blur-[50px] transition-all duration-180 tracking-widest rounded-full">Login</button>
                        </Link>
                    </div>}
                </div>

                {/* Mobile Menu Button */}
                <div className='lg:hidden flex items-center gap-3 md:absolute right-10'>
                    <Audio />
                    <button onClick={() => setOpenMobileMenu(true)} className='text-[#ccc] p-2'>
                        <Menu className='w-6 h-6' />
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <div className={`lg:hidden fixed top-0 left-0 h-full w-full bg-black/95 backdrop-blur-md z-50 transition-transform duration-300 
                ${openMobileMenu ? 'translate-x-0' : '-translate-x-full'}`}>
                
                <div className="flex items-center justify-between p-4 border-b-2 border-[#8f8f8f]">
                    <h2 className="text-[#ccc] text-lg font-semibold font3 tracking-widest">MENU</h2>
                    <button onClick={() => setOpenMobileMenu(false)}>
                        <X className='text-[#b31b1b] h-6 w-6' />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Mobile Navigation Links */}
                    <ul className='space-y-3 flex flex-col gap-4'>
                        <Link to={'/home'} onClick={() => setOpenMobileMenu(false)}>
                            <li className={`px-6 py-3 rounded-full transition-all duration-150 border-2 font-semibold
                                ${active === 'home' ? 'bg-[cyan] text-black border-[cyan]' : 'bg-[cyan]/10 text-[#ccc] border-[cyan]/30'}`}>
                                Home
                            </li>
                        </Link>

                        <Link to={'/about'} onClick={() => setOpenMobileMenu(false)}>
                            <li className={`px-6 py-3 rounded-full transition-all duration-150 border-2 font-semibold
                                ${active === 'about' ? 'bg-[cyan] text-black border-[cyan]' : 'bg-[cyan]/10 text-[#ccc] border-[cyan]/30'}`}>
                                About
                            </li>
                        </Link>

                        <Link to={'subscription'} onClick={() => setOpenMobileMenu(false)}>
                            <li className={`px-6 py-3 rounded-full transition-all duration-150 border-2 font-semibold
                                ${active === 'subscription' ? 'bg-[cyan] text-black border-[cyan]' : 'bg-[cyan]/10 text-[#ccc] border-[cyan]/30'}`}>
                                Subscription
                            </li>
                        </Link>

                        <Link to={'cinematography'} onClick={() => setOpenMobileMenu(false)}>
                            <li className={`px-6 py-3 rounded-full transition-all duration-150 border-2 font-semibold
                                ${active === 'cinematography' ? 'bg-[cyan] text-black border-[cyan]' : 'bg-[cyan]/10 text-[#ccc] border-[cyan]/30'}`}>
                                Techniques
                            </li>
                        </Link>
                    </ul>

                    {/* Mobile User Section */}
                    <div className="pt-6 border-t-2 border-[#8f8f8f]">
                        {userData ? (
                            <button onClick={() => {
                                setOpenMobileMenu(false);
                                setOpenDrawer(true);
                            }} className='w-full flex items-center gap-4 px-6 py-3 rounded-full bg-[cyan]/10 border-2 border-[cyan]/30'>
                                <img src={userData.profile ? `http://localhost:5000${userData.profile}` : "https://i.pinimg.com/736x/57/99/8d/57998dcb4df036da2094c3071be7657a.jpg"}
                                    className='w-12 h-12 object-cover rounded-full opacity-85 border-2 border-[#00ffff] scale-101' alt="" />
                                <span className='text-[#ccc] font-semibold'>Profile</span>
                            </button>
                        ) : (
                            <Link to={'/'} onClick={() => setOpenMobileMenu(false)}>
                                <button className="w-full border flex justify-center gap-3 border-[cyan] text-[cyan] text-[15px] hover:bg-[cyan] bg-[cyan]/10 px-9 py-3 font3 uppercase font-semibold hover:text-[#000000] backdrop-blur-[50px] transition-all duration-180 tracking-widest rounded-full">
                                    Login
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* User Drawer (Profile Menu) */}
            <div className={`fixed top-0 right-0 h-full w-full sm:w-92 bg-[#111] text-white shadow-xl z-50 px-6 transition-transform duration-300 
                ${openDrawer ? 'translate-x-0' : 'translate-x-full'}`}>

                <div className="header flex items-center relative font3 mb-10 mt-10">
                    <h2 className="text-xl font-semibold tracking-widest">FILM PULSE</h2>
                    <button onClick={() => setOpenDrawer(false)}><X strokeWidth={1.75} className='text-[#b31b1b] absolute right-0 -top-[3px] h-7 w-7' /></button>
                </div>

                <ul className="space-y-4 flex flex-col text-[17px] font3 font-medium ">
                    <Link onClick={() => setOpenDrawer(false)} to={'/profile'}>
                        <div className='w-full h-12 px-10 flex items-center hover:bg-cyan-400/16 rounded-full border-2 border-[cyan]/0 hover:border-2 hover:border-[cyan] text-[#d4d4d4] hover:text-[cyan]'>
                            <li className=" cursor-pointer">Profile</li>
                        </div>
                    </Link>

                    <Link to={'notification'} onClick={() => setOpenDrawer(false)}>
                        <div className='w-full h-12 px-10 flex items-center hover:bg-cyan-400/16 rounded-full border-2 border-[cyan]/0 hover:border-2 hover:border-[cyan] text-[#d4d4d4] hover:text-[cyan]'>
                            <li className="cursor-pointer">Notifications</li>
                        </div>
                    </Link>

                    <Link to={'favourites'} onClick={() => setOpenDrawer(false)}>
                        <div className='w-full h-12 px-10 flex items-center hover:bg-cyan-400/16 rounded-full border-2 border-[cyan]/0 hover:border-2 hover:border-[cyan] text-[#d4d4d4] hover:text-[cyan]'>
                            <li className="cursor-pointer">Favourites</li>
                        </div>
                    </Link>

                    <Link to={'/subscription'} onClick={() => setOpenDrawer(false)}>
                        <div className='w-full h-12 px-10 flex items-center hover:bg-cyan-400/16 rounded-full border-2 border-[cyan]/0 hover:border-2 hover:border-[cyan] text-[#d4d4d4] hover:text-[cyan]'>
                            <li className=" cursor-pointer">Subscription</li>
                        </div>
                    </Link>

                    <div className='w-full h-12 px-10 flex items-center gap-20 hover:bg-cyan-400/16 rounded-full border-2 border-[cyan]/0 hover:border-2 hover:border-[cyan] text-[#d4d4d4] hover:text-[cyan]'>
                        <li className=" cursor-pointer">Dark Mode</li>
                        <div className="switch flex items-center justify-center pt-1.5">
                            <Switch />
                        </div>
                    </div>

                    <Link to={'/'} onClick={() => setOpenDrawer(false)}>
                        <div className='w-full h-12 px-10 flex items-center hover:bg-red-400/16 border-2 border-[cyan]/0 hover:border-2 hover:border-[red] hover:text-red-500 text-red-500/80 rounded-full'>
                            <li className=" cursor-pointer">Logout</li>
                        </div>
                    </Link>

                </ul>
            </div>

        </div>
    )
}

export default Header