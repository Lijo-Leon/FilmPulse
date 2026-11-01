import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin } from '@react-oauth/google';
import { GoogleLoginUserAPI, loginUserAPI, registerUserAPI } from '../services/allAPIs';
import { jwtDecode } from "jwt-decode";
import Swal from 'sweetalert2'

function Auth({ register }) {
    console.log(register);

    const [userData, setUserData] = useState({
        "username": "",
        "email": "",
        "password": "",
    })
    const navigate = useNavigate()

    const handleRegister = async () => {
        console.log(userData);

        if (!userData.username || !userData.email || !userData.password) {
            Swal.fire({
                icon: 'warning',
                title: 'Incomplete Form',
                text: 'Please fill all required fields!',
                background: '#0b0b0b',
                color: '#ffffff',
                confirmButtonColor: '#00ffff'
            })
        }

        else {
            try {
                const response = await registerUserAPI(userData)
                console.log(response);

                if (response.status === 200) {
                    setTimeout(() => {
                        navigate('/')
                    })


                }
                else {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Already registered with this Email',
                        background: '#0b0b0b',
                        color: '#ffffff',
                        confirmButtonColor: '#00ffff'
                    })
                }
            }
            catch (error) {
                console.log("Error occured : ", error);

            }
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
        }

        else {
            try {
                const response = await loginUserAPI({
                    email: userData.email,
                    password: userData.password
                })
                console.log(response);

                if (response.status === 200) {
                    sessionStorage.setItem('userDetails', JSON.stringify(response.data.user))
                    sessionStorage.setItem('token', JSON.stringify(response.data.token))

                    if (response.data.user.role == "FilmPulseAdmin") {
                        setTimeout(() => {
                            navigate('/admin-home')
                        }, 1000)
                    } else {
                        setTimeout(() => {
                            navigate('/home')
                        }, 1000)
                    }
                }

                else {
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
    }


    const handleGoogleLogin = async (credentialResponse) => {
        const decode = jwtDecode(credentialResponse.credential);

        const response = await GoogleLoginUserAPI({
            email: decode.email,
            password: "googlepwd",
            username: decode.name,
            profile: decode.picture
        });

        console.log("GOOGLE API RESPONSE:", response);

        if (response.status === 200 || response.status === 201) {
            sessionStorage.setItem('userDetails', JSON.stringify(response.data.user));
            sessionStorage.setItem('token', JSON.stringify(response.data.token));

            navigate('/home');
        } else {
            console.log("Unexpected status:", response.status);
        }
    };

    return (
        <div className='fixed w-full h-screen z-20'>
            <div className="w-full h-screen flex items-center justify-center bg-[url('https://i.pinimg.com/1200x/1c/21/88/1c2188ca1227b70e9c311139795a4ecc.jpg')] bg-cover bg-center">
                <div className="overlay w-full h-screen bg-black absolute"></div>
                <div className="md:w-[70%] w-screen md:h-[83%] h-screen rounded shadow-2xl overflow-hidden flex bg-[url('/images/1000023885bg1.png')] bg-cover bg-center z-30">

                    <div className="left hidden bg-black/10 w-[58%] h-full backdrop-blur-xs md:flex flex-col gap-9  relative text-white text-center">
                        <div className="overlay relative w-full h-full bg-black/40 ">
                            <h1 className='font3 font-bold absolute left-38 bottom-10 tracking-[20px] text-[#c5c5c5] text-2xl z-10 '>FILM PULSE</h1>
                        </div>
                        {/* <h1 className='font3 font-light tracking-wide text-2xl z-10'>Get started with us.</h1> */}
                    </div>

                    <div className="right flex-1 bg-white/10 backdrop-blur-sm flex flex-col md:px-15 px-10 py-10 scale-85 md:scale-100 md:rounded-none rounded-xl">
                        {
                            register ? <h1 className='font3 text-white text-3xl tracking-wide font-semibold'>SIGN UP</h1>
                                : <h1 className='font3 text-white text-3xl tracking-wide font-semibold'>SIGN IN</h1>
                        }

                        {/* <h1 className='font3 text-white text-3xl tracking-wide font-semibold'>SIGN UP</h1> */}
                        <div className='line w-31 h-[3px] bg-white mt-1'></div>
                        <div className="labels mt-10 flex flex-col gap-6">
                            {register &&
                                <input onChange={(e) => setUserData({ ...userData, username: e.target.value })} type="text" placeholder='Enter Username' className='font3 focus:bg-white/10 border border-[#ccc] h-12 w-full px-4 text-[#ccc] placeholder:text-[#ccc] text-sm' />
                            }

                            <input onChange={(e) => setUserData({ ...userData, email: e.target.value })} type="text" placeholder='Enter Email Address' className='font3 focus:bg-white/10 border border-[#ccc] h-12 w-full px-4 text-[#ccc] placeholder:text-[#ccc] text-sm' />
                            <input onChange={(e) => setUserData({ ...userData, password: e.target.value })} type="text" placeholder='Enter Password' className='font3 focus:bg-white/10 border border-[#ccc] h-12 w-full px-4 text-[#ccc] placeholder:text-[#ccc] text-sm' />
                            {register ? <button onClick={handleRegister} type='button' className='font3 bg-white/30 h-12 w-full tracking-wider hover:bg-white/50 transition-all duration-200 text-[#ffffff] font-semibold'>SIGN UP</button>

                                : <button onClick={handleLogin} type='button' className='font3 bg-white/30 h-12 w-full tracking-wider hover:bg-white/50 transition-all duration-200 text-[#ffffff] font-semibold'>SIGN IN</button>
                            }
                        </div>

                        <div className="google flex items-center justify-center gap-2 my-7 text-[#afafaf]">
                            <div className='line w-26 h-px bg-[#afafaf] mt-1'></div>
                            <p className='md:text-sm text-xs'>Or continue with</p>
                            <div className='line w-26 h-px bg-[#afafaf] mt-1'></div>
                        </div>


                        <GoogleLogin onClick={() => handleGoogleLogin(credentialResponse)}
                            onSuccess={credentialResponse => {
                                console.log(credentialResponse);
                                handleGoogleLogin(credentialResponse)
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />


                        {
                            register ? <p className='text-sm font3 text-[#afafaf] flex gap-3 mt-6'>Already have an Account?<a href="/"><span className='font-semibold underline text-[#e2e2e2] tracking-wider'>SIGN IN</span></a></p>
                                : <p className='text-sm font3 text-[#afafaf] flex gap-3 mt-6'>Don't have an Account?<a href="/register"><span className='font-semibold underline text-[#e2e2e2] tracking-wider'>SIGN UP</span></a></p>
                        }

                    </div>
                </div>
            </div>


        </div>
    )
}

export default Auth
