
import React, { useEffect, useState } from 'react'
import { MoveRight } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import {
  addFavSTAPI,
  getAShotTypeResultAPI,
  removefromFavSTAPI
} from '../services/allAPIs'
import { FaHeart } from 'react-icons/fa'


function STResults() {

  const [token, setToken] = useState('')
  const [stData, setstData] = useState({})

  const { id } = useParams()


  // Get Shot Type Details
  const getAShotType = async (id, currentToken) => {

    const updatedToken = currentToken.replace(/"/g, '')

    const reqHeader = {
      Authorization: `Bearer ${updatedToken}`
    }

    try {

      const response = await getAShotTypeResultAPI(id, reqHeader)

      console.log(response)

      setstData(response.data)

    } catch (error) {

      console.log("Error:", error)

    }
  }


  // Add Favourite
  const handleAddFavourite = async (id) => {

    const updatedToken = token.replace(/"/g, '')

    const reqHeader = {
      Authorization: `Bearer ${updatedToken}`
    }

    try {

      const response = await addFavSTAPI(id, reqHeader)

      console.log(response)

      setstData(prev => ({
        ...prev,
        favourite: true
      }))

      alert('Successfully added to Favourite')

    } catch (error) {

      console.log("Error:", error)

    }
  }


  // Remove Favourite
  const handleRemoveFavourite = async (id) => {

    const updatedToken = token.replace(/"/g, '')

    const reqHeader = {
      Authorization: `Bearer ${updatedToken}`
    }

    try {

      const response = await removefromFavSTAPI(id, reqHeader)

      console.log(response)

      setstData(prev => ({
        ...prev,
        favourite: false
      }))

      alert('Successfully removed from Favourite')

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


  // Fetch Shot Type
  useEffect(() => {

    if (token && id) {
      getAShotType(id, token)
    }

  }, [token, id])


  return (

    <div className='bg-black min-h-screen text-white pt-30 overflow-hidden'>


      {/* ===================================== */}
      {/* TITLE AND DESCRIPTION SECTION */}
      {/* ===================================== */}

      <div className='px-5 sm:px-8 md:px-12 lg:px-20 pt-10 md:pt-16 relative'>

        <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold font1 tracking-wide pr-2 lg:pr-0'>
          {stData.title}
        </h1>

        <p className='text-gray-400 font3 mt-4 leading-relaxed text-sm md:text-[15px] lg:pr-10'>
          {stData.description}
        </p>


        {/* Favourite Buttons */}

        <div className="mt-6 flex lg:absolute lg:top-10 lg:right-20 lg:mt-0">

          {stData.favourite === false ? (

            <button
              onClick={() => handleAddFavourite(id)}
              className="border flex items-center justify-center gap-3 border-[cyan] text-[12px] sm:text-[13px] text-[cyan] hover:bg-[cyan] bg-[cyan]/8 px-4 py-3 font3 font-semibold hover:text-black transition-all duration-100"
            >

              Add To Favourites

              <FaHeart size={18} />

            </button>

          ) : (

            <button
              onClick={() => handleRemoveFavourite(id)}
              className="border flex items-center justify-center gap-3 border-[cyan] text-[12px] sm:text-[13px] text-[cyan] hover:bg-[cyan] bg-[cyan]/8 px-4 py-3 font3 font-semibold hover:text-black transition-all duration-100"
            >

              Remove from Favourites

              <FaHeart size={18} />

            </button>

          )}

        </div>

      </div>


      {/* ===================================== */}
      {/* VIDEOS SECTION */}
      {/* ===================================== */}

      <div className="videos w-full mt-8 flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-row lg:flex-wrap lg:justify-between gap-5 lg:gap-6 px-5 sm:px-8 md:px-12 lg:px-20">

        {stData?.videos && stData.videos.length > 0 ? (

          stData.videos.map((item, index) => (

            <div
              key={index}
              className="box h-52 sm:h-56 lg:h-50 w-full lg:w-75 relative overflow-hidden"
            >

              <video
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
              >

                <source
                  src={`http://localhost:5000/uploads/videos/${item.video}`}
                  type="video/mp4"
                />

              </video>

              <div className="overlay w-full h-full bg-black/20 bg-linear-0 from-black/50 via-black/0 to-black/0 absolute top-0 right-0 pointer-events-none">
              </div>

            </div>

          ))

        ) : (

          <p className="text-gray-400 font3 text-sm">
            No videos available for this technique.
          </p>

        )}

      </div>


      {/* ===================================== */}
      {/* SHOW MORE RESULTS */}
      {/* ===================================== */}

      <div className='w-full mt-8 lg:mt-14 relative px-5 sm:px-8 md:px-12 lg:px-20'>

        <Link to={'/shot-more-results'}>

          <button className="flex gap-2 text-[#aaaaaa] hover:text-[cyan] font3 font-medium text-sm transition-all duration-200 lg:absolute lg:right-20 cursor-pointer">

            Show more results

            <MoveRight size={18} className='mt-[1.5px]' />

          </button>

        </Link>

      </div>


      {/* ===================================== */}
      {/* WHY IT'S USED */}
      {/* ===================================== */}

      <div className='w-full mt-16 lg:mt-13 px-5 sm:px-8 md:px-12 lg:px-20 pb-8'>

        <div className="left flex flex-col gap-3 sm:gap-5">

          <h1 className='font3 font-medium text-2xl sm:text-3xl md:text-4xl text-[#e3e3e3]'>
            Why It's Used ?
          </h1>

          <p className='text-[#99a1af] mt-1 sm:mt-3 text-sm sm:text-[15px] font3 leading-relaxed text-justify'>
            {stData.whyItUsed}
          </p>

        </div>

      </div>


      {/* ===================================== */}
      {/* WHEN TO USE */}
      {/* ===================================== */}

      <div className='w-full mt-8 lg:mt-10 px-5 sm:px-8 md:px-12 lg:px-20 pb-8'>

        <h1 className='font3 font-medium text-2xl sm:text-3xl md:text-4xl text-[#e3e3e3]'>
          When to Use ?
        </h1>

        <p className='text-[#99a1af] mt-3 text-sm sm:text-[15px] font3 leading-relaxed text-justify'>
          Use this technique whenever you want the audience to experience the moment more deeply and intuitively:
        </p>


        {/* Usage Cards */}

        {stData?.whenToUse && stData.whenToUse.length > 0 ? (

          <ul className='mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 justify-center'>

            {stData.whenToUse.map((item, i) => (

              <li
                key={i}
                className='flex flex-col gap-1 border border-[#555] bg-slate-500/10 min-h-[200px] lg:h-68 p-5 sm:p-6'
              >

                <div className='flex gap-3 font3 text-[#dcdcdc] text-xl sm:text-[25px]'>

                  {item.stUseTitle}

                </div>

                <p className='font3 text-[13px] sm:text-[14px] text-[#a5a5a5] mt-3 sm:mt-4 leading-relaxed'>

                  {item.stUseAbout}

                </p>

              </li>

            ))}

          </ul>

        ) : (

          <p className="text-gray-400 font3 text-sm mt-4">
            No usage examples added for this technique.
          </p>

        )}

      </div>


      {/* ===================================== */}
      {/* EMOTIONAL IMPACT AND TECHNICAL SETUP */}
      {/* ===================================== */}

      <div className='flex flex-col lg:flex-row mt-8 lg:mt-10 pb-16 lg:pb-20 gap-10 lg:gap-6 px-5 sm:px-8 md:px-12 lg:px-20'>


        {/* Emotional Impact */}

        <div className='w-full lg:w-1/2 px-0 lg:px-10'>

          <h1 className='font3 font-medium text-2xl sm:text-3xl md:text-4xl text-[#e3e3e3]'>
            Emotional Impact
          </h1>

          <p className='text-[#99a1af] mt-3 text-sm sm:text-[15px] font3 leading-relaxed text-justify'>
            These are the emotional effects commonly created using this technique:
          </p>


          <ul className='mt-8 flex flex-col gap-4'>

            {stData?.emotionalImpact && stData.emotionalImpact.length > 0 ? (

              stData.emotionalImpact.map((item, i) => (

                <li
                  key={i}
                  className='grid grid-cols-[2rem_1fr] gap-3 font3 text-[#ccc] text-sm sm:text-[16px] leading-relaxed'
                >

                  <span>
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span>
                    {item}
                  </span>

                </li>

              ))

            ) : (

              <p className='text-gray-400 font3 text-sm mt-2'>
                No emotional impacts added for this technique.
              </p>

            )}

          </ul>

        </div>


        {/* Technical Setup */}

        <div className='w-full lg:w-1/2 px-0 lg:px-10'>

          <h1 className='font3 font-medium text-2xl sm:text-3xl md:text-4xl text-[#e3e3e3]'>
            Technical Setup
          </h1>

          <p className='text-[#99a1af] mt-3 text-sm sm:text-[15px] font3 leading-relaxed text-justify'>
            To achieve this technique, you typically need:
          </p>


          <ul className='mt-8 flex flex-col gap-4'>

            {stData?.technicalSetup && stData.technicalSetup.length > 0 ? (

              stData.technicalSetup.map((item, i) => (

                <li
                  key={i}
                  className='grid grid-cols-[2rem_1fr] gap-3 font3 text-[#ccc] text-sm sm:text-[16px] leading-relaxed'
                >

                  <span>
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span>
                    {item}
                  </span>

                </li>

              ))

            ) : (

              <p className='text-gray-400 font3 text-sm mt-2'>
                No technical setup details added for this technique.
              </p>

            )}

          </ul>

        </div>

      </div>


      {/* ===================================== */}
      {/* PREMIUM SECTION */}
      {/* ===================================== */}

      <div className='px-5 sm:px-8 md:px-12 lg:px-20 pb-16 lg:pb-20'>

        <div className='border border-gray-700 bg-[#0e0e0e] w-full p-5 sm:p-7 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6'>

          <div>

            <h2 className='text-lg sm:text-xl font-semibold'>
              Want to Add Your Own Shot Types?
            </h2>

            <p className='text-gray-400 text-sm mt-2 leading-relaxed max-w-2xl'>
              Get premium access to contribute new shots, edit details, and save your favorites.
            </p>

          </div>


          <Link to={'/subscription'} className="w-full md:w-auto">

            <button className="border w-full md:w-auto flex items-center justify-center gap-3 border-[cyan] text-[13px] sm:text-[15px] hover:bg-[cyan] bg-[cyan]/5 text-[cyan] px-6 py-3 font3 uppercase font-semibold hover:text-[#000000b8] transition-all duration-100">

              Upgrade Now

              <MoveRight size={23} />

            </button>

          </Link>

        </div>

      </div>


    </div>

  )

}

export default STResults
