import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

function About() {
    return (
        <div>

            <div className='bg-black w-full py-30 min-h-screen'>
                <div className='box flex lg:flex-row gap-10 flex-col w-full py-10 px-10'>
                    <div className='w-full text-center flex flex-col items-center gap-10 relative'>
                        <h1 data-aos="fade-up" data-aos-duration="1000" className='text-[white] flex flex-col lg:text-[100px] text-[30px] font0 font-bold lg:leading-27 leading-13 sticky top-40 '>MORE ABOUT
                            <span data-aos="fade-up" data-aos-delay="400" data-aos-duration="1000" className='text-[cyan] lg:text-[140px] text-[50px] font0 font-bold'>FILM PULSE</span>
                        </h1>

                        <div className='bg-linear-180 from-black/0 via-black to-black w-full z-4 lg:mt-20 flex flex-col gap-20 items-center justify-center'>
                            <div data-aos="slide-up" data-aos-delay="600" data-aos-duration="1300" className="lg:w-[30%] lg:h-[530px] w-[95%] md:h-[300px] md:w-[60%] h-[360px] overflow-hidden group rounded-2xl">
                                <img src="https://i.pinimg.com/736x/19/8a/66/198a664089a7553cbdfa04f8951962d4.jpg" className='w-full h-full object-cover group-hover:scale-105 transition duration-500' alt="" />
                            </div>
                            <div className='w-full z-4 flex flex-col items-center justify-center -mt-10 lg:mt-0'>
                                <h1 className='text-[white] lg:text-[25px] text-[15px] font0 font-bold uppercase lg:leading-8 lg:w-280' style={{ wordSpacing: '7px' }}> <span className='text-[cyan]'>Film Pulse</span> is an interactive learning platform designed for filmmakers, cinematography students, and visual storytellers who want to understand the language of cinema beyond just watching films.</h1>
                                <p className='text-[white]/70 flex flex-col lg:text-[15px] text-[10px] font3 mt-7 font-light lg:w-7xl'>The platform focuses on breaking down complex filmmaking techniques into simple, structured, and practical explanations that are easy to learn and apply.
                                    <br className='hidden lg:flex'/> Unlike traditional learning resources that rely heavily on theory, Film Pulse emphasizes visual understanding how camera movements, shot types, lenses, and cinematic techniques influence emotion, storytelling, and audience perception.</p>
                                <Link to={'/cinematography'}><button data-aos="fade-up" data-aos-duration="1000" data-aos-offset="-100"  className='bg-white px-10 py-3 text-[17px] rounded-full mt-7 font0 font-semibold cursor-pointer border-2 border-white hover:bg-[black] hover:text-[white] transition duration-250' style={{ wordSpacing: '3px' }}>SEE ABOUT TECHNIQUES</button></Link>
                            </div>
                        </div>

                    </div>
                </div>

                <div className='bg-black w-full lg:px-20 lg:pt-36 px-8 pt-3'>
                    <h1 className='text-white font0 lg:text-[110px] text-[30px] font-bold lg:leading-23'>WHY <br />FILMPULSE ?</h1>
                    <h1 className='text-white/70 font3 lg:text-[16px] text-[12px] lg:mt-10 mt-4 text-justify'>Modern filmmakers often struggle to find a single platform that explains why and when a technique is used rather than just how. Film Pulse was created to bridge this gap by combining technical knowledge with emotional and narrative context.
                        Many learning resources focus heavily on equipment specifications or step-by-step execution, but they rarely address the creative intention behind cinematic choices. Film Pulse goes beyond surface-level explanations by exploring the reasoning behind each technique—why a filmmaker chooses a slow dolly instead of a handheld shot, or how a subtle camera movement can shift the audience’s emotional perspective.
                        Understanding filmmaking is not just about mastering tools; it is about understanding storytelling through visuals. Film Pulse helps learners recognize how camera movement, framing, and lens choices communicate emotions such as tension, intimacy, isolation, or power. By connecting technical execution with emotional impact, the platform enables users to think like visual storytellers rather than just operators.
                        Another challenge for modern filmmakers is the lack of real-world application examples. Film Pulse addresses this by presenting techniques alongside practical use cases and cinematic scenarios. This approach helps users visualize how techniques are applied in actual films, making learning more intuitive and memorable.
                        By blending theory with emotional reasoning and narrative purpose, Film Pulse creates a learning experience that mirrors how filmmaking works in practice. The platform encourages users to make intentional creative decisions, helping them develop a deeper understanding of cinema as a visual language rather than a collection of isolated techniques.</h1>
                    {/* <div className='flex items-center justify-between mt-15'>
                        <div className='h-10 flex items-center justify-center gap-4'>
                            <div className='flex items-center justify-center gap-2'>
                                <div className="rounded-full h-2 w-2 bg-white"></div>
                                <div className="rounded-full h-2 w-2 bg-white/40"></div>
                                <div className="rounded-full h-2 w-2 bg-white/40"></div>
                            </div>
                            <h1 className='text-white/70 font0 text-[16px]' style={{ wordSpacing: '3px' }}>Understand the purpose behind each technique</h1>
                        </div>
                        <div className='h-10 flex items-center justify-center gap-4'>
                            <div className='flex items-center justify-center gap-2'>
                                <div className="rounded-full h-2 w-2 bg-white"></div>
                                <div className="rounded-full h-2 w-2 bg-white"></div>
                                <div className="rounded-full h-2 w-2 bg-white/40"></div>
                            </div>
                            <h1 className='text-white/70 font0 text-[16px]' style={{ wordSpacing: '3px' }}>Learn real-world cinematic usage</h1>
                        </div>
                        <div className='h-10 flex items-center justify-center gap-4'>
                            <div className='flex items-center justify-center gap-2'>
                                <div className="rounded-full h-2 w-2 bg-white"></div>
                                <div className="rounded-full h-2 w-2 bg-white"></div>
                                <div className="rounded-full h-2 w-2 bg-white"></div>
                            </div>
                            <h1 className='text-white/70 font0 text-[16px]' style={{ wordSpacing: '3px' }}>Analyze how visuals affect storytelling and emotions</h1>
                        </div>
                    </div>
 */}




 

                    <div className='flex flex-col lg:flex-row items-center justify-between mt-15 gap-5'>
                        <Link to={'/cameramovements'} className='lg:w-1/3' data-aos="fade-up" data-aos-duration="700">
                            <div className="h-80 ">
                                <div className='h-[85%]  overflow-hidden'>
                                    <img src="https://i.pinimg.com/1200x/ab/93/99/ab9399d4928087e66e3db782b554c70b.jpg" className='h-full w-full object-cover hover:scale-105 transition duration-400' alt="" />
                                </div>
                                <h1 className='font0 text-[20px] font-semibold uppercase text-white/80 flex items-center h-[15%] ml-1'>Camera Movements</h1>
                            </div>
                        </Link>

                        <Link to={'/shottype'} className='lg:w-1/3' data-aos="fade-up" data-aos-duration="700" data-aos-delay="200">
                            <div className="h-80 ">
                                <div className='h-[85%]  overflow-hidden'>
                                    <img src="https://i.pinimg.com/736x/2b/6b/1e/2b6b1e6bc877a5a74f48b303bc971897.jpg" className='h-full w-full object-cover hover:scale-105 transition duration-400' alt="" />
                                </div>
                                <h1 className='font0 text-[20px] font-semibold uppercase text-white/80 flex items-center h-[15%] ml-1'>Shot Types</h1>
                            </div>
                        </Link>

                        <Link to={'/lens_depths'} className='lg:w-1/3' data-aos="fade-up" data-aos-duration="700" data-aos-delay="400">
                            <div className="h-80 ">
                                <div className='h-[85%]  overflow-hidden'>
                                    <img src="https://i.pinimg.com/1200x/ae/37/58/ae3758a6894ee346ead75f87d60b56d5.jpg" className='h-full w-full object-cover hover:scale-105 transition duration-400' alt="" />
                                </div>
                                <h1 className='font0 text-[20px] font-semibold uppercase text-white/80 flex items-center h-[15%] ml-1'>LENS & DEPTHS</h1>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="footer w-full h-90 bg-transparent z-0 "></div>

            <Footer />
        </div>
    )
}

export default About
