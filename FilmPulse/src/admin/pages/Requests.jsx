import React, { useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import { acceptRequestCMAPI, acceptRequestSTAPI, getPendingCMListAPI, getPendingSTListAPI, rejectRequestCMAPI, rejectRequestSTAPI } from '../../services/allAPIs'
import { Link } from 'react-router-dom'
import { MoveRight } from 'lucide-react'

function Requests() {

    const [token, setToken] = useState("")
    const [cmrequests, setCMRequests] = useState([])
    const [strequests, setSTRequests] = useState([])

    const getPendingCMList = async (token) => {
        const updatedToken = token.replace(/"/g, "")
        const reqHeader = {
            Authorization: `Bearer ${updatedToken}`
        }
        try {
            const response = await getPendingCMListAPI(reqHeader)
            console.log(response.data);
            setCMRequests(response.data)
        }
        catch (error) {
            console.log(error);
        }
    }

    const getPendingSTList = async (token) => {
        const updatedToken = token.replace(/"/g, "")
        const reqHeader = {
            Authorization: `Bearer ${updatedToken}`
        }
        try {
            const response = await getPendingSTListAPI(reqHeader)
            console.log(response.data);
            setSTRequests(response.data)
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleAcceptCMReq = async (id) => {
        const token = sessionStorage.getItem("token");
        const updatedToken = token.replace(/"/g, "");
        const reqHeader = {
            Authorization: `Bearer ${updatedToken}`,
        };

        try {
            const response = await acceptRequestCMAPI(id, reqHeader)
            console.log(response);
            alert("Request Approved")
            setCMRequests(prev => prev.filter(item => item._id !== id));
        }

        catch (error) {
            console.log(error);
        }
    }
    const handleAcceptSTReq = async (id) => {
        const token = sessionStorage.getItem("token");
        const updatedToken = token.replace(/"/g, "");
        const reqHeader = {
            Authorization: `Bearer ${updatedToken}`,
        };

        try {
            const response = await acceptRequestSTAPI(id, reqHeader)
            console.log(response);
            alert("Request Approved")
            setSTRequests(prev => prev.filter(item => item._id !== id));
        }

        catch (error) {
            console.log(error);
        }
    }

    const handleRejectCMReq = async (id) => {
        const token = sessionStorage.getItem("token");
        const updatedToken = token.replace(/"/g, "");
        const reqHeader = {
            Authorization: `Bearer ${updatedToken}`,
        };

        try {
            const response = await rejectRequestCMAPI(id, reqHeader)
            console.log(response);
            alert("Request Rejected")
            setCMRequests(prev => prev.filter(item => item._id !== id));
        }

        catch (error) {
            console.log(error);
        }
    }

    const handleRejectSTReq = async (id) => {
        const token = sessionStorage.getItem("token");
        const updatedToken = token.replace(/"/g, "");
        const reqHeader = {
            Authorization: `Bearer ${updatedToken}`,
        };

        try {
            const response = await rejectRequestSTAPI(id, reqHeader)
            console.log(response);
            alert("Request Rejected")
            setSTRequests(prev => prev.filter(item => item._id !== id));
        }

        catch (error) {
            console.log(error);
        }
    }





    useEffect(() => {
        setToken(sessionStorage.getItem('token'))
        if (token) {
            getPendingCMList(token)
            getPendingSTList(token)
        }
    }, [token])

    return (
        <div className='bg-black text-amber-50 min-h-screen w-full z-200 relative'>
            <AdminHeader />


            <div className='bg-black pt-30 px-10'>
                <h1 className='flex gap-6 text-[80px] font-semibold font1 tracking-wide' style={{ wordSpacing: '8px' }}>Pending Requests</h1>
                <div className=' w-full grid grid-cols-2 gap-4'>

                    {
                        cmrequests.length === 0 && strequests.length === 0 && (
                            <p className='text-[180px] tracking-wide font-semibold font1 text-center w-[1450px] bg-[cyan]/20 text-[#ccc] mt-15'>No Pending Requests!</p>
                        )
                    }
                    {
                        cmrequests.map(item => (
                            <div className="item border border-[#555] h-50 flex relative">
                                <div className="left w-[50%] mt-4 ml-4">
                                    <h1 className='text-2xl font-semibold text-white/90 font3 uppercase'>{item.title}</h1>
                                    <p className='text-white/60 mt-5 text-[13px] font3'>{item.shortDescription}</p>
                                    <div className='flex gap-6 mt-5'>
                                        <button onClick={() => handleAcceptCMReq(item._id)} className='border-2 border-[cyan] px-6 py-2 font6 text-[cyan] hover:text-black hover:bg-[cyan] font-semibold text-[12px]'>ACCEPT</button>
                                        <button onClick={() => handleRejectCMReq(item._id)} className='border-2 border-[#bf0000] px-6 py-2 font6 text-white bg-[#bf000034] hover:text-white hover:bg-[#bf0000] font-semibold text-[12px]'>REJECT</button>
                                    </div>
                                </div>

                                <div className="right h-full w-[50%] absolute right-0 p-2 flex justify-end">
                                    <div className="overlay w-full h-full bg-black/20 bg-linear-0 from-black via-black/0 to-black/0 absolute top-0 right-0">
                                    </div>
                                    <video autoPlay muted loop className='h-full'>
                                        <source src={`http://localhost:5000/uploads/videos/${item.videos[0].video}`} type="video/mp4" />
                                    </video>
                                </div>
                            </div>
                        ))
                    }
                    {
                        strequests.map(item => (
                            <div className="item border border-[#555] h-50 flex relative">
                                <div className="left w-[50%] mt-4 ml-4">
                                    <h1 className='text-2xl font-semibold text-white/90 font3 uppercase'>{item.title}</h1>
                                    <p className='text-white/60 mt-5 text-[13px] font3'>{item.shortDescription}</p>
                                    <div className='flex gap-6 mt-5'>
                                        <button onClick={() => handleAcceptSTReq(item._id)} className='border-2 border-[cyan] px-6 py-2 font6 text-[cyan] hover:text-black hover:bg-[cyan] font-semibold text-[12px]'>ACCEPT</button>
                                        <button onClick={() => handleRejectSTReq(item._id)} className='border-2 border-[#bf0000] px-6 py-2 font6 text-white bg-[#bf000034] hover:text-white hover:bg-[#bf0000] font-semibold text-[12px]'>REJECT</button>
                                    </div>
                                </div>

                                <div className="right h-full w-[50%] absolute right-0 p-2 flex justify-end">
                                    <div className="overlay w-full h-full bg-black/20 bg-linear-0 from-black via-black/0 to-black/0 absolute top-0 right-0">
                                    </div>
                                    <video autoPlay muted loop className='h-full'>
                                        <source src={`http://localhost:5000/uploads/videos/${item.videos[0].video}`} type="video/mp4" />
                                    </video>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

        </div>
    )
}

export default Requests
