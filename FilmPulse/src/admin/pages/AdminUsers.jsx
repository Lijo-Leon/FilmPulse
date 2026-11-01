import React from 'react'
import AdminHeader from '../components/AdminHeader'
import { useState } from 'react'
import { useEffect } from 'react'
import { getUserListAPI } from '../../services/allAPIs'

function AdminUsers() {

    const [token, setToken] = useState("")
    const [userList, setUserList] = useState([])

    const getAllUsers = async () => {
        const updatedToken = token.replace(/"/g, "")
        const reqHeader = {
            Authorization: `Bearer ${updatedToken}`
        }
        try {
            const response = await getUserListAPI(reqHeader)
            console.log(response.data);
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

    return (
        <div className='bg-black text-amber-50 min-h-screen w-full z-200 relative'>
            <AdminHeader />


            <div className='bg-black pt-40 px-10'>
                <h1 className='flex gap-6 text-[80px] font-semibold font1 tracking-wide' style={{ wordSpacing: '8px' }}><span className='text-[cyan]'>FILM PULSE</span>USERS LIST</h1>
                <div className='mt-4 grid grid-cols-4 gap-y-9 gap-x-8 pb-8'>
                    {
                        userList?.length > 0 ?
                            userList?.map((item, i) => (
                                <div key={i} className="card bg-linear-70 from-[#2427278e] to-[#242727cb] text-white w-85 font3 px-4 py-5 flex flex-col gap-4 border border-cyan-300/20 relative">
                                    <h1 className='text-[14px] bg-[cyan]/20 text-[#ccc] py-2 px-2 w-40 text-center rounded-full tracking-wider'>{item.role}</h1>
                                    <h1 className='text-[40px] ml-1 mt-4 font1 tracking-wide'>{item.username}</h1>
                                    <h1 className='text-[14px] ml-1 text-[#ccc]/70 relative'>Email <span className='ml-13 absolute left-13'>:</span> <span className='ml-2 absolute left-30'>{item.email}</span></h1>
                                    <h1 className='text-[14px] ml-1 text-[#ccc]/70 relative'>Password <span className='ml-13 absolute left-13'>:</span> <span className='ml-2 absolute left-30'>{item.password}</span></h1>
                                    <div className='absolute top-3 right-3 bg-amber-50 h-17  w-17 rounded overflow-hidden'>
                                        <img src="https://i.pinimg.com/736x/ef/3b/80/ef3b80184ceafefa15a2121d794208b0.jpg" className='w-full h-full object-cover' alt="" />
                                    </div>
                                </div>

                            )) : (<p className='text-[180px] tracking-wide font-semibold font1 text-center w-[1450px] bg-[cyan]/20 text-[#ccc]'>No Users Found !</p>)
                    }

                </div>
            </div>
        </div>
    )
}

export default AdminUsers



{/* {  userList.length >0 ?
                    userList.map((item, i) => (
                        <div key={i} className="grid text-amber-50 pt-60">
                            <h1>{item.username}</h1>
                            <h1>Email</h1>
                            <h1>Password</h1>
                            <h1>Role</h1>
                        </div>
                    )): "No Users"
                } */}
