
import React from 'react'

function PageNotFound() {
  return (
    <div className='bg-black min-h-screen w-full relative overflow-hidden'>
      <div className='flex flex-col items-center justify-center min-h-screen px-4'>

        <h1 className='text-white text-[105px] sm:text-[100px] md:text-[150px] lg:text-[252px] font1 whitespace-nowrap leading-30 md:leading-none text-center'>
          ERROR <br className='block md:hidden'/> <span className='text-[cyan] text-[170px] sm:text-[100px] md:text-[150px] lg:text-[252px]'>404</span>
        </h1>

        <h1 className='text-white/80 font-extralight text-[16px] sm:text-[20px] md:text-[26px] lg:text-[32px] text-center tracking-wide mt-3 lg:mt-72 lg:absolute'>
          There is no such page in
          <span className='text-[cyan] font3 font-semibold text-[20px] sm:text-[32px] md:text-[30px] lg:text-[49px]'>
            {' '}film pulse
          </span>
          <span className='block sm:inline'> universe.</span>
        </h1>

      </div>
    </div>
  )
}

export default PageNotFound
