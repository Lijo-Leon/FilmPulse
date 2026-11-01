import React, { useContext, useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import { getCameraMovementAPI, getShotTypeAPI } from '../../services/allAPIs'
import { searchContext } from '../../contextShareAPI/ContextShare'

function AdminTechniques() {

  const [token, setToken] = useState('')
  const [movements, setMovements] = useState([])
  const [shotTypes, setShotType] = useState([])
  const { searchKey, setSearchKey } = useContext(searchContext)

  const getCameraMovements = async (searchKey,token) => {
    const updatedToken = token.replace(/"/g, "")
    const reqHeader = {
      Authorization: `Bearer ${updatedToken}`
    }
    console.log(reqHeader);

    try {
      const response = await getCameraMovementAPI(searchKey,reqHeader)
      console.log(response.data);
      setMovements(response.data)

    }

    catch (error) {
      console.log("Error:" + error);
    }
  }


  const getShotTypes = async (searchKey,token) => {
    const updatedToken = token.replace(/"/g, "")
    const reqHeader = {
      Authorization: `Bearer ${updatedToken}`
    }
    console.log(reqHeader);

    try {
      const response = await getShotTypeAPI(searchKey,reqHeader)
      console.log(response.data);
      setShotType(response.data)

    }

    catch (error) {
      console.log("Error:" + error);
    }
  }


  useEffect(() => {
    setToken(sessionStorage.getItem('token'))
    if (token) {
      getCameraMovements(searchKey,token)
      getShotTypes(searchKey,token)
    }
  }, [token])


  return (
    <div className='bg-black text-amber-50 min-h-screen w-full z-200 relative'>
      <AdminHeader />

      <div className="flex flex-row">
        <div className='bg-black pt-30 px-10'>
          <h1 className='flex gap-6 text-[80px] font-semibold font1 tracking-wide' style={{ wordSpacing: '8px' }}>All Techniques</h1>
          <div className='mt-4 grid grid-cols-5 gap-y-4 gap-x-8 pb-8'>

            {
              movements?.map((movement) => (
                <div className="card h-60 w-65" >
                  <video autoPlay muted loop className=''>
                    <source src={`http://localhost:5000/uploads/videos/${movement.videos[0].video}`} type="video/mp4" />
                  </video>
                  <h1 className='text-[22px] font1 tracking-wide text-[#ccc] mt-1'>{movement.title}</h1>
                </div>
              ))
            }
            {
              shotTypes?.map((shottype) => (
                <div className="card h-60 w-65" >
                  <video autoPlay muted loop className=''>
                    <source src={`http://localhost:5000/uploads/videos/${shottype.videos[0].video}`} type="video/mp4" />
                  </video>
                  <h1 className='text-[22px] font1 tracking-wide text-[#ccc] mt-1'>{shottype.title}</h1>
                </div>
              ))
            }

          </div>


        </div>
      </div>
    </div>
  )
}

export default AdminTechniques
