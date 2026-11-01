import React from 'react'
import Header from '../components/Header'
import { CircleCheck } from 'lucide-react'
import { useState } from 'react'
import { createCheckoutSessionAPI } from "../services/allAPIs";

function Subscription() {



  const user = JSON.parse(sessionStorage.getItem("userDetails"));

  const handleBuyPremium = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem("userDetails"));

      if (!user) {
        Swal.fire({
          icon: 'warning',
          title: 'Please Login First',
          background: '#0b0b0b',
          color: '#ffffff',
          confirmButtonColor: '#00ffff'
        })

        return;
      }

      if (user.subscriber) {
        alert("You are already a Premium user!");
        return;
      }

      const token = JSON.parse(sessionStorage.getItem("token"));

      const reqHeader = {
        Authorization: `Bearer ${token}`
      };

      const response = await createCheckoutSessionAPI(reqHeader);

      if (response?.data?.url) {
        window.location.href = response.data.url;
      }

    } catch (error) {
      const msg = error?.response?.data || "Payment failed";
      alert(msg);
    }
  };





  return (
    <div className='bg-black w-full h-screen lg:overflow-hidden relative pt-30'>
      <div className='w-full flex items-center justify-center text-white'>
        {/* <video autoPlay loop muted className='lg:w-full w-full h-130 lg:h-auto absolute top-0' type='video/mp4' >
          <source src='/videos/bg-video/film_pulse_bg.mp4' className='h-full w-full object-cover'/>
        </video> */}
        <div className="overlay bg-[black]/75 backdrop-blur-[9px] w-full h-screen z-5 absolute top-0"></div>
      </div>

      <div className='z-10 absolute pt-4 lg:px-10 md:px-6 px-6 flex w-full'>
        <div className='lg:w-[50%] pt-6 '>
          <h1 className='text-white font1 lg:text-9xl md:text-8xl text-5xl uppercase tracking-wide'>Premium</h1>
          <p className='text-[#adadad] font3 lg:text-[16px] text-[13px] lg:text-left text-justify'>Unlock deep filmmaking analysis, add your own techniques, and explore advanced cinematography insights crafted for creators.</p>
          <h1 className='text-[cyan] font1 font-semibold lg:text-8xl md:text-7xl text-5xl tracking-wide flex items-center mt-4'>₹49 <span className='font3 font-light lg:text-5xl md:text-5xl text-2xl text-[#e6e6e6] ml-3'>/month</span></h1>
          <ul className='mt-3 ml-4 flex flex-col gap-3'>
            <li className='text-[#ccc] flex items-center gap-3 font3 lg:text-[16px] md:text-[10px] text-[12px]'><CircleCheck size={23} strokeWidth={1.25} className='text-[cyan]' /> Add your own techniques</li>
            <li className='text-[#ccc] flex items-center gap-3 font3 lg:text-[16px] md:text-[10px] text-[12px]'><CircleCheck size={23} strokeWidth={1.25} className='text-[cyan]' /> Edit & delete your techniques</li>
            <li className='text-[#ccc] flex items-center gap-3 font3 lg:text-[16px] md:text-[10px] text-[12px]'><CircleCheck size={23} strokeWidth={1.25} className='text-[cyan]' /> Advanced cinematography breakdowns</li>
            <li className='text-[#ccc] flex items-center gap-3 font3 lg:text-[16px] md:text-[10px] text-[12px]'><CircleCheck size={23} strokeWidth={1.25} className='text-[cyan]' />Save techniques to favorites</li>
          </ul>

          {
            user.subscriber ? (<h1 className='font1 text-white mt-6 tracking-wider text-2xl border border-[cyan] text-center w-90 py-4 bg-[cyan]/10 backdrop-blur-[50px]'>You Are Already a <span className='text-[cyan]'>Premium Member</span></h1>
            ) : (<button onClick={handleBuyPremium} className="border lg:scale-90 flex gap-3 border-[cyan] text-[cyan] text-[15px] hover:bg-[cyan] bg-[cyan]/10 mt-8  px-9 py-3 font3 uppercase font-semibold hover:text-[#000000] backdrop-blur-[50px] transition-all duration-100">Get Premium</button>
            )
          }        </div>


        <div className='lg:w-1/2 relative lg:flex hidden items-center justify-center'>

          <div className=" grid grid-cols-3 gap-6 mr-10 w-full">

            <img
              src="/images/c1.jpg"
              className="w-64 h-66 object-cover shadow-2xl"
            />

            <img
              src="https://i.pinimg.com/1200x/4c/a7/9a/4ca79a3eef1f0bc69eadf348326c757d.jpg"
              className="w-64 h-66 object-cover shadow-2xl"
            />


            <img
              src="https://i.pinimg.com/1200x/40/24/58/4024580280a6dcb8d5aef03517b46614.jpg"
              className="w-64 h-66 object-cover shadow-2xl"
            />

            <img
              src="https://i.pinimg.com/736x/b3/65/db/b365db3d209ff954d15721deef485e68.jpg"
              className="w-64 h-66 object-cover shadow-2xl"
            />

            <img
              src="https://i.pinimg.com/1200x/08/62/f8/0862f8956207380ca547d764d1815591.jpg"
              className="w-64 h-66 object-cover shadow-2xl"
            />

            <img
              src="https://i.pinimg.com/1200x/e8/bf/04/e8bf047f9853775d6603a6f1ea4c8db5.jpg"
              className="w-64 h-66 object-cover shadow-2xl"
            />

          </div>

        </div>
      </div>
    </div>
  )
}

export default Subscription
