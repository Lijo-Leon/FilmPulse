
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleLoginUserAPI, loginUserAPI, registerUserAPI } from '../services/allAPIs';
import { jwtDecode } from "jwt-decode";
import Swal from 'sweetalert2'

function Auth({ register }) {

    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
    })

    const navigate = useNavigate()

    const handleRegister = async () => {

        if (!userData.username || !userData.email || !userData.password) {
            Swal.fire({
                icon: 'warning',
                title: 'Incomplete Form',
                text: 'Please fill all required fields!',
                background: '#0b0b0b',
                color: '#ffffff',
                confirmButtonColor: '#00ffff'
            })
            return;
        }

        try {
            const response = await registerUserAPI(userData)

            if (response.status === 200 || response.status === 201) {
                navigate('/')
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Already registered with this Email',
                    background: '#0b0b0b',
                    color: '#ffffff',
                    confirmButtonColor: '#00ffff'
                })
            }

        } catch (error) {
            console.log("Error occurred:", error);
        }
    }


    const handleLogin = async () => {

        if (!userData.email || !userData.password) {
            Swal.fire({
                icon: 'warning',
                title: 'Incomplete Form',
                text: 'Please fill all fields!',
                background: '#0b0b0b',
                color: '#ffffff',
                confirmButtonColor: '#00ffff'
            })
            return;
        }

        try {
            const response = await loginUserAPI({
                email: userData.email,
                password: userData.password
            })

            if (response.status === 200) {

                sessionStorage.setItem('userDetails', JSON.stringify(response.data.user))
                sessionStorage.setItem('token', JSON.stringify(response.data.token))

                if (response.data.user.role === "FilmPulseAdmin") {
                    navigate('/admin-home')
                } else {
                    navigate('/home')
                }

            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Invalid credentials',
                    background: '#0b0b0b',
                    color: '#ffffff',
                    confirmButtonColor: '#00ffff'
                })
            }

        } catch (err) {
            console.log("Error Occurred:", err);
        }
    }


    const handleGoogleLogin = async (credentialResponse) => {

        try {
            const decode = jwtDecode(credentialResponse.credential);

            const response = await GoogleLoginUserAPI({
                email: decode.email,
                password: "googlepwd",
                username: decode.name,
                profile: decode.picture
            });

            if (response.status === 200 || response.status === 201) {

                sessionStorage.setItem('userDetails', JSON.stringify(response.data.user));
                sessionStorage.setItem('token', JSON.stringify(response.data.token));

                navigate('/home');
            }

        } catch (error) {
            console.log("Google Login Error:", error);
        }
    };


    return (

        <div className='fixed inset-0 w-full h-[100dvh] min-h-screen z-20 overflow-y-auto'>

            <div className="
                relative w-full min-h-full
                flex items-center justify-center
                bg-[url('https://i.pinimg.com/1200x/1c/21/88/1c2188ca1227b70e9c311139795a4ecc.jpg')]
                bg-cover bg-center
                px-3 py-5
                sm:px-6 sm:py-8
            ">

                <div className="overlay fixed inset-0 bg-black"></div>

                <div className="
                    relative z-30
                    w-full
                    min-h-[580px]
                    sm:w-[90%]
                    md:w-[85%]
                    lg:w-[70%]
                    md:h-[83vh]
                    md:min-h-[550px]
                    md:max-h-[850px]
                    rounded-xl md:rounded
                    shadow-2xl
                    overflow-hidden
                    flex
                    bg-[url('/images/1000023885bg1.png')]
                    bg-cover bg-center
                ">

                    {/* LEFT PANEL - Original laptop design preserved */}

                    <div className="
                        left hidden
                        bg-black/10
                        w-[58%]
                        h-full
                        backdrop-blur-xs
                        md:flex
                        flex-col
                        gap-9
                        relative
                        text-white
                        text-center
                    ">

                        <div className="overlay relative w-full h-full bg-black/40">

                            <h1 className='
                                font3 font-bold
                                absolute left-38 bottom-10
                                tracking-[20px]
                                text-[#c5c5c5]
                                text-2xl z-10
                            '>
                                FILM PULSE
                            </h1>

                        </div>

                    </div>


                    {/* RIGHT PANEL */}

                    <div className="
                        right flex-1
                        bg-white/10
                        backdrop-blur-sm
                        flex flex-col
                        justify-center
                        px-5 py-8
                        sm:px-10 sm:py-10
                        md:px-15 md:py-10
                        scale-100
                        md:scale-100
                        md:rounded-none
                    ">

                        {
                            register
                                ? <h1 className='font3 text-white text-2xl sm:text-3xl tracking-wide font-semibold'>SIGN UP</h1>
                                : <h1 className='font3 text-white text-2xl sm:text-3xl tracking-wide font-semibold'>SIGN IN</h1>
                        }

                        <div className='line w-24 sm:w-31 h-[3px] bg-white mt-1'></div>


                        {/* INPUT FIELDS */}

                        <div className='labels mt-7 sm:mt-10 flex flex-col gap-4 sm:gap-6'>

                            {register &&
                                <input
                                    onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                                    type="text"
                                    placeholder='Enter Username'
                                    className='
                                        font3 focus:bg-white/10
                                        border border-[#ccc]
                                        h-11 sm:h-12
                                        w-full px-4
                                        text-[#ccc]
                                        placeholder:text-[#ccc]
                                        text-sm
                                        outline-none
                                    '
                                />
                            }

                            <input
                                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                type="email"
                                placeholder='Enter Email Address'
                                className='
                                    font3 focus:bg-white/10
                                    border border-[#ccc]
                                    h-11 sm:h-12
                                    w-full px-4
                                    text-[#ccc]
                                    placeholder:text-[#ccc]
                                    text-sm
                                    outline-none
                                '
                            />

                            <input
                                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                                type="password"
                                placeholder='Enter Password'
                                className='
                                    font3 focus:bg-white/10
                                    border border-[#ccc]
                                    h-11 sm:h-12
                                    w-full px-4
                                    text-[#ccc]
                                    placeholder:text-[#ccc]
                                    text-sm
                                    outline-none
                                '
                            />


                            {
                                register
                                    ?
                                    <button
                                        onClick={handleRegister}
                                        type='button'
                                        className='
                                            font3 bg-white/30
                                            h-11 sm:h-12
                                            w-full tracking-wider
                                            hover:bg-white/50
                                            transition-all duration-200
                                            text-white font-semibold
                                        '
                                    >
                                        SIGN UP
                                    </button>

                                    :
                                    <button
                                        onClick={handleLogin}
                                        type='button'
                                        className='
                                            font3 bg-white/30
                                            h-11 sm:h-12
                                            w-full tracking-wider
                                            hover:bg-white/50
                                            transition-all duration-200
                                            text-white font-semibold
                                        '
                                    >
                                        SIGN IN
                                    </button>
                            }

                        </div>


                        {/* GOOGLE LOGIN DIVIDER */}

                        <div className="
                            google flex items-center justify-center
                            gap-2 my-6 sm:my-7
                            text-[#afafaf]
                        ">

                            <div className='line flex-1 h-px bg-[#afafaf] mt-1'></div>

                            <p className='whitespace-nowrap text-xs sm:text-sm'>
                                Or continue with
                            </p>

                            <div className='line flex-1 h-px bg-[#afafaf] mt-1'></div>

                        </div>


                        {/* GOOGLE LOGIN */}

                        <div className="w-full flex justify-center">
                            <GoogleLogin width={320}
                                onSuccess={handleGoogleLogin}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                            />
                        </div>


                        {/* NAVIGATION */}

                        {
                            register
                                ?
                                <p className='
                                    text-xs sm:text-sm
                                    font3 text-[#afafaf]
                                    flex flex-wrap gap-2
                                    mt-6
                                '>
                                    Already have an Account?

                                    <a href="/">
                                        <span className='font-semibold underline text-[#e2e2e2] tracking-wider'>
                                            SIGN IN
                                        </span>
                                    </a>
                                </p>

                                :
                                <p className='
                                    text-xs sm:text-sm
                                    font3 text-[#afafaf]
                                    flex flex-wrap gap-2
                                    mt-6
                                '>
                                    Don't have an Account?

                                    <a href="/register">
                                        <span className='font-semibold underline text-[#e2e2e2] tracking-wider'>
                                            SIGN UP
                                        </span>
                                    </a>
                                </p>
                        }

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Auth
