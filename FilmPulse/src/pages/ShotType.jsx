
import React, { useContext, useEffect, useState } from 'react'
import { MoveRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getShotTypeAPI } from '../services/allAPIs'
import { searchContext } from '../contextShareAPI/ContextShare'

function ShotType() {

  const [token, setToken] = useState('')
  const [shotType, setShotType] = useState([])

  const { searchKey, setSearchKey } = useContext(searchContext)


  // Get Shot Types
  const getShotTypes = async (searchKey, token) => {

    const updatedToken = token.replace(/"/g, '')

    const reqHeader = {
      Authorization: `Bearer ${updatedToken}`
    }

    try {

      const response = await getShotTypeAPI(searchKey, reqHeader)

      console.log(response.data)

      setShotType(
        Array.isArray(response.data) ? response.data : []
      )

    } catch (error) {

      console.log("Error:", error)

    }
  }


  // Get Token
  useEffect(() => {

    const storedToken = sessionStorage.getItem('token')

    if (storedToken) {
      setToken(storedToken.replace(/"/g, ''))
    }

  }, [])


  // Fetch Shot Types
  useEffect(() => {

    if (token) {
      getShotTypes(searchKey, token)
    }

  }, [searchKey, token])


  return (

    <div className="bg-black min-h-screen text-white pt-30">

      {/* Header Section */}
      <div className="head mt-10 flex flex-col items-center">

        <div className="flex flex-col lg:flex-row lg:items-center w-full px-5 sm:px-10 lg:px-20 relative gap-5 lg:gap-0">

          {/* Page Title */}
          <h1 className='text-3xl sm:text-4xl md:text-6xl font-bold tracking-wide font1 text-white/90'>
            Shot Types
          </h1>


          {/* Search Input */}
          <div className="flex gap-5 w-full lg:w-auto lg:absolute lg:right-25">

            <input
              type="text"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              placeholder="Search cinematography techniques…"
              className='w-full lg:w-90 bg-[#111] border border-gray-700 px-4 py-3 focus:outline-none focus:border-gray-400 text-sm'
            />

          </div>

        </div>


        {/* Divider */}
        <div className="line w-[92%] h-px mt-5 bg-[#555]"></div>

      </div>


      {/* Shot Type Cards */}
      <div className="box w-full gap-x-8 gap-y-6 lg:gap-y-8 mt-10 px-5 sm:px-10 lg:px-20 pb-20 grid grid-cols-1 md:grid-cols-2">


        {/* No Results */}
        {searchKey && shotType.length === 0 ? (

          <div className="col-span-full flex flex-col items-center justify-center min-h-[300px] text-gray-400 text-center px-4">

            <h2 className="text-2xl sm:text-3xl font-semibold font3">
              No results found
            </h2>

            <p className="mt-2 text-sm">
              No shot type matches “{searchKey}”
            </p>

          </div>

        ) : (


          shotType.map((item) => (

            <div
              key={item._id}
              className="item border border-[#555] min-h-[420px] lg:min-h-0 lg:h-50 flex flex-col lg:flex-row relative overflow-hidden"
            >

              {/* Left Content */}
              <div className="left w-full lg:w-[50%] p-4 lg:mt-4 lg:ml-4 lg:p-0 relative z-10 flex flex-col">


                {/* Title */}
                <h1 className='text-xl sm:text-2xl lg:text-2xl font-semibold text-white/90 font3 uppercase'>
                  {item.title}
                </h1>


                {/* Mobile & Tablet Video */}
                <div className="relative w-full h-48 sm:h-60 mt-4 lg:hidden overflow-hidden">

                  <div className="absolute inset-0 bg-black/20 bg-linear-0 from-black via-black/0 to-black/0 z-[1]">
                  </div>

                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className='w-full h-full object-cover'
                  >

                    <source
                      src={`http://localhost:5000/uploads/videos/${item.videos?.[0]?.video}`}
                      type="video/mp4"
                    />

                  </video>

                </div>


                {/* Description */}
                <p className='text-white/60 mt-4 lg:mt-5 text-[13px] font3'>
                  {item.shortDescription}
                </p>


                {/* Learn About Technique */}
                <Link
                  to={`/stresults/${item._id}`}
                  className="mt-auto pt-5 lg:pt-0 lg:mt-8"
                >

                  <button className="flex gap-2 text-[#aaaaaa] hover:text-[cyan] font3 font-medium text-sm transition-all duration-75 lg:absolute lg:bottom-6">

                    Learn About Technique

                    <MoveRight size={18} className='mt-[1.5px]' />

                  </button>

                </Link>

              </div>


              {/* Laptop Video */}
              <div className="right hidden lg:flex h-full w-[50%] absolute right-0 p-2 justify-end">

                <div className="overlay w-full h-full bg-black/20 bg-linear-0 from-black via-black/0 to-black/0 absolute top-0 right-0 z-[1]">
                </div>

                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className='h-full w-full object-cover'
                >

                  <source
                    src={`http://localhost:5000/uploads/videos/${item.videos?.[0]?.video}`}
                    type="video/mp4"
                  />

                </video>

              </div>

            </div>

          ))

        )}

      </div>

    </div>

  )

}

export default ShotType
