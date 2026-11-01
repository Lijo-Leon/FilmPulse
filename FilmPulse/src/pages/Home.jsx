import React, { useState } from 'react'
import { CircleCheck, MoveRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { IoIosPlay, IoMdClose } from 'react-icons/io'
import { FaPlus } from "react-icons/fa6";
import { addCameraMovementAPI, addShotTypeAPI } from '../services/allAPIs'
import Footer from '../components/Footer'
import { FaPlay } from "react-icons/fa6";
import Swal from 'sweetalert2'


Footer
function Home() {

  const [cmModal, setCmModal] = useState(false)
  const [stModal, setStModal] = useState(false)
  const [subModal, setSubModal] = useState(false)
  const navigate = useNavigate()

  const [cmData, setCMData] = useState({
    title: "",
    shortDescription: "",
    description: "",
    howItWorks: "",
    whenToUse: [],
    emotionalImpact: [],
    technicalSetup: [],
    videos: []
  })

  // whenToUse
  const [useTitle, setUseTitle] = useState("")
  const [useAbout, setUseAbout] = useState("")
  const handleAddWhenToUse = () => {
    if (!useTitle || !useAbout) {
      Swal.fire({
        icon: 'warning',
        title: 'Fill both fields',
        background: '#0b0b0b',
        color: '#ffffff',
        confirmButtonColor: '#00ffff'
      })

      return;
    }

    setCMData((prev) => ({
      ...prev,
      whenToUse: [...prev.whenToUse, { useTitle, useAbout }]
    }));

    setUseTitle("");
    setUseAbout("");
  };



  // emotionalImpact
  const [impact, setImpact] = useState("")
  const handleEmotionalImpact = () => {
    if (!impact) {
      Swal.fire({
        icon: 'warning',
        title: 'Enter Emotional Impact',
        background: '#0b0b0b',
        color: '#ffffff',
        confirmButtonColor: '#00ffff'
      })
      return;
    }
    setCMData({ ...cmData, emotionalImpact: [...cmData.emotionalImpact, impact] })
    setImpact("");
  }




  // technicalSetup
  const [tech, setTech] = useState("")
  const handleTechnicalSetup = () => {
    if (!tech) {
      Swal.fire({
        icon: 'warning',
        title: 'Enter technical setup',
        background: '#0b0b0b',
        color: '#ffffff',
        confirmButtonColor: '#00ffff'
      })
      return;
    }
    setCMData({ ...cmData, technicalSetup: [...cmData.technicalSetup, tech] })
    setTech("")
  }

  const [videoFiles, setVideoFiles] = useState([]);
  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "video/mp4" && file.type !== "video/mov") {
      Swal.fire({
        icon: 'warning',
        title: 'Only MP4 or MOV videos allowed!',
        background: '#0b0b0b',
        color: '#ffffff',
        confirmButtonColor: '#00ffff'
      })
      return;
    }

    setVideoFiles(prev => [...prev, file]);
  };



  const handleReset = async () => {
    setCMData({
      title: "",
      shortDescription: "",
      description: "",
      howItWorks: "",
      whenToUse: [],
      emotionalImpact: [],
      technicalSetup: [],
      videos: [],
    })
    setVideoFiles([])
    setUseTitle("")
    setImpact("")
    setTech("")
    setUseAbout("")
  }




  const handleSubmitCameraMovement = async () => {
    // Attach video files into cmData
    cmData.videos = videoFiles;

    if (!cmData.title || !cmData.shortDescription || !cmData.description || !cmData.howItWorks) {
      Swal.fire({
        icon: 'warning',
        title: 'Please Fill When to use fields',
        background: '#0b0b0b',
        color: '#ffffff',
        confirmButtonColor: '#00ffff'
      })
      return;
    }

    // Token
    const updateToken = sessionStorage.getItem("token")?.replace(/"/g, "");
    const reqHeader = { Authorization: `Bearer ${updateToken}` };

    // Create FormData
    const reqBody = new FormData();

    // normal fields
    reqBody.append("title", cmData.title);
    reqBody.append("shortDescription", cmData.shortDescription);
    reqBody.append("description", cmData.description);
    reqBody.append("howItWorks", cmData.howItWorks);

    // arrays must send as JSON strings
    reqBody.append("whenToUse", JSON.stringify(cmData.whenToUse));
    reqBody.append("emotionalImpact", JSON.stringify(cmData.emotionalImpact));
    reqBody.append("technicalSetup", JSON.stringify(cmData.technicalSetup));

    // Videos
    videoFiles.forEach((file) => {
      reqBody.append("videos", file);
    });


    const response = await addCameraMovementAPI(reqBody, reqHeader);
    console.log("API RESPONSE:", response);

    if (response.status === 201) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: response.data.message,
        background: '#0b0b0b',
        color: '#ffffff',
        confirmButtonColor: '#00ffff'
      }).then(() => navigate('/cameramovements'))
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: response.data.message,
        background: '#0b0b0b',
        color: '#ffffff',
        confirmButtonColor: '#00ffff'
      })
    }
  };










  const [stData, setSTData] = useState({
    title: "",
    shortDescription: "",
    description: "",
    whyItUsed: "",
    whenToUse: [],
    emotionalImpact: [],
    technicalSetup: [],
    videos: []
  })

  //whenToUse ShotType
  const [stUseTitle, setSTUseTitle] = useState("")
  const [stUseAbout, setSTUseAbout] = useState("")
  const stHandleAddWhenToUse = async () => {
    if (!stUseTitle || !stUseAbout) {
      alert('Please Fill When to use fields')
      return
    }

    setSTData((prev) => ({
      ...prev,
      whenToUse: [...prev.whenToUse, { stUseTitle, stUseAbout }]
    }))
    setSTUseTitle("")
    setSTUseAbout("")
  }


  // emotionalImpact
  const [stImpact, setSTImpact] = useState("")
  const stHandleEmotionalImpact = async () => {
    if (!stImpact) {
      Swal.fire({
        icon: 'warning',
        title: 'Enter Emotional impact',
        background: '#0b0b0b',
        color: '#ffffff',
        confirmButtonColor: '#00ffff'
      })
      return
    }
    setSTData({ ...stData, emotionalImpact: [...stData.emotionalImpact, stImpact] })
    setSTImpact("")
  }


  // technicalSetup
  const [stTech, setSTTech] = useState("")
  const stHandleTechnicalSetup = async () => {
    if (!stTech) {
      Swal.fire({
        icon: 'warning',
        title: 'Enter technical setup',
        background: '#0b0b0b',
        color: '#ffffff',
        confirmButtonColor: '#00ffff'
      })
      return;
    }
    setSTData({ ...stData, technicalSetup: [...stData.technicalSetup, stTech] })
    setSTTech("")
  }

  const [stVideoFiles, setSTVideoFiles] = useState([]);
  const stHandleVideoUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return;

    if (file.type !== "video/mp4" && file.type !== "video/mov") {
      Swal.fire({
        icon: 'warning',
        title: 'Only MP4 or MOV videos allowed!',
        background: '#0b0b0b',
        color: '#ffffff',
        confirmButtonColor: '#00ffff'
      })
      return
    }

    setSTVideoFiles(prev => [...prev, file])
  }


  const handleSTReset = async () => {
    setSTData({
      title: "",
      shortDescription: "",
      description: "",
      whyItUsed: "",
      whenToUse: [],
      emotionalImpact: [],
      technicalSetup: [],
      videos: [],
    })
    setSTVideoFiles([])
    setSTUseTitle("")
    setSTUseAbout("")
    setSTImpact("")
    setSTTech("")
  }



  const handleSubmitShotType = async () => {
    stData.videos = stVideoFiles

    if (!stData.title || !stData.shortDescription || !stData.description || !stData.whyItUsed) {
      Swal.fire({
        icon: 'warning',
        title: 'Please Fill All Fields',
        background: '#0b0b0b',
        color: '#ffffff',
        confirmButtonColor: '#00ffff'
      })
      return;
    }

    const updateToken = sessionStorage.getItem("token")?.replace(/"/g, "");
    const reqHeader = { Authorization: `Bearer ${updateToken}` };

    const reqBody = new FormData();

    // Normal fields
    reqBody.append("title", stData.title);
    reqBody.append("shortDescription", stData.shortDescription);
    reqBody.append("description", stData.description);
    reqBody.append("whyItUsed", stData.whyItUsed);

    // Arrays → MUST send as JSON strings
    reqBody.append("whenToUse", JSON.stringify(stData.whenToUse));
    reqBody.append("emotionalImpact", JSON.stringify(stData.emotionalImpact));
    reqBody.append("technicalSetup", JSON.stringify(stData.technicalSetup));

    // Videos
    stVideoFiles.forEach((file) => {
      reqBody.append("videos", file);
    });

    try {
      const response = await addShotTypeAPI(reqBody, reqHeader)
      console.log("API RESPONSE:", response);

      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: response.data.message,
          background: '#0b0b0b',
          color: '#ffffff',
          confirmButtonColor: '#00ffff'
        }).then(() => navigate('/shottype'))
      }
    }

    catch (err) {
      console.log('Error', err)

      Swal.fire({
        icon: 'error',
        title: 'Something went wrong',
        text: err.response?.data?.message || 'Server error. Please try again!',
        confirmButtonColor: '#00ffff'
      })
    }
  }




  const handleAddCMTechnique = () => {
    const user = JSON.parse(sessionStorage.getItem("userDetails"));
    console.log(user);

    if (user?.subscriber === true) {
      setCmModal(true)
    }

    else {
      // navigate("/subscription")
      setSubModal(true)
    }

  }


  const handleAddSTTechnique = () => {
    const user = JSON.parse(sessionStorage.getItem("userDetails"));
    console.log(user);

    if (user?.subscriber === true) {
      setStModal(true)
    }

    else {
      // navigate("/subscription")
      setSubModal(true)
    }

  }






  return (

    <div>
      <div className='bg-black w-full pb-30'>



        {subModal && <div data-aos='fade-in' className='w-full min-h-screen fixed top-0 bg-black/70 backdrop-blur-[5px] z-30 transition-all duration-1300 flex items-center justify-center'>
          <div className='w-200 h-110 bg-white/10 relative overflow-hidden'>
            <IoMdClose onClick={() => setSubModal(false)} className='text-[white] absolute right-4 top-4 text-[38px] hover:text-black transition-colors duration-200 p-1 z-1' />
            <img src="https://i.pinimg.com/736x/de/e7/fc/dee7fc8a13eaff33331231de825871a7.jpg" className='w-full h-full object-cover' alt="" />
            <div className='w-full h-full px-10 absolute top-0 bg-[black]/40 backdrop-blur-2xl'>
              <h1 className='text-[70px] mt-3 font-bold text-white/85 font0'>FILM PULSE</h1>
              <p className='text-[15px] mt-2 font-medium text-[#ccc] font3'>Subscribe to Film Pulse and access in-depth techniques, real cinematic breakdowns, and exclusive creator tools designed for serious filmmakers.</p>
              <ul className='mt-7 ml-3 flex flex-col gap-3'>
                <li className='text-[#ccc] flex items-center gap-3 font3'><CircleCheck size={23} strokeWidth={1.25} className='text-[cyan]' /> Add your own techniques</li>
                <li className='text-[#ccc] flex items-center gap-3 font3'><CircleCheck size={23} strokeWidth={1.25} className='text-[cyan]' /> Edit & delete your techniques</li>
                <li className='text-[#ccc] flex items-center gap-3 font3'><CircleCheck size={23} strokeWidth={1.25} className='text-[cyan]' /> Advanced cinematography breakdowns</li>
                <li className='text-[#ccc] flex items-center gap-3 font3'><CircleCheck size={23} strokeWidth={1.25} className='text-[cyan]' />Save techniques to favorites</li>
              </ul>
              <a href="/subscription"><button className="border flex gap-3 mt-7 border-[cyan] text-[cyan] text-[14px] hover:bg-[cyan] bg-[cyan]/10 px-9 py-[13px] font3 uppercase font-semibold hover:text-[#000000] backdrop-blur-[50px] transition-all duration-100">Get Premium</button></a>
            </div>
          </div>
        </div>
        }


        <div className='box lg:min-h-screen flex lg:flex-row md:flex-row flex-col items-center w-full overflow-hidden relative px-10 pt-40 pb-9'>
          <div className="left h-full lg:w-[30%] md:w-[200%] w-full bg-amber-50 overflow-hidden relative" >
            <img src="https://i.pinimg.com/1200x/69/aa/54/69aa54462ab38f2a6d9dd5a75c4babb3.jpg" alt="" />
            {/* <img src="https://i.pinimg.com/474x/4f/fc/c5/4ffcc550a435555088d7ef155af194a4.jpg" alt="" /> */}
          </div>

          <div className="right h-full lg:w-[70%] overflow-hidden lg:px-10 md:px-2">
            <h1  className='lg:text-[220px] md:text-[90px] w-full text-[100px] md:block text-center flex  lg:relative md:relative absolute h-112 md:h-auto lg:h-auto backdrop-blur-[1.5px] lg:backdrop-blur-[0px] md:top-0 top-40 left-0 bg-[black]/60 lg:bg-[black]/0 lg:flex items-center justify-center tracking-wider [word-spacing:21px] text-[#47dfdf] lg:-mt-17  font-bold font1' >
              FILM <br className='md:hidden'/> PULSE
            </h1>
            <div className="line md:block hidden w-full h-0.5 bg-amber-50 lg:-mt-10"></div>
            <p className='text-[14px] text-white/70 w-full font3 mt-16 md:mt-5 lg:mt-5 my-5 px-2 font-light [word-spacing:3px] text-justify'>
              Online platform for filmmakers. Explore, learn, and master the art behind every frame. It helps users
              to understand how Cinematography, Lighting, Colour grading, and Editing shape emotion in storytelling.
              From beginners to professionals, anyone can learn the visual language of filmmaking.
            </p>
            <div className="line w-full h-[1.5px] bg-amber-50"></div>

            <div className='frame-box w-full lg:h-[177px] flex lg:flex-row flex-col lg:gap-2 lg:mt-6 md:mt-13 mt-6 lg:relative md:absolute left-0'>
              <div className='flex gap-2 lg:flex-row md:flex-row flex-col '>

                <div className='flex gap-2 items-center justify-center'>
                  <div className="fr fr-one w-[140px] h-[177px] overflow-hidden">
                    {/* <img src="https://i.pinimg.com/1200x/28/28/57/282857467d53978d919e7ce99746f5f8.jpg" alt="" /> */}
                    <img src="https://i.pinimg.com/736x/62/ff/78/62ff78a25266f2d18dc0f5fe603b0f83.jpg" className='h-full w-full object-cover' alt="" />
                  </div>

                  <div className="fr fr-two w-[140px] h-[177px] overflow-hidden">
                    {/* <img src="https://i.pinimg.com/736x/d0/49/2b/d0492b807c17dd4597950f765c3d0f60.jpg" alt="" /> */}
                    <img src="https://i.pinimg.com/736x/26/74/05/2674054a76d4aca7fd884f4b5c628c56.jpg" className='h-full w-full object-cover' alt="" />
                  </div>

                </div>


                <div className='flex gap-2 items-center justify-center'>
                  <div className="fr fr-three w-[140px] h-[177px] overflow-hidden">
                    {/* <img src="https://i.pinimg.com/736x/07/00/a2/0700a265c0a966cd4e1bee2771722deb.jpg" alt="" /> */}
                    <img src="https://i.pinimg.com/1200x/92/9b/4b/929b4b1b29a9da42018a0d7d644bc392.jpg" className='h-full w-full object-cover' alt="" />
                  </div>

                  <div className="fr fr-four w-[140px] h-[177px] overflow-hidden">
                    {/* <img src="https://i.pinimg.com/1200x/5f/47/6d/5f476d6014cf9902479cb7df3f5208d8.jpg" alt="" /> */}
                    <img src="https://i.pinimg.com/736x/aa/07/71/aa0771966b0d5b5060bf2c658c04b189.jpg" className='h-full w-full object-cover' alt="" />
                  </div>

                </div>
              </div>
              <div className="fr fr-four lg:w-[347px] lg:h-[177px] overflow-hidden lg:pl-6">
                <p className="text-white/70 lg:text-sm w-full mt-5 lg:mt-0 text-[12px] bg-amber font3 leading-relaxed text-justify lg:pr-2">
                  Discover how visual techniques like framing, lighting, and color shape the mood of a film.
                  Dive deeper into the craft and explore the tools that make every scene unforgettable.
                </p>

                <Link to={'/cinematography'}>
                  <button className="lg:mt-8 mt-10 lg:scale-100 w-full lg:w-auto px-4 lg:py-2 py-3 border border-[cyan] text-[cyan] hover:bg-[cyan] hover:text-black font3 font-medium text-[15px] lg:text-sm transition-all duration-75 cursor-pointer">
                    Explore Techniques
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className='w-full lg:py-0 lg:pb-30 py-10'>
          <div className="box flex flex-col px-10 w-full">

            <button className="line-one cursor-pointer flex lg:px-4 border-t-2 border-b-2 border-[#a1a1a1] w-full lg:h-30 h-22 lg:focus-within:h-70 focus-within:h-80 overflow-hidden relative transition-all duration-200">
              <div className="left w-70%">
                <div className="top h-30 flex relative">
                  <p className='text-[#ccc] lg:text-3xl font3 lg:mt-10 mt-8 ml-2 lg:ml-0'>01</p>
                  <h1 className='text-[#ccc] lg:text-4xl absolute lg:left-70 left-10 mt-8 ml-2 lg:ml-0 w-110 text-left'>CAMERA MOVEMENTS</h1>
                </div>
                <div className="bottom pt-10 flex gap-3 w-full items-center justify-center relative mt-23 lg:mt-0">
                  <p className='text-[#555] text-sm text-left lg:flex hidden'>Complete solution <br /> from 0 to 100%</p>
                  <Link to={'/cameramovements'}>
                    <button className="primary-button border ml-2 border-[cyan] text-[cyan] hover:bg-[cyan] lg:text-[13px] text-[9px] lg:px-10 px-6 py-3 lg:ml-40 font3 uppercase font-semibold hover:text-[#000000b8] transition-all duration-100">Learn Now</button>
                  </Link>
                  <button onClick={handleAddCMTechnique} className="border flex items-center justify-center gap-3 border-[cyan] text-[cyan] lg:text-[13px] text-[9px] hover:bg-[cyan] px-7 py-3 font3  font-semibold hover:text-[#000000b8] transition-all duration-100 uppercase">Add Technique</button>
                  {cmModal && <div className="fixed inset-0 overflow-scroll bg-black backdrop-blur-sm text-left z-50 pb-10">
                    <div className="header flex items-center sticky top-0 bg-black border-b shadow-2xl border-[#ccc] py-7 px-20 w-full">
                      <h1 className='text-4xl lg:text-6xl font-bold tracking-wide font1 text-white/90'>
                        ADD NEW TECHNIQUE <span className='font-light ml-5'> /</span>
                      </h1>
                      <p className='text-white/90 text-3xl ml-5 uppercase font-semibold'>Camera Movements</p>
                      <IoMdClose onClick={() => setCmModal(false)} className='text-red-800 bg-[#7b0000]/40 absolute right-10 text-[38px] hover:text-black hover:bg-red-800 border-3 border-red-800 rounded-full p-1 transition-colors duration-200' />
                    </div>


                    <div>
                      <div className="inp-div w-full gap-8 flex flex-col pt-10 px-10 bg-black">

                        <div className="lg:w-full flex flex-col gap-6">
                          <div className='flex w-full gap-6'>
                            <div className="w-1/2 flex flex-col gap-6">
                              <input value={cmData.title} onChange={(e) => setCMData({ ...cmData, title: e.target.value })} type="text" className='w-full py-4 h-13 px-4 border text-[13px] font3 border-[#555] placeholder:text-[#6d6d6d] placeholder:italic text-[#ccc] bg-[#1b1b1b79] transition-all duration-100 focus:outline-none focus:border-[cyan] hover:bg-[cyan]/10 focus:bg-[cyan]/10' placeholder='Enter Title' name="" id="" />
                              <textarea value={cmData.shortDescription} onChange={(e) => setCMData({ ...cmData, shortDescription: e.target.value })} type="text" className='w-full py-3 h-26 text-[13px] font3 px-4 border border-[#555] placeholder:text-[#6d6d6d] placeholder:italic text-[#ccc] bg-[#1b1b1b79] transition-all duration-100 focus:outline-none focus:border-[cyan] hover:bg-[cyan]/10 focus:bg-[cyan]/10' placeholder='Enter a short description' name="" id="" />
                            </div>

                            <div className="w-1/2">
                              <textarea value={cmData.description} onChange={(e) => setCMData({ ...cmData, description: e.target.value })} type="text" className='w-full py-3 h-45 text-[13px] font3 px-4 border border-[#555] placeholder:text-[#6d6d6d] placeholder:italic text-[#ccc] bg-[#1b1b1b79] transition-all duration-100 focus:outline-none focus:border-[cyan] hover:bg-[cyan]/10 focus:bg-[cyan]/10' placeholder='Enter Description' name="" id="" />
                            </div>
                          </div>
                          <textarea value={cmData.howItWorks} onChange={(e) => setCMData({ ...cmData, howItWorks: e.target.value })} type="text" className='w-full py-3 h-47 text-[13px] font3 px-4 border border-[#555]  placeholder:text-[#6d6d6d] placeholder:italic text-[#ccc] bg-[#1b1b1b79] transition-all duration-100 focus:outline-none focus:border-[cyan] hover:bg-[cyan]/10 focus:bg-[cyan]/10' placeholder='How it works' name="" id="" />
                        </div>

                        <div className="lg:w-full flex flex-col gap-6">
                          <div className='border border-[#555]'>
                            <h1 className='text-[#6d6d6d] mt-3 ml-4 font3'>When to Use</h1>
                            <div className='px-10 py-10 flex flex-col gap-6'>
                              <input type="text" value={useTitle} onChange={(e) => setUseTitle(e.target.value)} className='w-full py-3 px-4 text-[13px] font3 border border-[#555] placeholder:text-[#6d6d6d] placeholder:italic text-[#ccc] bg-[#1b1b1b79] transition-all duration-100 focus:outline-none focus:border-[cyan] hover:bg-[cyan]/10 focus:bg-[cyan]/10' placeholder='Title' name="" id="" />
                              <textarea type="text" value={useAbout} onChange={(e) => setUseAbout(e.target.value)} className='w-full py-3 px-4 text-[13px] font3 h-28 border border-[#555] placeholder:text-[#6d6d6d] placeholder:italic text-[#ccc] bg-[#1b1b1b79] transition-all duration-100 focus:outline-none focus:border-[cyan] hover:bg-[cyan]/10 focus:bg-[cyan]/10' placeholder='About Use' name="" id="" />
                              <button onClick={handleAddWhenToUse} type="button" className='hover:bg-[cyan] hover:text-black text-[14px] font3 font-semibold border border-[cyan] text-[cyan] py-2 w-20'>Add</button>

                              <div className="mt-4 grid grid-cols-3 gap-3">
                                {cmData.whenToUse.map((item, index) => (
                                  <div key={index} className='flex flex-col gap-1 border border-[#555] bg-slate-500/30 text-justify h-60 p-6'>
                                    <div className='flex gap-3 font3 text-[#dcdcdc] text-[15px]'>{item.useTitle}</div>
                                    <p className='font3 text-[12px] text-[#a5a5a5] mt-4 overflow-scroll'>{item.useAbout}</p>
                                  </div>
                                ))}
                              </div>

                            </div>
                          </div>


                          <div className='flex w-full gap-6  '>

                            <div className='w-1/2 border border-[#555]'>
                              <h1 className='text-[#6d6d6d] mt-3 ml-4 font3'>Emotional Impact</h1>
                              <div className='px-10 py-8 flex gap-3'>
                                <input value={impact} onChange={(e) => setImpact(e.target.value)} type="text" className='w-full py-3 px-4 text-[13px] font3 border border-[#555] placeholder:text-[#6d6d6d] placeholder:italic text-[#ccc] bg-[#1b1b1b79] transition-all duration-100 focus:outline-none focus:border-[cyan] hover:bg-[cyan]/10 focus:bg-[cyan]/10' placeholder='Enter Emotional Impact' name="" id="" />
                                <FaPlus type='button' onClick={handleEmotionalImpact} className='h-12 w-12 p-3 hover:bg-[cyan] hover:text-black font-semibold border border-[cyan] text-[cyan]' />
                              </div>

                              <div className="flex flex-col gap-3 px-10 pb-10">
                                {cmData.emotionalImpact.map((item, index) => (
                                  <div key={index} className='flex flex-col gap-1 border border-[#555] bg-slate-500/30 text-justify p-3'>
                                    <div className='flex gap-3 font3 text-[#dcdcdc] text-[15px]'>{item}</div>
                                  </div>
                                ))}
                              </div>
                            </div>


                            <div className='w-1/2 border border-[#555]'>
                              <h1 className='text-[#6d6d6d] mt-3 ml-4 font3'>Technical Setup</h1>
                              <div className='px-10 py-8 flex gap-3'>
                                <input value={tech} onChange={(e) => setTech(e.target.value)} type="text" className='w-full py-3 px-4 border text-[13px] font3 border-[#555] placeholder:text-[#6d6d6d] placeholder:italic text-[#ccc] bg-[#1b1b1b79] transition-all duration-100 focus:outline-none focus:border-[cyan] hover:bg-[cyan]/10 focus:bg-[cyan]/10' placeholder='Enter Technical Setup' name="" id="" />
                                <FaPlus type='button' onClick={handleTechnicalSetup} className='h-12 w-12 p-3 hover:bg-[cyan] hover:text-black font-semibold border border-[cyan] text-[cyan]' />
                              </div>

                              <div className="flex flex-col gap-3 px-10 pb-10">
                                {cmData.technicalSetup.map((item, index) => (
                                  <div key={index} className='flex flex-col gap-1 border border-[#555] bg-slate-500/30 text-justify p-3'>
                                    <div className='flex gap-3 font3 text-[#dcdcdc] text-[15px]'>{item}</div>
                                  </div>
                                ))}
                              </div>

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='px-10'>
                      <div className='mt-5 border border-[#555] p-7 flex flex-col gap-4'>
                        <div className='flex gap-3'>
                          <h1 className='text-2xl text-[#cccccc] uppercase font3'>Add Related Videos</h1>
                          <label htmlFor="videoUpload">
                            <input type="file" onChange={handleVideoUpload} id="videoUpload" accept="video/*" hidden />
                            <FaPlus onClick={() => document.getElementById("videoUpload").click()}
                              className='h-8 w-8 p-2 hover:bg-[cyan] hover:text-black font-semibold border border-[cyan] text-[cyan] cursor-pointer'
                            />
                          </label>
                        </div>
                        <div className='grid grid-cols-5 gap-4 mt-10'>
                          {videoFiles.map((file, i) => (
                            <video autoPlay loop muted
                              key={i}
                              src={URL.createObjectURL(file)}
                              className="bg-black"

                            />
                          ))}
                        </div>
                      </div>


                      <div className='flex mt-5 gap-7 font3'>
                        <input type="button" onClick={handleReset} className='hover:bg-[#500101] bg-[#7b0000]/40 text-white font-semibold border-2 border-[#7b0000] hover:border-[#500101] py-2 px-9 transition-all duration-200' value='Reset' />
                        <input type="button" onClick={handleSubmitCameraMovement} className='hover:bg-[cyan] hover:text-black font-semibold border-2 border-[cyan] text-[cyan] py-2 px-9 transition-all duration-200' value='Submit' />
                      </div>
                    </div>

                  </div>
                  }

                </div>
              </div>
              <div className="right h-full w-full lg:w-auto absolute lg:right-45 flex items-center justify-center">
                <p className="line-para px-2 lg:px-0 text-justify lg:w-120 w-full lg:mt-0 text-[#888] lg:text-sm text-[10px] font3 lg:text-left flex items-center justify-center">
                  Camera movements shape how the audience experiences a scene — guiding attention, enhancing emotion, and creating rhythm within the storytelling. From slow, controlled pushes that reveal a character’s inner world to dynamic tracking shots that build tension and momentum, movement adds energy and meaning beyond what’s in the frame. Every pan, tilt, dolly, or handheld motion becomes a narrative choice, influencing mood, perspective, and the emotional flow of a moment. Explore how purposeful movement transforms simple visuals into powerful cinematic language.
                </p>
              </div>
              <div className="arrow-div h-full flex absolute right-2 pt-6">
                <MoveRight strokeWidth={1.5} className='text-[cyan] h-10 w-10 p-1 arrow' />
              </div>
            </button>











            <button className="line-one cursor-pointer flex lg:px-4 border-[#a1a1a1] w-full lg:h-30 h-22 lg:focus-within:h-70 focus-within:h-80 overflow-hidden relative transition-all duration-200">
              <div className="left w-70%">
                <div className="top h-30 flex relative">
                  <p className='text-[#ccc] lg:text-3xl font3 lg:mt-10 mt-8 ml-2 lg:ml-0'>02</p>
                  <h1 className='text-[#ccc] lg:text-4xl absolute lg:left-70 left-10 mt-8 ml-2 lg:ml-0 w-110 text-left'>SHOT TYPES</h1>
                </div>
                <div className="bottom pt-10 flex gap-3 w-full items-center justify-center relative mt-23 lg:mt-0">
                  <p className='text-[#555] text-sm text-left lg:flex hidden'>Complete solution <br /> from 0 to 100%</p>
                  <Link to={'/shottype'}>
                    <button className="primary-button border ml-2 border-[cyan] text-[cyan] hover:bg-[cyan] lg:text-[13px] text-[9px] lg:px-10 px-6 py-3 lg:ml-40 font3 uppercase font-semibold hover:text-[#000000b8] transition-all duration-100">Learn Now</button>
                  </Link>
                  <button onClick={handleAddSTTechnique} className="border flex items-center justify-center gap-3 border-[cyan] text-[cyan] lg:text-[13px] text-[9px] hover:bg-[cyan] px-7 py-3 font3  font-semibold hover:text-[#000000b8] transition-all duration-100 uppercase">Add Technique</button>
                </div>
              </div>

              {stModal && <div className="fixed inset-0 overflow-scroll bg-black backdrop-blur-sm text-left z-50 pb-10">
                <div className="header flex items-center sticky top-0 bg-black border-b shadow-2xl border-[#ccc] py-7 px-20 w-full">
                  <h1 className='text-4xl lg:text-6xl font-bold tracking-wide font1 text-white/90'>
                    ADD NEW TECHNIQUE <span className='font-light ml-5'> /</span>
                  </h1>
                  <p className='text-white/90 text-3xl ml-5 uppercase font-semibold'>Shot Types</p>
                  <IoMdClose onClick={() => setStModal(false)} className='text-red-800 absolute right-10 text-[38px] hover:text-black hover:bg-red-800 border-3 border-red-800 rounded-full p-1 transition-colors duration-200' />
                </div>


                <div>
                  <div className="inp-div w-full gap-8 flex flex-col pt-10 px-10 bg-black">

                    <div className="lg:w-full flex flex-col gap-6">
                      <div className='flex w-full gap-6'>
                        <div className="w-1/2 flex flex-col gap-6">
                          <input value={stData.title} onChange={(e) => setSTData({ ...stData, title: e.target.value })} type="text" className='w-full py-4 h-13 px-4 border text-[13px] font3 border-[#555] placeholder:text-[#6d6d6d] placeholder:italic text-[#ccc] bg-[#1b1b1b79] transition-all duration-100 focus:outline-none focus:border-[cyan] hover:bg-[cyan]/10 focus:bg-[cyan]/10' placeholder='Enter Title' name="" id="" />
                          <textarea value={stData.shortDescription} onChange={(e) => setSTData({ ...stData, shortDescription: e.target.value })} type="text" className='w-full py-3 h-26 text-[13px] font3 px-4 border border-[#555] placeholder:text-[#6d6d6d] placeholder:italic text-[#ccc] bg-[#1b1b1b79] transition-all duration-100 focus:outline-none focus:border-[cyan] hover:bg-[cyan]/10 focus:bg-[cyan]/10' placeholder='Enter a short description' name="" id="" />
                        </div>

                        <div className="w-1/2">
                          <textarea value={stData.description} onChange={(e) => setSTData({ ...stData, description: e.target.value })} type="text" className='w-full py-3 h-45 text-[13px] font3 px-4 border border-[#555] placeholder:text-[#6d6d6d] placeholder:italic text-[#ccc] bg-[#1b1b1b79] transition-all duration-100 focus:outline-none focus:border-[cyan] hover:bg-[cyan]/10 focus:bg-[cyan]/10' placeholder='Enter Description' name="" id="" />
                        </div>
                      </div>
                      <textarea value={stData.whyItUsed} onChange={(e) => setSTData({ ...stData, whyItUsed: e.target.value })} type="text" className='w-full py-3 h-47 text-[13px] font3 px-4 border border-[#555]  placeholder:text-[#6d6d6d] placeholder:italic text-[#ccc] bg-[#1b1b1b79] transition-all duration-100 focus:outline-none focus:border-[cyan] hover:bg-[cyan]/10 focus:bg-[cyan]/10' placeholder='Why it used' name="" id="" />
                    </div>

                    <div className="lg:w-full flex flex-col gap-6">
                      <div className='border border-[#555]'>
                        <h1 className='text-[#6d6d6d] mt-3 ml-4 font3'>When to Use</h1>
                        <div className='px-10 py-10 flex flex-col gap-6'>
                          <input type="text" value={stUseTitle} onChange={(e) => setSTUseTitle(e.target.value)} className='w-full py-3 px-4 text-[13px] font3 border border-[#555] placeholder:text-[#6d6d6d] placeholder:italic text-[#ccc] bg-[#1b1b1b79] transition-all duration-100 focus:outline-none focus:border-[cyan] hover:bg-[cyan]/10 focus:bg-[cyan]/10' placeholder='Title' name="" id="" />
                          <textarea type="text" value={stUseAbout} onChange={(e) => setSTUseAbout(e.target.value)} className='w-full py-3 px-4 text-[13px] font3 h-28 border border-[#555] placeholder:text-[#6d6d6d] placeholder:italic text-[#ccc] bg-[#1b1b1b79] transition-all duration-100 focus:outline-none focus:border-[cyan] hover:bg-[cyan]/10 focus:bg-[cyan]/10' placeholder='About Use' name="" id="" />
                          <button onClick={stHandleAddWhenToUse} type="button" className='hover:bg-[cyan] hover:text-black text-[14px] font3 font-semibold border border-[cyan] text-[cyan] py-2 w-20'>Add</button>

                          <div className="mt-4 grid grid-cols-3 gap-3">
                            {stData.whenToUse.map((item, index) => (
                              <div key={index} className='flex flex-col gap-1 border border-[#555] bg-slate-500/30 text-justify h-60 p-6'>
                                <div className='flex gap-3 font3 text-[#dcdcdc] text-[15px]'>{item.stUseTitle}</div>
                                <p className='font3 text-[12px] text-[#a5a5a5] mt-4 overflow-scroll'>{item.stUseAbout}</p>
                              </div>
                            ))}
                          </div>

                        </div>
                      </div>


                      <div className='flex w-full gap-6  '>

                        <div className='w-1/2 border border-[#555]'>
                          <h1 className='text-[#6d6d6d] mt-3 ml-4 font3'>Emotional Impact</h1>
                          <div className='px-10 py-8 flex gap-3'>
                            <input value={stImpact} onChange={(e) => setSTImpact(e.target.value)} type="text" className='w-full py-3 px-4 text-[13px] font3 border border-[#555] placeholder:text-[#6d6d6d] placeholder:italic text-[#ccc] bg-[#1b1b1b79] transition-all duration-100 focus:outline-none focus:border-[cyan] hover:bg-[cyan]/10 focus:bg-[cyan]/10' placeholder='Enter Emotional Impact' name="" id="" />
                            <FaPlus type='button' onClick={stHandleEmotionalImpact} className='h-12 w-12 p-3 hover:bg-[cyan] hover:text-black font-semibold border border-[cyan] text-[cyan]' />
                          </div>

                          <div className="flex flex-col gap-3 px-10 pb-10">
                            {stData.emotionalImpact.map((item, index) => (
                              <div key={index} className='flex flex-col gap-1 border border-[#555] bg-slate-500/30 text-justify p-3'>
                                <div className='flex gap-3 font3 text-[#dcdcdc] text-[15px]'>{item}</div>
                              </div>
                            ))}
                          </div>
                        </div>


                        <div className='w-1/2 border border-[#555]'>
                          <h1 className='text-[#6d6d6d] mt-3 ml-4 font3'>Technical Setup</h1>
                          <div className='px-10 py-8 flex gap-3'>
                            <input value={stTech} onChange={(e) => setSTTech(e.target.value)} type="text" className='w-full py-3 px-4 border text-[13px] font3 border-[#555] placeholder:text-[#6d6d6d] placeholder:italic text-[#ccc] bg-[#1b1b1b79] transition-all duration-100 focus:outline-none focus:border-[cyan] hover:bg-[cyan]/10 focus:bg-[cyan]/10' placeholder='Enter Technical Setup' name="" id="" />
                            <FaPlus type='button' onClick={stHandleTechnicalSetup} className='h-12 w-12 p-3 hover:bg-[cyan] hover:text-black font-semibold border border-[cyan] text-[cyan]' />
                          </div>

                          <div className="flex flex-col gap-3 px-10 pb-10">
                            {stData.technicalSetup.map((item, index) => (
                              <div key={index} className='flex flex-col gap-1 border border-[#555] bg-slate-500/30 text-justify p-3'>
                                <div className='flex gap-3 font3 text-[#dcdcdc] text-[15px]'>{item}</div>
                              </div>
                            ))}
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='px-10'>
                  <div className='mt-5 border border-[#555] p-7 flex flex-col gap-4'>
                    <div className='flex items-center gap-3'>
                      <h1 className='text-2xl text-[#cccccc] uppercase font3'>Add Related Videos</h1>
                      <label htmlFor="stVideoUpload">
                        <input type="file" onChange={stHandleVideoUpload} id="stVideoUpload" accept="video/*" hidden />
                        <FaPlus onClick={() => document.getElementById("stVideoUpload").click()} className='h-8 w-8 p-2 hover:bg-[cyan] hover:text-black font-semibold border border-[cyan] text-[cyan]' />
                      </label>
                    </div>
                    <div className='grid grid-cols-5 gap-4 mt-10'>
                      {stVideoFiles.map((file, i) => (
                        <video autoPlay loop muted
                          key={i}
                          src={URL.createObjectURL(file)}
                          className="bg-black"
                        />
                      ))}
                    </div>

                  </div>

                  <div className='flex mt-5 gap-7 font3'>
                    <input onClick={handleSTReset} type="button" className='hover:bg-[#500101] bg-[#7b0000]/40 text-white font-semibold border-2 border-[#7b0000] hover:border-[#500101] py-2 px-9 transition-all duration-200' value='Reset' />
                    <input onClick={handleSubmitShotType} type="button" className='hover:bg-[cyan] hover:text-black font-semibold border-2 border-[cyan] text-[cyan] py-2 px-9 transition-all duration-200' value='Submit' />
                  </div>
                </div>
              </div>
              }

              <div className="right h-full w-full lg:w-auto absolute lg:right-45 flex items-center justify-center">
                <p className="line-para px-2 lg:px-0 text-justify lg:w-120 w-full lg:mt-0 text-[#888] lg:text-sm text-[10px] font3 lg:text-left flex items-center justify-center">
                  Shot types define how the audience perceives space, emotion, and character presence within a scene. Each shot—from the intimacy of a close-up to the vast scale of an establishing shot—serves a narrative purpose, shaping the viewer’s psychological distance and engagement. Choices like wide shots, medium shots, or extreme close-ups guide focus, reveal context, and control the emotional intensity of a moment. Through intentional framing, filmmakers craft visual meaning and set the foundation for how every story beat is understood.
                </p>
              </div>
              <div className="arrow-div h-full flex absolute right-2 pt-6">
                <MoveRight strokeWidth={1.5} className='text-[cyan] h-10 w-10 p-1 arrow' />
              </div>
            </button>













            <button className="line-one cursor-pointer flex lg:px-4 border-t-2 border-b-2 border-[#a1a1a1] w-full lg:h-30 h-22 lg:focus-within:h-70 focus-within:h-80 overflow-hidden relative transition-all duration-200">
              <div className="left w-70%">
                <div className="top h-30 flex relative">
                  <p className='text-[#ccc] lg:text-3xl font3 lg:mt-10 mt-8 ml-2 lg:ml-0'>03</p>
                  <h1 className='text-[#ccc] lg:text-4xl absolute lg:left-70 left-10 mt-8 ml-2 lg:ml-0 w-110 text-left'>LENSES & DEPTH</h1>
                </div>
                <div className="bottom pt-10 flex gap-3 w-full items-center justify-center relative mt-23 lg:mt-0">
                  <p className='text-[#555] text-sm text-left lg:flex hidden'>Complete solution <br /> from 0 to 100%</p>
                  <Link to={'/lens_depths'}>
                    <button className="primary-button border ml-2 border-[cyan] text-[cyan] hover:bg-[cyan] lg:text-[13px] text-[9px] lg:px-10 px-6 py-3 lg:ml-40 font3 uppercase font-semibold hover:text-[#000000b8] transition-all duration-100">Learn Now</button>
                  </Link>
                  {/* <button className="border flex items-center justify-center gap-3 border-[cyan] text-[cyan] text-[13px] hover:bg-[cyan] px-4 py-3 font3  font-semibold hover:text-[#000000b8] transition-all duration-100">Add Technique <Plus size={20} strokeWidth={2} /></button> */}
                </div>
              </div>
              <div className="right h-full w-full lg:w-auto absolute lg:right-45 flex items-center justify-center">
                <p className="line-para px-2 lg:px-0 text-justify lg:w-120 w-full lg:mt-0 text-[#888] lg:text-sm text-[10px] font3 lg:text-left flex items-center justify-center">
                  Lenses and depth shape how the viewer perceives space, emotion, and meaning within a frame. Focal length, aperture, and optical characteristics influence perspective — from the intimacy of shallow depth to the expansive clarity of deep focus. Choices like anamorphic stretch, bokeh texture, and field compression define visual mood and storytelling intent. Through precise lens selection and controlled depth of field, filmmakers sculpt how characters relate to their environment and how audiences connect to each moment.
                </p>
              </div>
              <div className="arrow-div h-full flex absolute right-2 pt-6">
                <MoveRight strokeWidth={1.5} className='text-[cyan] h-10 w-10 p-1 arrow' />
              </div>
            </button>
          </div>
        </div>







        <div className="w-full min-h-screen mt-10 lg:px-10 px-8 bg-black flex flex-col lg:gap-0 gap-10">

          <div className="div w-full lg:h-[550px] h-[300px] rounded-3xl overflow-hidden sticky top-37 z-10">
            <video autoPlay muted loop playsInline preload="metadata" className='w-full h-full object-cover rounded-3xl '>
              <source src="videos/bg-video/Video2.mp4" type="video/mp4" />
            </video>
            <div className="video-overlay rounded-3xl overflow-hidden w-full h-full bg-linear-180 from-transparent via-black/20 to-black/90 absolute top-0">
              <h1 className='text-white lg:text-[80px] text-[30px] font-bold absolute lg:bottom-10 lg:left-10 bottom-3 left-3 uppercase font1 lg:leading-[75px] leading-9 tracking-wide'>DETAILS SPEAK LOUDEST, <br /> WHEN THE FRAME IS TIGHT.
              </h1>
            </div>
          </div>


          <div className="div w-full lg:h-[550px] h-[300px] rounded-3xl overflow-hidden sticky top-37 z-10">
            <video autoPlay muted loop playsInline preload="metadata" className='w-full h-full object-cover rounded-3xl '>
              <source src="videos/bg-video/Video1.mp4" type="video/mp4" />
            </video>
            <div className="video-overlay w-full h-full bg-linear-180 from-black/10 via-black/20 to-black/90 absolute top-0">
              <h1 className='text-white lg:text-[80px] text-[22px] font-bold absolute lg:bottom-10 lg:left-10 bottom-3 left-3 uppercase font1 lg:leading-[75px] leading-6 tracking-wide'>MOVEMENT EXISTS IN EVERY aspect of <br /> our life,  and is the best way to tell a story.
              </h1>
            </div>
          </div>


          <div className="div w-full lg:h-[550px] h-[300px] rounded-3xl overflow-hidden sticky top-37 z-10">
            <video autoPlay muted loop playsInline preload="metadata" className='w-full h-full object-cover rounded-3xl '>
              <source src="videos/bg-video/Video3.mp4" type="video/mp4" />
            </video>
            <div className="video-overlay w-full h-full bg-linear-180 from-black/10 via-black/20 to-black/90 absolute top-0">
              <h1 className='text-white lg:text-[80px] text-[30px] font-bold absolute lg:bottom-10 lg:left-10 bottom-3 left-3 uppercase font1 lg:leading-[75px] leading-9 tracking-wide'>  SHOT DEFINES WHAT WE SEE,<br />MOVEMENT DEFINES HOW WE FEEL.
              </h1>
            </div>
          </div>

        </div>
















        {/* 
        <div className='w-full px-10 py-10  lg:pt-18'>
          <h1 data-aos="fade-right" data-aos-duration="800" data-aos-offset="120" className='text-[#c7c7c7] lg:text-6xl text-[24px] text-left font3'>What <span className='text-[#53f9f9]'>Filmmakers</span> say?</h1>

          <div className="main flex  justify-center relative h-140 w-full -mt-40 -ml-40 lg:ml-0 lg:mt-0 pl-10 lg:scale-100 scale-29">
            <div className="fm w-full relative h-full pt-20">

              <button className="fm-one h-[400px] scale-70 absolute left-0" data-aos="fade-left" data-aos-easing="linear" data-aos-delay="1200" data-aos-duration="200" data-aos-offset="120">
                <div className="image-div w-[265px] h-[350px] overflow-hidden relative rounded-xl">
                  <img src="/images/1000025522.jpg" className='absolute' alt="" />
                </div>
                <div className="title mt-3 px-2 text-left">
                  <h1 className='font3 text-[15px]  text-[#c1c1c1] font-semibold'>Kamal Hassan</h1>
                  <p className='font3 text-[#696969] text-sm'>Director / Actor</p>
                </div>
              </button>

              <button className="fm-one h-[400px] scale-85 absolute left-50" data-aos="fade-left" data-aos-easing="linear" data-aos-delay="900" data-aos-duration="200" data-aos-offset="120">
                <div className="image-div w-[265px] h-[350px] overflow-hidden relative rounded-xl">
                  <img src="/images/1000025516 (1).jpg" className='absolute' alt="" />
                </div>
                <div className="title mt-3 px-2 text-left">
                  <h1 className='font3 text-[15px] text-[#c1c1c1] font-semibold'>Christopher Nolan</h1>
                  <p className='font3 text-[#696969] text-sm'>Director</p>
                </div>
              </button>

              <button className="fm-one h-[400px] scale-100 absolute left-110" data-aos="fade-left" data-aos-easing="linear" data-aos-delay="600" data-aos-duration="200" data-aos-offset="120">
                <div className="image-div w-[265px] h-[350px] overflow-hidden relative rounded-xl">
                  <img src="/images/Hoyte.jpg" className='absolute' alt="" />
                </div>
                <div className="title mt-3 px-2 text-left">
                  <h1 className='font3 text-[15px]  text-[#c1c1c1] font-semibold'>Hoyte Van Hoytema</h1>
                  <p className='font3 text-[#696969] text-sm'>Cinematographer</p>
                </div>
              </button>

              <button className="fm-one h-[400px] scale-115 absolute left-175" data-aos="fade-left" data-aos-easing="linear" data-aos-delay="300" data-aos-duration="200" data-aos-offset="120">
                <div className="image-div w-[265px] h-[350px] overflow-hidden relative rounded-xl">
                  <img src="https://i.pinimg.com/1200x/4a/8e/aa/4a8eaaedd8da8b286e8e9a0634c951ed.jpg" className='absolute h-full' alt="" />
                </div>
                <div className="title mt-3 px-2 text-left">
                  <h1 className='font3 text-[15px]  text-[#c1c1c1] font-semibold'>Martin Scorsese</h1>
                  <p className='font3 text-[#696969] text-sm'>Director</p>
                </div>
              </button>

              <button className="fm-one h-[400px] scale-130 absolute left-250 " data-aos="fade-left" data-aos-easing="linear" data-aos-duration="200" data-aos-offset="120"  >
                <div className="image-div w-[265px] h-[350px] overflow-hidden relative rounded-xl">
                  <img src="https://i.pinimg.com/1200x/f7/2e/f6/f72ef6e12f30cb127aecaea603877e8d.jpg" className='absolute w-full bottom-0' alt="" />
                </div>
                <div className="title mt-3 px-2 text-left">
                  <h1 className='font3 text-[15px] text-[#c1c1c1] font-semibold'>David Fincher</h1>
                  <p className='font3 text-[#696969] text-sm'>Director</p>
                </div>
              </button>


            </div>
          </div>
        </div>


 */}


        {/* <div className='w-full h-screen lg:px-10 py-10 lg:mt-0 -mt-50 '>

          <div className="box w-full h-full lg:overflow-hidden relative flex flex-col">
            <img src="https://wallpapercave.com/wp/wp13691969.jpg" className='w-full lg:h-auto h-full object-cover lg:absolute -top-40' alt="" />

            <div className="overlay absolute top-0 left-0 lg:backdrop-blur-[25px] bg-[#000000d5] lg:w-1/2 w-full h-full">
              <div className="head lg:flex p-4 gap-4 bg-black lg:bg-transparent px-10 lg:px-4">
                <img src="https://i.pinimg.com/1200x/32/d3/80/32d3808a81cfc5ea95286c3266aacad0.jpg" className=' shadow-2xl lg:w-70 ' alt="" />
                <div className="image-div lg:w-360 w-full ">
                  <p className='text-[#b9b9b9] lg:text-[16px] text-[14px] font-light font3 lg:mr-8 lg:ml-4 mt-10 text-justify relative'>"Every film should have its own world, a logic and feel to it that expands beyond the exact image that the audience is seeing.
                    I favours practical effects over computer-generated imagery, and is a proponent of theatrical exhibition."
                    <span className='text-[#b9b9b9] text-[19px] font3 mt-9 tracking-wide text-right absolute right-0 '>- Christopher Nolan</span>
                  </p>
                </div>
              </div>
              <div className="bottom lg:h-66 lg:flex lg:px-4 px-10 py-4 pt-15 lg:pt-4 lg:gap-6 gap-3 bg-black lg:bg-transparent grid grid-cols-2">
                <img src="https://a.ltrbxd.com/resized/film-poster/7/8/4/3/2/8/784328-oppenheimer-0-2000-0-3000-crop.jpg?v=e3c6e7a32c" className='h-full img-mv shadow-2xl' alt="" />
                <img src="https://a.ltrbxd.com/resized/sm/upload/pq/9f/sr/vt/aCIFMriQh8rvhxpN1IWGgvH0Tlg-0-2000-0-3000-crop.jpg?v=f3165fe17f" className='h-full img-mv shadow-2xl' alt="" />
                <img src="https://a.ltrbxd.com/resized/sm/upload/78/y5/zg/ej/oefdD26aey8GPdx7Rm45PNncJdU-0-2000-0-3000-crop.jpg?v=2d0ce4be25" className='h-full img-mv shadow-2xl' alt="" />
                <img src="https://a.ltrbxd.com/resized/sm/upload/sv/95/s9/4j/inception-0-2000-0-3000-crop.jpg?v=30d7224316" className='h-full img-mv shadow-2xl' alt="" />
              </div>
            </div>

            <div className="right-div lg:w-1/2 w-full h-full lg:h-full lg:absolute lg:bg-[#00000088] lg:backdrop-blur-[6px] right-0 py-3 px-20 lg:flex flex-col hidden gap-3">
              <div className="img-div w-full h-1/4 overflow-hidden relative">
                <img src="/images/I2.jpg" alt="" className='absolute' />
                <h1 className='text-[#ababab] text-2xl absolute right-4 font1 tracking-wide text-shadow-2xs bottom-0 uppercase'>Inception</h1>
              </div>

              <div className="img-div w-full h-1/4 overflow-hidden relative">
                <img src="/images/I1.jpg" alt="" className='absolute' />
                <h1 className='text-[#ababab] text-2xl absolute right-4 font1 tracking-wide text-shadow-2xs bottom-0 uppercase'>The Dark Knight</h1>
              </div>

              <div className="img-div w-full h-1/4 overflow-hidden relative">
                <img src="/images/I3.jpg" alt="" className='absolute' />
                <h1 className='text-[#ababab] text-2xl absolute right-4 font1 tracking-wide text-shadow-2xs bottom-0 uppercase'>Interstellar</h1>
              </div>

              <div className="img-div w-full h-1/4 overflow-hidden relative">
                <img src="/images/I4.png" alt="" className='absolute -bottom-12' />
                <h1 className='text-[#ababab] text-2xl absolute right-4 font1 tracking-wide text-shadow-2xs bottom-0 uppercase'>TENET</h1>
              </div>
            </div>
          </div>
        </div> */}

        {/* <div className='lg:hidden h-screen w-full mt-145 px-10'>
          <div className="right-div  w-full h-full bg-[#00000088] flex flex-col gap-3">
            <div className="img-div w-full h-1/4 overflow-hidden relative">
              <img src="/images/I2.jpg" alt="" className='absolute' />
              <h1 className='text-[#ababab] text-2xl absolute right-4 font1 tracking-wide text-shadow-2xs bottom-0 uppercase'>Inception</h1>
            </div>

            <div className="img-div w-full h-1/4 overflow-hidden relative">
              <img src="/images/I1.jpg" alt="" className='absolute' />
              <h1 className='text-[#ababab] text-2xl absolute right-4 font1 tracking-wide text-shadow-2xs bottom-0 uppercase'>The Dark Knight</h1>
            </div>

            <div className="img-div w-full h-1/4 overflow-hidden relative">
              <img src="/images/I3.jpg" alt="" className='absolute' />
              <h1 className='text-[#ababab] text-2xl absolute right-4 font1 tracking-wide text-shadow-2xs bottom-0 uppercase'>Interstellar</h1>
            </div>

            <div className="img-div w-full h-1/4 overflow-hidden relative">
              <img src="/images/I4.png" alt="" className='absolute ' />
              <h1 className='text-[#ababab] text-2xl absolute right-4 font1 tracking-wide text-shadow-2xs bottom-0 uppercase'>TENET</h1>
            </div>
          </div>
        </div> */}


        <div className="w-full min-h-screen bg-black relative">
          <div className='flex flex-col items-center justify-center w-full min-h-screen '>
            <h1 className='font0 h-dvh w-full flex items-center justify-center text-[white] text-center lg:text-[80px] md:text-[40px] text-[20px] font-semibold sticky lg:top-7 md:top-0 top-35 lg:leading-20' style={{ wordSpacing: '10px' }}>
              FRAMES NEVER STOPS MOVING, <br />
              NEITHER SHOULD THE STORY.
            </h1>

            <div className="w-full min-h-600 pt-70 px-20 relative">
              <div className='w-[430px] h-[300px] lg:scale-100 md:scale-70 scale-60 overflow-hidden rounded-2xl absolute lg:left-auto md:-left-5 -left-10'>
                <img src="https://framerusercontent.com/images/2olpYlBrGj88QeQzvkJC2OUz38.jpg?scale-down-to=512" className='w-full h-full object-cover' alt="" />
              </div>

              <div className='w-[460px] h-[310px] lg:scale-100 md:scale-70 scale-60 overflow-hidden rounded-2xl absolute lg:right-10 md:-right-5 -right-10 mt-60'>
                <img src="https://framerusercontent.com/images/q8qKuN2rjMEVaM7WICNWlsGw.png?scale-down-to=512" className='w-full h-full object-cover' alt="" />
              </div>

              <div className='w-[360px] h-[280px] lg:scale-100 md:scale-70 scale-60 overflow-hidden rounded-2xl absolute lg:left-110 md:-left-5 -left-10 mt-130'>
                <img src="https://framerusercontent.com/images/zERweaOj4OiBcnXVNMcV3ZX9X44.png?scale-down-to=512" className='w-full h-full object-cover' alt="" />
              </div>

              <div className='w-[360px] h-[280px] lg:scale-100 md:scale-70 scale-60 overflow-hidden rounded-2xl absolute lg:left-20 md:-right-5 lg:mt-230 md:mt-200 mt-190'>
                <img src="https://framerusercontent.com/images/xUX5UArtB0Tt1SzYx6ZrgvyjeiQ.png?scale-down-to=512" className='w-full h-full object-cover' alt="" />
              </div>

              <div className='w-[560px] h-[280px] lg:scale-100 md:scale-70 scale-60 overflow-hidden rounded-2xl absolute md:right-20 -right-16 md:mt-265 mt-250'>
                <img src="https://framerusercontent.com/images/zYtwp6Vpddak6qCv7wgdwOA26zA.png" className='w-full h-full object-cover' alt="" />
              </div>
            </div>


            <div className='lg:h-60 h-40 w-full flex gap-5 lg:mt-40 overflow-hidden'>
              <div className='scroll-div flex gap-5 w-max'>
                <div className="vid-one lg:min-w-90 min-w-50 h-full overflow-hidden">
                  <img src="https://i.pinimg.com/1200x/43/cd/5a/43cd5a1c24d97fc6b3ffd4ec43d325f3.jpg" className='w-full h-full object-cover' alt="" />
                </div>
                <div className="vid-one lg:min-w-90 min-w-50 h-full overflow-hidden">
                  <img src="https://i.pinimg.com/1200x/22/0f/37/220f3704b091ceffc6068a819d3a322e.jpg" className='w-full h-full object-cover' alt="" />
                </div>
                <div className="vid-one lg:min-w-90 min-w-50 h-full overflow-hidden">
                  <img src="https://i.pinimg.com/1200x/ab/93/99/ab9399d4928087e66e3db782b554c70b.jpg" className='w-full h-full object-cover' alt="" />
                </div>
                <div className="vid-one lg:min-w-90 min-w-50 h-full overflow-hidden">
                  <img src="https://img.buzzfeed.com/buzzfeed-static/static/2015-08/3/7/enhanced/webdr03/original-7427-1438602891-3.png?downsize=800%3A*&output-format=auto&output-quality=auto&epik=dj0yJnU9NVU3YVRWWjBkZGt6U21tUVc0UEZXT1l3VnA5ZjBoMkMmcD0wJm49Vjc4MmNtWmZzSk1yWkpuTklLTVdvUSZ0PUFBQUFBR2xqVmRN" className='w-full h-full object-cover' alt="" />
                </div>
                <div className="vid-one lg:min-w-90 min-w-50 h-full overflow-hidden">
                  <img src="https://i.pinimg.com/736x/a6/45/10/a64510c3d4adccbe3972df7055c9d671.jpg" className='w-full h-full object-cover' alt="" />
                </div>
                <div className="vid-one lg:min-w-90 min-w-50 h-full overflow-hidden">
                  <img src="https://i.pinimg.com/1200x/5b/35/34/5b35344022585bb139ee83a3db686275.jpg" className='w-full h-full object-cover' alt="" />
                </div>
                <div className="vid-one lg:min-w-90 min-w-50 h-full overflow-hidden">
                  <img src="https://i.pinimg.com/1200x/e8/a9/bd/e8a9bdd16429cb2f370ba6323f2ce6ff.jpg" className='w-full h-full object-cover' alt="" />
                </div>
                <div className="vid-one lg:min-w-90 min-w-50 h-full overflow-hidden">
                  <img src="https://i.pinimg.com/736x/8c/c5/eb/8cc5eb9b8d421b31c66d2b3958ea0566.jpg" className='w-full h-full object-cover' alt="" />
                </div>
              </div>

              <div className='scroll-div flex gap-5 w-max'>
                <div className="vid-one lg:min-w-90 min-w-50 h-full overflow-hidden">
                  <img src="https://i.pinimg.com/1200x/43/cd/5a/43cd5a1c24d97fc6b3ffd4ec43d325f3.jpg" className='w-full h-full object-cover' alt="" />
                </div>
                <div className="vid-one lg:min-w-90 min-w-50 h-full overflow-hidden">
                  <img src="https://i.pinimg.com/1200x/22/0f/37/220f3704b091ceffc6068a819d3a322e.jpg" className='w-full h-full object-cover' alt="" />
                </div>
                <div className="vid-one lg:min-w-90 min-w-50 h-full overflow-hidden">
                  <img src="https://i.pinimg.com/1200x/ab/93/99/ab9399d4928087e66e3db782b554c70b.jpg" className='w-full h-full object-cover' alt="" />
                </div>
                <div className="vid-one lg:min-w-90 min-w-50 h-full overflow-hidden">
                  <img src="https://img.buzzfeed.com/buzzfeed-static/static/2015-08/3/7/enhanced/webdr03/original-7427-1438602891-3.png?downsize=800%3A*&output-format=auto&output-quality=auto&epik=dj0yJnU9NVU3YVRWWjBkZGt6U21tUVc0UEZXT1l3VnA5ZjBoMkMmcD0wJm49Vjc4MmNtWmZzSk1yWkpuTklLTVdvUSZ0PUFBQUFBR2xqVmRN" className='w-full h-full object-cover' alt="" />
                </div>
                <div className="vid-one lg:min-w-90 min-w-50 h-full overflow-hidden">
                  <img src="https://i.pinimg.com/736x/a6/45/10/a64510c3d4adccbe3972df7055c9d671.jpg" className='w-full h-full object-cover' alt="" />
                </div>
                <div className="vid-one lg:min-w-90 min-w-50 h-full overflow-hidden">
                  <img src="https://i.pinimg.com/1200x/5b/35/34/5b35344022585bb139ee83a3db686275.jpg" className='w-full h-full object-cover' alt="" />
                </div>
                <div className="vid-one lg:min-w-90 min-w-50 h-full overflow-hidden">
                  <img src="https://i.pinimg.com/1200x/e8/a9/bd/e8a9bdd16429cb2f370ba6323f2ce6ff.jpg" className='w-full h-full object-cover' alt="" />
                </div>
                <div className="vid-one lg:min-w-90 min-w-50 h-full overflow-hidden">
                  <img src="https://i.pinimg.com/736x/8c/c5/eb/8cc5eb9b8d421b31c66d2b3958ea0566.jpg" className='w-full h-full object-cover' alt="" />
                </div>
              </div>
            </div>

          </div>
        </div>





        <div>
          <div className='min-h-screen w-full mt-30 gap-2 flex md:flex-row flex-col items-center justify-center sticky top-15'>
            <div data-aos="fade-up" data-aos-duration="900" data-aos-offset="-50" data-aos-delay="-100" className='lg:w-98 md:w-50 w-90 lg:h-130 md:h-50 h-75 rounded-2xl overflow-hidden group z-10 md:block hidden'>
              <img src="https://framerusercontent.com/images/2olpYlBrGj88QeQzvkJC2OUz38.jpg?scale-down-to=512" className='w-full h-full object-cover group-hover:scale-105 transition ease-in-out duration-500' />
            </div>

            <div className="left md:w-1/2 w-full h-full md:absolute relative left-0 flex flex-col">
              <div data-aos="fade-up" data-aos-duration="700" data-aos-offset="300" data-aos-delay="400" className="top h-1/2 md:w-140 flex flex-col lg:scale-100 md:scale-70 items-center justify-center md:absolute lg:left-0 md:-left-35 top-5">
                <h1 className='text-white/30 text-[150px] font1 font-semibold'>01</h1>
                <div className='-mt-40 flex flex-col pt-15 bg-linear-180 from-black/0 via-black to-black'>
                  <h1 className='text-white text-[50px] font0 font-semibold text-center'>VISION</h1>
                  <p className='-mt-2 text-white/80 text-[13px] w-90 text-center'>Our vision is to help filmmakers see cinema beyond tools and techniques. We focus on the purpose, emotion, and meaning behind every visual choice.</p>
                </div>
              </div>

              <div data-aos="fade-up" data-aos-duration="700" data-aos-offset="50" data-aos-delay="1000" className="bottom h-1/2 md:w-140 flex flex-col lg:scale-100 md:scale-70 items-center justify-center md:absolute lg:left-0 md:-left-35 bottom-10">
                <h1 className='text-white/30 text-[150px] font1 font-semibold'>03</h1>
                <div className='-mt-40 flex flex-col pt-15 bg-linear-180 from-black/0 via-black to-black'>
                  <h1 className='text-white text-[50px] font0 font-semibold text-center'>TRUST</h1>
                  <p className='-mt-2 text-white/80 text-[13px] w-90 text-center'>Film Pulse is built on accuracy, clarity, and respect for the art of filmmaking. Every explanation is carefully structured to reflect real industry practices and storytelling logic.</p>
                </div>
              </div>
            </div>


            <div className="right md:w-1/2  w-full h-full md:absolute relative lg:right-10 md:right-0 flex flex-col">
              <div data-aos="fade-up" data-aos-duration="700" data-aos-offset="300" data-aos-delay="700" className="top h-1/2 lg:w-140 flex flex-col lg:scale-100 md:scale-70  items-center justify-center md:absolute lg:right-0 md:-right-10 top-5">
                <h1 className='text-white/30 text-[150px] font1 font-semibold'>02</h1>
                <div className='-mt-40 flex flex-col pt-15 bg-linear-180 from-black/0 via-black to-black'>
                  <h1 className='text-white text-[50px] font0 font-semibold text-center'>CRAFT</h1>
                  <p className='-mt-2 text-white/80 text-[13px] w-90 text-center'>Craft is where knowledge meets practice. Film Pulse breaks down complex filmmaking techniques into clear, usable insights grounded in real cinematic situations.</p>
                </div>
              </div>
              <div data-aos="fade-up" data-aos-duration="700" data-aos-offset="50" data-aos-delay="1300" className="bottom h-1/2 lg:w-140 flex flex-col lg:scale-100 md:scale-70  items-center justify-center md:absolute lg:right-0 md:-right-10 bottom-10">
                <h1 className='text-white/30 text-[150px] font1 font-semibold'>04</h1>
                <div className='-mt-40 flex flex-col pt-15 bg-linear-180 from-black/0 via-black to-black'>
                  <h1 className='text-white text-[50px] font0 font-semibold text-center'>ENERGY</h1>
                  <p className='-mt-2 text-white/80 text-[13px] w-90 text-center'>Cinema is movement, rhythm, and emotion—and Film Pulse carries that same energy. The platform is designed to inspire curiosity, creativity, and continuous exploration.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="blank w-full h-100"></div>
        </div>

        <div className="tutorial-section w-full mt-25 px-10">
          <h1 className='text-white/80 lg:text-[90px] text-[30px] font-bold font0 tracking-wide border-b-2 border-[#ccc]'>TUTORIALS</h1>

          <div className='w-full grid lg:grid-cols-3 md:grid-cols-2 mt-13 gap-7'>

            <div data-aos="fade-up" data-aos-duration="700" className='h-80 overflow-hidden group flex items-center justify-center relative'>
              <img src="https://framerusercontent.com/images/2nmoFrxiQPkVKjCROmvKqLCU.jpg?scale-down-to=1024" className='w-full h-full object-cover group-hover:scale-105 transition duration-400' alt="" />
              <div className='absolute h-full w-full bg-black/60 opacity-0 group-hover:opacity-100 transition duration-400'></div>
              <div className='absolute font3 text-[18px] bg-black/10 border-2 border-white/60 backdrop-blur-2xl rounded-full px-3 py-3 flex items-center justify-center gap-3 opacity-0 hover:bg-white/10 group-hover:opacity-100 transition duration-400'>
                <a href="https://youtu.be/IiyBo-qLDeM?si=Uf0X7Ycqog18crgK" target='_blank'>
                  <div className='flex items-center justify-center gap-3'>
                    <FaPlay className='bg-white h-10 w-10 rounded-full text-black p-3' />
                    <h1 className='text-white'>Play on Youtube</h1>
                  </div>
                </a>
              </div>
              <div className="w-full h-14 backdrop-blur-[10px] bg-black/60 absolute left-0 bottom-0 ">
                <h1 className='flex items-center justify-center h-full text-[20px] font3 text-white font-bold uppercase group-hover:bg-white group-hover:text-black transition duration-400 tracking-wide'>Camera Movements</h1>
              </div>
            </div>

            <div data-aos="fade-up" data-aos-duration="700" data-aos-delay="200" className='h-80 overflow-hidden group flex items-center justify-center relative'>
              <img src="https://framerusercontent.com/images/nf6EmimLrAFbDOaqQe8sLr1SKBM.jpg?scale-down-to=512" className='w-full h-full object-cover group-hover:scale-105 transition duration-400' alt="" />
              <div className='absolute h-full w-full bg-black/60 opacity-0 group-hover:opacity-100 transition duration-400'></div>
              <div className='absolute font3 text-[18px] bg-black/10 border-2 border-white/60 backdrop-blur-2xl rounded-full px-3 py-3 flex items-center justify-center gap-3 opacity-0 hover:bg-white/10 group-hover:opacity-100 transition duration-400'>
                <a href="https://youtu.be/TKXBAaQB03U?si=waXUqPHxGEnjSL0p" target='_blank'>
                  <div className='flex items-center justify-center gap-3'>
                    <FaPlay className='bg-white h-10 w-10 rounded-full text-black p-3' />
                    <h1 className='text-white'>Play on Youtube</h1>
                  </div>
                </a>
              </div>
              <div className="w-full h-14 backdrop-blur-[10px] bg-black/60 absolute left-0 bottom-0 ">
                <h1 className='flex items-center justify-center h-full text-[20px] font3 text-white font-bold uppercase group-hover:bg-white group-hover:text-black transition duration-400 tracking-wide'>Editing Technique</h1>
              </div>
            </div>

            <div data-aos="fade-up" data-aos-duration="700" data-aos-delay="400" className='h-80 overflow-hidden group flex items-center justify-center relative'>
              <img src="https://framerusercontent.com/images/8JizG5wDsrzt8nhHrdJKE4qoY98.jpg?scale-down-to=512" className='w-full h-full object-cover group-hover:scale-105 transition duration-400' alt="" />
              <div className='absolute h-full w-full bg-black/60 opacity-0 group-hover:opacity-100 transition duration-400'></div>
              <div className='absolute font3 text-[18px] bg-black/10 border-2 border-white/60 backdrop-blur-2xl rounded-full px-3 py-3 flex items-center justify-center gap-3 opacity-0 hover:bg-white/10 group-hover:opacity-100 transition duration-400'>
                <a href="https://youtu.be/wLfZL9PZI9k?si=819K-X7H54xve-8b" target='_blank'>
                  <div className='flex items-center justify-center gap-3'>
                    <FaPlay className='bg-white h-10 w-10 rounded-full text-black p-3' />
                    <h1 className='text-white'>Play on Youtube</h1>
                  </div>
                </a>
              </div>
              <div className="w-full h-14 backdrop-blur-[10px] bg-black/60 absolute left-0 bottom-0 ">
                <h1 className='flex items-center justify-center h-full text-[20px] font3 text-white font-bold uppercase group-hover:bg-white group-hover:text-black transition duration-400 tracking-wide'>Camera Angles</h1>
              </div>
            </div>

            <div data-aos="fade-up" data-aos-duration="700" data-aos-delay="400" data-aos-offset="-100" className='h-80 overflow-hidden group flex items-center justify-center relative'>
              <img src="https://framerusercontent.com/images/OdJ6rMGXMGD9QZYeL6UM5VVy99s.png" className='w-full h-full object-cover group-hover:scale-105 transition duration-400' alt="" />
              <div className='absolute h-full w-full bg-black/60 opacity-0 group-hover:opacity-100 transition duration-400'></div>
              <div className='absolute font3 text-[18px] bg-black/10 border-2 border-white/60 backdrop-blur-2xl rounded-full px-3 py-3 flex items-center justify-center gap-3 opacity-0 hover:bg-white/10 group-hover:opacity-100 transition duration-400'>
                <a href="https://youtu.be/uSsIqR3DuK8?si=B2bmC4UaxRatxI4h" target='_blank'>
                  <div className='flex items-center justify-center gap-3'>
                    <FaPlay className='bg-white h-10 w-10 rounded-full text-black p-3' />
                    <h1 className='text-white'>Play on Youtube</h1>
                  </div>
                </a>
              </div>
              <div className="w-full h-14 backdrop-blur-[10px] bg-black/60 absolute left-0 bottom-0 ">
                <h1 className='flex items-center justify-center h-full text-[20px] font3 text-white font-bold uppercase group-hover:bg-white group-hover:text-black transition duration-400 tracking-wide'>Lens & Depths</h1>
              </div>
            </div>

            <div data-aos="fade-up" data-aos-duration="700" data-aos-delay="600" data-aos-offset="-100" className='h-80 overflow-hidden group flex items-center justify-center relative'>
              <img src="https://i.pinimg.com/1200x/cd/68/aa/cd68aa257b0310cc65237e3e3b5b1a27.jpg" className='w-full h-full object-cover group-hover:scale-105 transition duration-400' alt="" />
              <div className='absolute h-full w-full bg-black/60 opacity-0 group-hover:opacity-100 transition duration-400'></div>
              <div className='absolute font3 text-[18px] bg-black/10 border-2 border-white/60 backdrop-blur-2xl rounded-full px-3 py-3 flex items-center justify-center gap-3 opacity-0 hover:bg-white/10 group-hover:opacity-100 transition duration-400'>
                <a href="https://youtu.be/7lUFluLOh-s?si=63FQrkCLQv9v2X50" target='_blank'>
                  <div className='flex items-center justify-center gap-3'>
                    <FaPlay className='bg-white h-10 w-10 rounded-full text-black p-3' />
                    <h1 className='text-white'>Play on Youtube</h1>
                  </div>
                </a>
              </div>
              <div className="w-full h-14 backdrop-blur-[10px] bg-black/60 absolute left-0 bottom-0 ">
                <h1 className='flex items-center justify-center h-full text-[20px] font3 text-white font-bold uppercase group-hover:bg-white group-hover:text-black transition duration-400 tracking-wide'>Frame Rates</h1>
              </div>
            </div>

            <div data-aos="fade-up" data-aos-duration="700" data-aos-delay="800" data-aos-offset="-100" className='h-80 overflow-hidden group flex items-center justify-center relative'>
              <img src="https://framerusercontent.com/images/ayAcEMvjlSidVhk6XZISahgNPT4.jpg?scale-down-to=512&width=3936&height=2624" className='w-full h-full object-cover group-hover:scale-105 transition duration-400' alt="" />
              <div className='absolute h-full w-full bg-black/60 opacity-0 group-hover:opacity-100 transition duration-400'></div>
              <div className='absolute font3 text-[18px] bg-black/10 border-2 border-white/60 backdrop-blur-2xl rounded-full px-3 py-3 flex items-center justify-center gap-3 opacity-0 hover:bg-white/10 group-hover:opacity-100 transition duration-400'>
                <a href="https://youtu.be/r2nD_knsNrc?si=j_pXK7hMxVhikrro" target='_blank'>
                  <div className='flex items-center justify-center gap-3'>
                    <FaPlay className='bg-white h-10 w-10 rounded-full text-black p-3' />
                    <h1 className='text-white'>Play on Youtube</h1>
                  </div>
                </a>
              </div>
              <div className="w-full h-14 backdrop-blur-[10px] bg-black/60 absolute left-0 bottom-0 ">
                <h1 className='flex items-center justify-center h-full text-[20px] font3 text-white font-bold uppercase group-hover:bg-white group-hover:text-black transition duration-400 tracking-wide'>Cinematic Lighting</h1>
              </div>
            </div>

          </div>
        </div>
      </div>




      <div className="footer w-full h-90 bg-transparent z-0 "></div>

      <Footer />
    </div>
  )
}

export default Home
