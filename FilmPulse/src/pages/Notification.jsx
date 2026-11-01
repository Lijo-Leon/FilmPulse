import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { getApprovedCMAPI, getRejectedCMAPI, getsubmittedCMAPI } from '../services/allAPIs'
import { Link } from 'react-router-dom'
import { FaRegClock } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import { CheckCircle, XCircle, Clock, Bell } from 'lucide-react';

function Notification() {
  const [token, setToken] = useState('')
  const [submittedCM, setSubmittedCM] = useState([])
  const [approvedCM, setApprovedCM] = useState([])
  const [rejectedCM, setrejectedCM] = useState([])


  //Pending CM
  const getSubmittedCM = async () => {
    const updatedToken = token.replace(/"/g, "")
    const reqHeader = {
      Authorization: `Bearer ${updatedToken}`
    }
    try {
      const response = await getsubmittedCMAPI(reqHeader)
      console.log(response);
      setSubmittedCM(response.data)
    }

    catch (error) {
      console.log("Error", error);
    }
  }

  //Approved CM
  const getApprovedCM = async () => {
    const updatedToken = token.replace(/"/g, "")
    const reqHeader = {
      Authorization: `Bearer ${updatedToken}`
    }
    try {
      const response = await getApprovedCMAPI(reqHeader)
      console.log(response);
      setApprovedCM(response.data)
    }

    catch (error) {
      console.log("Error", error);
    }
  }

  //Rejected CM
  const getRejectedCM = async () => {
    const updatedToken = token.replace(/"/g, "")
    const reqHeader = {
      Authorization: `Bearer ${updatedToken}`
    }
    try {
      const response = await getRejectedCMAPI(reqHeader)
      console.log(response);
      setrejectedCM(response.data)
    }

    catch (error) {
      console.log("Error", error);
    }
  }



  const notifications = [...submittedCM.map(item => ({ ...item, type: "submitted" })),
  ...approvedCM.map(item => ({ ...item, type: "approved" })),
  ...rejectedCM.map(item => ({ ...item, type: "rejected" }))]
    .sort((a, b) => b._id.localeCompare(a._id))



  useEffect(() => {
    setToken(sessionStorage.getItem('token'))
    if (token) {
      getSubmittedCM(token)
      getApprovedCM(token)
      getRejectedCM(token)
    }
  }, [token])
  return (
    <div className='bg-black min-h-screen text-white'>
      {
        submittedCM?.length === 0 && approvedCM?.length === 0 && rejectedCM?.length === 0
          ? (<h2 className="text-[200px] font-semibold font1 uppercase text-center h-screen flex items-center justify-center text-white/20 leading-45 tracking-wide " style={{ wordSpacing: '8px' }}>No <br /> NOTIFICATION</h2>)
          : (
            <div className='pt-35'>
              <h1 className='md:text-[70px] px-10 text-[white]/90 uppercase font1 font-bold tracking-wider'>NOTIFICATIONS</h1>
              <div className='w-full flex flex-col lg:px-30 md:px-10 px-5 mt-7 pb-15 gap-4'>
                {
                  notifications.map(item => {

                    if (item.type === "submitted") {
                      return (
                        <div
                          key={item._id}
                          className='w-full h-25 lg:px-10 md:px-6  px-3 text-white/70 font3 flex items-center md:gap-8 gap-3 border-2 border-[cyan]/40 rounded-[9px]'
                        >
                          <Clock strokeWidth={1} className='md:h-13 md:w-13 w-20 h-auto md:p-2 p-1 rounded-full bg-[cyan]/20 text-[cyan]/80' />
                          <p className='lg:text-[15px] md:text-[13px] text-[12px] text-white/80'>
                            You have successfully submitted your technique titled{" "}
                            <b className='italic'>"{item.title}"</b> and it is currently under review.
                          </p>
                        </div>
                      )
                    }

                    if (item.type === "rejected") {
                      return (
                        <div
                          key={item._id}
                          className='w-full h-25 lg:px-10 md:px-6  px-3 text-white/70 font3 flex items-center md:gap-8 gap-3 border-2 border-[cyan]/40 rounded-[9px]'
                        >
                          <XCircle strokeWidth={1} className='md:h-13 md:w-13 w-13 h-auto md:p-2 p-1 rounded-full bg-[red]/20 text-[red]/50' />
                          <p className='lg:text-[15px] md:text-[13px] text-[12px] text-white/80'>
                            Your submission titled{" "}
                            <b className='italic'>"{item.title}"</b> has been rejected.
                          </p>
                        </div>
                      )
                    }

                    if (item.type === "approved") {
                      return (
                        <div
                          key={item._id}
                          className='w-full lg:h-25 h-40 lg:px-10 md:px-6 px-3 text-white/70 font3 flex items-center md:gap-8 gap-3 border-2 border-[cyan]/40 rounded-[9px] relative'
                        >
                          <CheckCircle strokeWidth={1} className='md:h-13 md:w-13 w-23 h-auto md:p-2 p-1.5 rounded-full bg-[#08e7083a] text-[#5eb05e]' />
                          <p className='lg:text-[15px] md:text-[13px] text-[12px] text-white/80'>
                            This technique titled{" "}
                            <b className='italic'>"{item.title}"</b> has been approved and is now live on this platform.
                          </p>

                          <Link to={`/cmresults/${item._id}`} className='absolute lg:right-10 right-3 bottom-3 lg:bottom-auto text-[14px] text-green-400 hover:text-green-600 transition-all'>
                            Get a look →
                          </Link>
                        </div>
                      )
                    }

                    return null
                  })
                }
              </div>
            </div>
          )

      }
    </div>
  )
}

export default Notification
