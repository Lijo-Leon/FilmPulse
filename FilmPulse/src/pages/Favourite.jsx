import React, { useEffect, useState } from 'react'
import { getFavCMAPI, getFavSTAPI, removefromFavCMAPI, removefromFavSTAPI } from '../services/allAPIs'
import { Link, useParams } from 'react-router-dom'
import { FaHeart } from 'react-icons/fa6'

function Favourite() {
  const [token, setToken] = useState('')
  const [favouriteCM, setFavouriteCM] = useState([])
  const [favouriteST, setFavouriteST] = useState([])
  // const { id } = useParams()

  const getFavouriteCM = async (req, res) => {
    const updatedToken = token.replace(/"/g, "")
    const reqHeader = {
      Authorization: `Bearer ${updatedToken}`
    }
    console.log(reqHeader);
    try {
      const response = await getFavCMAPI(reqHeader)
      console.log(response);
      setFavouriteCM(response.data)

    } catch (error) {
      console.log("Error", error);
    }
  }

  const getFavouriteST = async (req, res) => {
    const updatedToken = token.replace(/"/g, "")
    const reqHeader = {
      Authorization: `Bearer ${updatedToken}`
    }
    console.log(reqHeader);
    try {
      const response = await getFavSTAPI(reqHeader)
      console.log(response);
      setFavouriteST(response.data)

    } catch (error) {
      console.log("Error", error);
    }
  }


  const handleRemoveFavouriteCM = async (id) => {
    const updatedToken = token.replace(/"/g, "")
    const reqHeader = {
      Authorization: `Bearer ${updatedToken}`
    }
    try {
      const response = await removefromFavCMAPI(id, reqHeader)
      console.log(response);
      setFavouriteCM(prev =>
        prev.filter(item => item._id !== id)
      )
      console.log(favouriteCM);
      alert('Successfully removed from Favourite')

    }
    catch (error) {
      console.log("Error", error);
    }
  }

  const handleRemoveFavouriteST = async (id) => {
    const updatedToken = token.replace(/"/g, "")
    const reqHeader = {
      Authorization: `Bearer ${updatedToken}`
    }
    try {
      const response = await removefromFavSTAPI(id, reqHeader)
      console.log(response);
      setFavouriteST(prev =>
        prev.filter(item => item._id !== id)
      )
      console.log(favouriteST);
      alert('Successfully removed from Favourite')

    }
    catch (error) {
      console.log("Error", error);
    }
  }

  useEffect(() => {
    setToken(sessionStorage.getItem('token'))
    if (token) {
      getFavouriteCM(token)
      getFavouriteST(token)
    }
  }, [token])


  return (
    <div className='bg-black min-h-screen text-white px-10'>
      {favouriteCM.length === 0 && favouriteST.length === 0
        ? (<h2 className="text-[200px] font-semibold font1 uppercase text-center h-screen flex items-center justify-center text-white/20 leading-45 tracking-wide " style={{wordSpacing:'8px'}}>Nothing added <br /> in the Favourites</h2>)
        :
        (
          <div className='md:pt-30 pt-33'>
            <h1 className='lg:text-[100px] md:text-[70px] text-[50px] uppercase font1 md:text-left text-center'>Favourites</h1>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 w-full gap-3 pb-15">
              {
                favouriteCM?.map((item) => (
                  <div className=" h-60 bg-amber-50 relative">
                    <Link to={`/cmresults/${item._id}`}>
                      <video autoPlay muted loop className="h-full w-full object-cover">
                        <source
                          src={`http://localhost:5000/uploads/videos/${item.videos[0].video}`}
                          type="video/mp4"
                        />
                      </video>
                      <div className="overlay w-full h-full bg-black/20 bg-linear-0 from-black via-black/0 to-black/0 absolute top-0 right-0">
                        <h1 className='absolute bottom-2 left-3 font1 text-[30px]'>{item.title}</h1>
                      </div>
                    </Link>
                    <button type='button' onClick={() => { handleRemoveFavouriteCM(item._id) }} className='absolute right-3 top-3 cursor-pointer rounded-full border h-10 w-20 flex items-center justify-center backdrop-blur-2xl bg-[#00ffff25] font3 font-semibold text-[12px] border-[cyan]'>
                      <h1 className=' text-[cyan] z-5 '>REMOVE</h1>
                    </button>
                  </div>
                ))
              }
              {
                favouriteST?.map((item) => (
                  <div className=" h-60 bg-amber-50 relative">
                    <Link to={`/stresults/${item._id}`}>
                      <video autoPlay muted loop className="h-full w-full object-cover">
                        <source
                          src={`http://localhost:5000/uploads/videos/${item.videos[0].video}`}
                          type="video/mp4"
                        />
                      </video>
                      <div className="overlay w-full h-full bg-black/20 bg-linear-0 from-black via-black/0 to-black/0 absolute top-0 right-0">
                        <h1 className='absolute bottom-2 left-3 font1 text-[30px]'>{item.title}</h1>
                      </div>
                    </Link>
                    <button type='button' onClick={() => { handleRemoveFavouriteST(item._id) }} className='absolute right-3 top-3 cursor-pointer rounded-full border h-10 w-20 flex items-center justify-center backdrop-blur-2xl bg-[#00ffff25] font3 font-semibold text-[12px] border-[cyan]'>
                      <h1 className=' text-[cyan] z-5 '>REMOVE</h1>
                    </button>
                  </div>
                ))
              }
            </div>
          </div>
        )
      }


    </div>
  )
}

export default Favourite
