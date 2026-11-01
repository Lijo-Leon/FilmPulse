import { Crown, PencilLine } from 'lucide-react'
import React, { useState } from 'react'
import { updateProfileAPI } from '../services/allAPIs';
import PremiumComponent from '../components/PremiumComponent';
import Swal from 'sweetalert2';

function Profile() {
    const storedUser = JSON.parse(sessionStorage.getItem('userDetails')) || {};

    const [user, setUser] = useState(storedUser);
    const [editOpen, setEditOpen] = useState(false);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        username: user?.username || "",
        bio: user?.bio || "",
        designation: user?.designation || "",
        profile: user?.profile || ""
    });
    const [profileFile, setProfileFile] = useState(null);

    const handleOpenEdit = () => {
        setFormData({
            username: user?.username || "",
            bio: user?.bio || "",
            designation: user?.designation || "",
            profile: user?.profile || ""
        });
        setProfileFile(null);
        setEditOpen(true);
    };

    const handleCloseEdit = () => {
        setProfileFile(null);
        setEditOpen(false);
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            const token = sessionStorage.getItem("token");
            const updatedToken = token ? token.replace(/"/g, "") : "";

            const reqBody = new FormData();
            reqBody.append("username", formData.username);
            reqBody.append("bio", formData.bio);
            reqBody.append("designation", formData.designation);

            if (profileFile) {
                reqBody.append("profile", profileFile);
            }

            const reqHeader = {
                Authorization: `Bearer ${updatedToken}`,
            };

            const result = await updateProfileAPI(reqBody, reqHeader);

            if (result && (result.status === 200 || result.status === 201)) {
                setUser(result.data.user);
                sessionStorage.setItem(
                    "userDetails",
                    JSON.stringify(result.data.user)
                );
                setFormData({
                    username: result.data.user.username || "",
                    bio: result.data.user.bio || "",
                    designation: result.data.user.designation || "",
                    profile: result.data.user.profile || ""
                });
                setProfileFile(null);
                setEditOpen(false);

                Swal.fire({
                    icon: 'success',
                    title: 'Profile Updated',
                    text: 'Your profile has been updated successfully!',
                    timer: 1500,
                    showConfirmButton: false,
                    background: '#0b0b0b',
                    color: '#ffffff',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Update Failed',
                    text: result?.response?.data?.message || 'Failed to update profile. Please try again.',
                    background: '#0b0b0b',
                    color: '#ffffff',
                    confirmButtonColor: '#00ffff'
                });
            }

        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An unexpected error occurred while updating profile.',
                background: '#0b0b0b',
                color: '#ffffff',
                confirmButtonColor: '#00ffff'
            });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="bg-black min-h-screen text-white pt-20 md:pt-30 lg:pt-30">
            <div className='flex flex-col lg:flex-row'>

                {/* LEFT */}
                <div className="lg:w-[25%] w-full px-4 py-6 flex justify-center lg:block">
                    <div className='bg-amber-50 h-72 lg:h-140 w-72 lg:w-90'>
                        <img 
                            src={user?.profile ? (user.profile.startsWith("http") ? user.profile : `http://localhost:5000${user.profile}`) : "https://i.pinimg.com/736x/57/99/8d/57998dcb4df036da2094c3071be7657a.jpg"}
                            className='object-cover h-full w-full' 
                            alt="" 
                        />
                    </div>
                </div>

                {/* RIGHT */}
                <div className="lg:w-[75%] w-full py-6 px-4 relative">

                    {/* EDIT BUTTON */}
                    <button 
                        onClick={handleOpenEdit}
                        className='hover:bg-[cyan] hover:text-black font-semibold absolute lg:right-20 right-4 top-2 border-2 border-[cyan] text-[cyan] py-2 px-4 lg:px-9 text-sm lg:text-base transition-all duration-200 cursor-pointer'
                    >
                        Edit Profile
                    </button>

                    {/* MODAL */}
                    {editOpen && (
                        <div className="fixed inset-0 bg-black/80 backdrop-blur z-50 flex items-center justify-center px-4">

                            <div className="bg-[#0f0f0f] border border-[#555] w-full max-w-[600px] p-6 lg:p-8">
                                <h1 className="text-2xl lg:text-3xl font3 text-white mb-6">Edit Profile</h1>

                                <input
                                    className="w-full mb-2 p-3 bg-black border border-[#555] text-white"
                                    placeholder="Username"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                />

                                <textarea
                                    className="w-full mb-1 p-3 bg-black border border-[#555] text-white h-24 lg:h-28"
                                    placeholder="Bio"
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                />

                                <input
                                    className="w-full mb-4 p-3 bg-black border border-[#555] text-white"
                                    placeholder="Designation"
                                    value={formData.designation}
                                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                                />

                                <input
                                    id="profileUpload"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setProfileFile(e.target.files[0])}
                                    className="hidden"
                                />

                                <div className="flex items-center gap-3">
                                    <label
                                        htmlFor="profileUpload"
                                        className="text-sm lg:text-base font-semibold inline-block cursor-pointer border border-[cyan] text-[cyan] hover:bg-[cyan] px-4 lg:px-6 py-2 hover:text-black transition-all"
                                    >
                                        Upload Profile Image
                                    </label>
                                    {profileFile && (
                                        <span className="text-xs text-[cyan] truncate max-w-[200px]">
                                            {profileFile.name}
                                        </span>
                                    )}
                                </div>

                                <div className="flex justify-end gap-4 mt-6">
                                    <button
                                        onClick={handleCloseEdit}
                                        disabled={saving}
                                        className="border border-red-800 text-red-500 hover:text-white hover:bg-red-800 px-4 lg:px-6 py-2 text-sm lg:text-base cursor-pointer disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        onClick={handleSave}
                                        disabled={saving}
                                        className="border px-4 lg:px-6 py-2 text-sm lg:text-base border-[cyan] text-[cyan] hover:bg-[cyan] hover:text-black transition-all cursor-pointer disabled:opacity-50">
                                        {saving ? "Saving..." : "Save"}
                                    </button>
                                </div>
                            </div>

                        </div>
                    )}

                    {/* NAME */}
                    <div className='flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-5 mt-10 lg:mt-0'>
                        <h1 className='lg:text-[85px] text-3xl sm:text-4xl font1 tracking-wider text-[#e9e9e9] break-words'>
                            {user?.username}
                        </h1>

                        {user?.subscriber == true && <PremiumComponent />}
                    </div>

                    {/* DESIGNATION */}
                    <div className='flex flex-col gap-1 mt-6'>
                        <h1 className='text-[13px] lg:text-[15px] font3 tracking-wider text-[#aebabd]/60'>
                            Designation
                        </h1>
                        <h1 className='text-[13px] lg:text-[17px] font3 tracking-wider uppercase text-[#aebabd] font-semibold'>
                            {user?.designation || "Cinematography Enthusiast (Demo)"}
                        </h1>
                    </div>

                    {/* BIO */}
                    <div className='flex flex-col mt-10 lg:mt-14 gap-1'>
                        <h1 className='text-[13px] lg:text-[15px] font3 tracking-wider text-[#aebabd]/60'>
                            Bio Profile
                        </h1>
                        <h1 className='text-[12px] lg:text-[17px] font3 tracking-wider text-[#aebabd] lg:max-w-[900px] text-justify font-light'>
                            {user?.bio || "A passionate visual creator exploring cinematic storytelling. (Demo Bio)"}
                        </h1>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Profile
