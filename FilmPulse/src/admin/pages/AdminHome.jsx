import React, { useContext, useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import { getApprovedCMAPI, getApprovedSTAPI, getCameraMovementAPI, getRejectedCMAPI, getRejectedSTAPI, getShotTypeAPI, getsubmittedCMAPI, getsubmittedSTAPI, getUserListAPI } from '../../services/allAPIs';
import { searchContext } from '../../contextShareAPI/ContextShare';
import { Clapperboard, FileVideoCamera, Focus, Podcast, Users } from 'lucide-react';

function AdminHome() {

  const [admin, setAdmin] = useState([])
  const loggedAdmin = JSON.parse(sessionStorage.getItem('userDetails'))
  // console.log(loggedAdmin);

  useEffect(() => {
    setAdmin(loggedAdmin)
  }, [])


  //Get Users
  const [token, setToken] = useState("")
  const [userList, setUserList] = useState([])

  const getAllUsers = async () => {
    const updatedToken = token.replace(/"/g, "")
    const reqHeader = {
      Authorization: `Bearer ${updatedToken}`
    }
    try {
      const response = await getUserListAPI(reqHeader)
      // console.log(response.data);
      setUserList(response.data.data)

    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setToken(sessionStorage.getItem('token'))
    if (token) {
      getAllUsers(token)
    }
  }, [token])

  //Get Techniques
  const [movements, setMovements] = useState([])
  const [shotTypes, setShotType] = useState([])
  const { searchKey, setSearchKey } = useContext(searchContext)

  const getCameraMovements = async (searchKey, token) => {
    const updatedToken = token.replace(/"/g, "")
    const reqHeader = {
      Authorization: `Bearer ${updatedToken}`
    }
    // console.log(reqHeader);

    try {
      const response = await getCameraMovementAPI(searchKey, reqHeader)
      // console.log(response.data);
      setMovements(response.data)

    }

    catch (error) {
      console.log("Error:" + error);
    }
  }
  const getShotTypes = async (searchKey, token) => {
    const updatedToken = token.replace(/"/g, "")
    const reqHeader = {
      Authorization: `Bearer ${updatedToken}`
    }
    // console.log(reqHeader);

    try {
      const response = await getShotTypeAPI(searchKey, reqHeader)
      // console.log(response.data);
      setShotType(response.data)

    }

    catch (error) {
      console.log("Error:" + error);
    }
  }


  useEffect(() => {
    setToken(sessionStorage.getItem('token'))
    if (token) {
      getCameraMovements(searchKey, token)
      getShotTypes(searchKey, token)
    }
  }, [token])




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
      // console.log(response);
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
      // console.log(response);
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
      // console.log(response);
      setrejectedCM(response.data)
    }

    catch (error) {
      console.log("Error", error);
    }
  }
  useEffect(() => {
    setToken(sessionStorage.getItem('token'))
    if (token) {
      getSubmittedCM(token)
      getApprovedCM(token)
      getRejectedCM(token)
    }
  }, [token])



  const [submittedST, setSubmittedST] = useState([])
  const [approvedST, setApprovedST] = useState([])
  const [rejectedST, setrejectedST] = useState([])


  //Pending ST
  const getSubmittedST = async () => {
    const updatedToken = token.replace(/"/g, "")
    const reqHeader = {
      Authorization: `Bearer ${updatedToken}`
    }
    try {
      const response = await getsubmittedSTAPI(reqHeader)
      console.log(response);
      setSubmittedST(response.data)
    }

    catch (error) {
      console.log("Error", error);
    }
  }

  //Approved ST
  const getApprovedST = async () => {
    const updatedToken = token.replace(/"/g, "")
    const reqHeader = {
      Authorization: `Bearer ${updatedToken}`
    }
    try {
      const response = await getApprovedSTAPI(reqHeader)
      console.log(response);
      setApprovedST(response.data)
    }

    catch (error) {
      console.log("Error", error);
    }
  }

  //Rejected ST
  const getRejectedST = async () => {
    const updatedToken = token.replace(/"/g, "")
    const reqHeader = {
      Authorization: `Bearer ${updatedToken}`
    }
    try {
      const response = await getRejectedSTAPI(reqHeader)
      console.log(response);
      setrejectedST(response.data)
    }

    catch (error) {
      console.log("Error", error);
    }
  }
  useEffect(() => {
    setToken(sessionStorage.getItem('token'))
    if (token) {
      getSubmittedST(token)
      getApprovedST(token)
      getRejectedST(token)
    }
  }, [token])




  return (
    <div className='bg-black text-white min-h-screen w-full z-200 relative'>
      <AdminHeader />
      <div className=' w-full pt-30'>
        <h1 className='text-[50px] font0 mt-5 ml-10 capitalize'>Hello {admin.username}!</h1>
        <p className='text-[18px] font-0 ml-10 text-white/55'>
          You're viewing the complete performance insights of<span className='text-cyan-400'> FILMPULSE</span>
        </p>

        <div className="div w-full mt-10 px-10 flex justify-between">
          <div className="box w-70 h-30 bg-[cyan]/10 overflow-hidden border-2 border-[cyan] relative">
            <div className="head flex items-center px-5 relative mt-4">
              <div className="icon h-12 w-12 bg-[cyan] rounded-full flex items-center justify-center">
                <Users strokeWidth={1.8} size={28} className='text-black  ' />
              </div>
              <h1 className='text-4xl font-semibold font3 ml-4 text-white '>{userList.length}</h1>
            </div>
            <h1 className='text-[18px] font3 text-[white] absolute left-5 bottom-4'>Total Users</h1>
          </div>

          <div className="box w-70 h-30 bg-[cyan]/10 overflow-hidden border-2 border-[cyan] relative">
            <div className="head flex items-center px-5 relative mt-4">
              <div className="icon h-12 w-12 bg-[cyan] rounded-full flex items-center justify-center">
                <Podcast strokeWidth={1.8} size={28} className='text-black  ' />
              </div>
              <h1 className='text-4xl font-semibold font3 ml-4 text-white '>{userList.filter(user => user.subscriber === true).length}</h1>
            </div>
            <h1 className='text-[18px] font3 text-[white] absolute left-5 bottom-4'>Total Subscribers</h1>
          </div>

          <div className="box w-70 h-30 bg-[cyan]/10 overflow-hidden border-2 border-[cyan] relative">
            <div className="head flex items-center px-5 relative mt-4">
              <div className="icon h-12 w-12 bg-[cyan] rounded-full flex items-center justify-center">
                <Clapperboard strokeWidth={1.8} size={28} className='text-black  ' />
              </div>
              <h1 className='text-4xl font-semibold font3 ml-4 text-white'>{(shotTypes?.length || 0) + (movements?.length || 0)}</h1>
            </div>
            <h1 className='text-[18px] font3 text-[white] absolute left-5 bottom-4'>Total Techniques</h1>
          </div>

          <div className="box w-70 h-30 bg-[cyan]/10 overflow-hidden border-2 border-[cyan] relative">
            <div className="head flex items-center px-5 relative mt-4">
              <div className="icon h-12 w-12 bg-[cyan] rounded-full flex items-center justify-center">
                <Focus strokeWidth={1.8} size={28} className='text-black  ' />
              </div>
              <h1 className='text-4xl font-semibold font3 ml-4 text-white '> {(shotTypes?.length || 0)}</h1>
            </div>
            <h1 className='text-[18px] font3 text-[white] absolute left-5 bottom-4'>Shot Types</h1>
          </div>

          <div className="box w-70 h-30 bg-[cyan]/10 overflow-hidden border-2 border-[cyan] relative">
            <div className="head flex items-center px-5 relative mt-4">
              <div className="icon h-12 w-12 bg-[cyan] rounded-full flex items-center justify-center">
                <FileVideoCamera strokeWidth={1.8} size={28} className='text-black  ' />
              </div>
              <h1 className='text-4xl font-semibold font3 ml-4 text-white '> {(movements?.length || 0)}</h1>
            </div>
            <h1 className='text-[18px] font3 text-[white] absolute left-5 bottom-4'>Camera Movements</h1>
          </div>
        </div>
      </div>

      <div className="w-full px-10 py-20">
        <div className="overflow-x-auto rounded-xl border border-cyan-400/30 bg-black">
          <table className="w-full font3 text-[14px] text-white">

            {/* TABLE HEAD */}
            <thead className="bg-cyan-400/10 sticky top-0 z-10">
              <tr className="text-left text-cyan-300">
                <th className="px-6 py-4 font-medium">Technique</th>
                <th className="px-6 py-4 font-medium">Short Description</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium text-center">Status</th>
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody className="divide-y divide-cyan-400/10">

              {[...submittedCM, ...approvedCM, ...rejectedCM].map((item, index) => (
                <tr key={index} className="hover:bg-cyan-400/5 transition duration-200">
                  <td className="px-6 py-4 font-medium">{item.title}</td>
                  <td className="px-6 py-4 text-white/70 leading-relaxed">{item.shortDescription}</td>
                  <td className="px-6 py-4 text-cyan-300">Camera Movement</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.status === 'approved' ? 'bg-green-500/15 text-green-400' : item.status === 'rejected' ? 'bg-red-500/15 text-red-400' : 'bg-yellow-500/15 text-yellow-400'}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}

              {[...submittedST, ...approvedST, ...rejectedST].map((item, index) => (
                <tr key={`st-${index}`} className="hover:bg-cyan-400/5 transition duration-200">
                  <td className="px-6 py-4 font-medium">{item.title}</td>
                  <td className="px-6 py-4 text-white/70 leading-relaxed">{item.shortDescription}</td>
                  <td className="px-6 py-4 text-cyan-300">Shot Type</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.status === 'approved' ? 'bg-green-500/15 text-green-400' : item.status === 'rejected' ? 'bg-red-500/15 text-red-400' : 'bg-yellow-500/15 text-yellow-400'}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

export default AdminHome
