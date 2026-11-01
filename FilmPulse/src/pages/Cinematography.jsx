import React from 'react'
import Header from '../components/Header'
import { MoveRight } from 'lucide-react'
import { Link } from 'react-router-dom'

function Cinematography() {
  return (
    <div className='bg-black min-h-dvh w-full text-white pt-30'>

      <div className='w-full lg:h-[600px] px-6 lg:px-20 lg:flex overflow-hidden '>
        <div className="left lg:w-1/2 pt-10">
          <h1 className='text-4xl lg:text-6xl md:text-6xl font-bold tracking-wide font1 text-white/90'>
            Cinematography
          </h1>
          <p className='text-gray-400 mt-4 text-[15px] lg:text-justify lg:text-base leading-relaxed font3'>
            Explore how shots, lenses, camera movements, and framing shape the language of visual storytelling.
            Learn how each technique influences mood, depth, and audience emotion.
          </p>

          {/* <div className='mt-8'>
            <input
              type="text"
              placeholder="Search cinematography techniques…"
              className='w-full bg-[#111] border border-gray-700 px-4 py-3 rounded-xl 
            focus:outline-none focus:border-gray-400 text-sm'
            />
          </div> */}

          <div className='w-full lg:h-60 md:h-60 h-30 lg:mt-18 md:mt-7 mt-4 flex gap-2'>
            <div className=' w-1/3 h-full overflow-hidden relative' data-aos="fade-up" data-aos-duration="1000" >
              <img src="https://i.pinimg.com/1200x/e8/bf/04/e8bf047f9853775d6603a6f1ea4c8db5.jpg" className='absolute h-full w-full object-cover' alt="" />
            </div>
            <div className=' w-1/3  overflow-hidden relative' data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
              <img src="https://i.pinimg.com/736x/b3/65/db/b365db3d209ff954d15721deef485e68.jpg" className='absolute h-full w-full object-cover' alt="" /></div>
            <div className=' w-1/3  overflow-hidden relative' data-aos="fade-up" data-aos-duration="1000" data-aos-delay="800">
              <img src="/images/c1.jpg" className='absolute h-full w-full object-cover' alt="" /></div>
          </div>
        </div>



        <div className="right lg:w-1/2 overflow-y-auto mt-10 lg:ml-10">
          <div className='flex flex-col gap-6 lg:px-10 pb-10 font3 relative'>

            <div data-aos="fade-left" data-aos-duration="1000" className='group bg-[#0d0d0d] border border-gray-800 flex lg:flex-row md:flex-row flex-col-reverse relative lg:h-55 md:h-55 h-100
                       hover:border-gray-500 hover:bg-[#151515] transition-all duration-300 cursor-pointer'>
              <div className="md:w-[70%]  p-6">
                <h2 className='lg:text-xl md:text-xl text-[17px]  font-semibold'>Camera Movements</h2>
                <p className='text-gray-400 md:text-sm text-[12px] mt-3 leading-relaxed'>
                  Discover how movement styles like Dolly Zoom, Steadicam, Pan, Tilt, and Tracking Shots
                  influence emotion and viewer immersion.
                </p>

                <Link to={'/cameramovements'}>
                  <button className="md:mt-8 mt-4 px-4 py-2 md:text-[14px] text-[12px] flex items-center gap-2 border border-[cyan] text-[cyan] hover:bg-[cyan] hover:text-black font3 font-medium text-sm transition-all duration-75">
                    Explore
                    <MoveRight size={18} className='mt-[1.5px]' />
                  </button>
                </Link>
              </div>

              <div className='md:w-[30%]  p-1 md:h-full overflow-hidden md:absolute  right-0'>
                <img src="/images/c1.jpg" className='h-full w-full object-cover' alt="" />
              </div>
            </div>

            <div data-aos="fade-left" data-aos-duration="1000" data-aos-delay="400" className='group bg-[#0d0d0d] border border-gray-800 flex lg:flex-row md:flex-row flex-col-reverse relative lg:h-55 md:h-55 h-100
                       hover:border-gray-500 hover:bg-[#151515] transition-all duration-300 cursor-pointer'>
              <div className="md:w-[70%]  p-6">
                <h2 className='lg:text-xl md:text-xl text-[17px]  font-semibold'>Shot Types</h2>
                <p className='text-gray-400 md:text-sm text-[12px] mt-3 leading-relaxed'>
                  From Close-Up to Extreme Wide Shot, learn how each type conveys scale, intimacy, and narrative focus.
                </p>

                <Link to={'/shottype'}>
                  <button className="md:mt-8 mt-4 px-4 py-2 md:text-[14px] text-[12px] flex items-center gap-2 border border-[cyan] text-[cyan] hover:bg-[cyan] hover:text-black font3 font-medium text-sm transition-all duration-75">
                    Explore
                    <MoveRight size={18} className='mt-[1.5px]' />
                  </button>
                </Link>
              </div>

              <div className='md:w-[30%]  p-1 md:h-full overflow-hidden md:absolute  right-0'>
                <img src="https://i.pinimg.com/1200x/4c/a7/9a/4ca79a3eef1f0bc69eadf348326c757d.jpg" className='h-full w-full object-cover' alt="" />
              </div>
            </div>

            <div data-aos="fade-left" data-aos-duration="1000" data-aos-delay="800" data-aos-offset="-200" className='group bg-[#0d0d0d] border border-gray-800 flex lg:flex-row md:flex-row flex-col-reverse relative lg:h-55 md:h-55 h-100
                       hover:border-gray-500 hover:bg-[#151515] transition-all duration-300 cursor-pointer'>
              <div className="md:w-[70%]  p-6">
                <h2 className='lg:text-xl md:text-xl text-[17px]  font-semibold'>Lenses & Depth</h2>
                <p className='text-gray-400 md:text-sm text-[12px] mt-3 leading-relaxed'>
                  Learn how focal length, depth of field, and aperture shape the emotional tone and spatial perception.
                </p>

                <Link to={'/lens_depths'}>
                  <button className="md:mt-8 mt-4 px-4 py-2 md:text-[14px] text-[12px] flex items-center gap-2 border border-[cyan] text-[cyan] hover:bg-[cyan] hover:text-black font3 font-medium text-sm transition-all duration-75">
                    Explore
                    <MoveRight size={18} className='mt-[1.5px]' />
                  </button>
                </Link>
              </div>

              <div className='md:w-[30%]  p-1 md:h-full overflow-hidden md:absolute  right-0'>
                <img src="https://i.pinimg.com/1200x/a4/7f/ff/a47fff75e7b1bc0dba1928ccd869cbcf.jpg" className='h-full w-full object-cover' alt="" />
              </div>
            </div>








            {/* <div className='group bg-[#0d0d0d] border border-gray-800 flex relative h-55
                       hover:border-gray-500 hover:bg-[#151515] transition-all duration-300 cursor-pointer'>
              <div className="w-[70%]  p-6">
                <h2 className='text-xl font-semibold'>Camera Angles</h2>
                <p className='text-gray-400 text-sm mt-3 leading-relaxed'>
                  Low-angle, High-angle, Dutch tilt, discover how angles express power dynamics and tension.
                </p>
                <button className="mt-8 px-4 py-2 flex gap-2 border border-[cyan] text-[cyan] hover:bg-[cyan] hover:text-black font3 font-medium text-sm transition-all duration-75">
                  Explore
                  <MoveRight size={18} className='mt-[1.5px]' />
                </button>
              </div>

              <div className='w-[30%] p-1 h-full overflow-hidden absolute  right-0'>
                <img src="https://i.pinimg.com/1200x/e9/1c/d3/e91cd3ea4288ace1be1f16c6ac2be92c.jpg" className='h-full w-full' alt="" />
              </div>
            </div>

            <div className='group bg-[#0d0d0d] border border-gray-800 flex relative h-55
                       hover:border-gray-500 hover:bg-[#151515] transition-all duration-300 cursor-pointer'>
              <div className="w-[70%]  p-6">
                <h2 className='text-xl font-semibold'>Motion Style</h2>
                <p className='text-gray-400 text-sm mt-3 leading-relaxed'>
                  Explore handheld vs. controlled motion and how dynamic movement shapes realism and tension.
                </p>
                <button className="mt-8 px-4 py-2 flex gap-2 border border-[cyan] text-[cyan] hover:bg-[cyan] hover:text-black font3 font-medium text-sm transition-all duration-75">
                  Explore
                  <MoveRight size={18} className='mt-[1.5px]' />
                </button>
              </div>

              <div className='w-[30%] p-1 h-full overflow-hidden absolute right-0'>
                <img src="https://i.pinimg.com/originals/1c/6a/0c/1c6a0c79e20f5ff5e2526f259080d275.jpg" className='h-full' alt="" />
              </div>
            </div> */}

          </div>
        </div>

      </div>


    </div>
  )
}

export default Cinematography
