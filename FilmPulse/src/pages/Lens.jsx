
import React from 'react'
import { Link } from 'react-router-dom'
import { MoveRight } from 'lucide-react'

function Lens() {

    return (

        <div className="bg-black min-h-screen text-white pt-30 overflow-hidden">

            {/* ===================================== */}
            {/* HEADER */}
            {/* ===================================== */}

            <div className="head mt-10 flex flex-col items-center">

                <div className="flex items-center w-full px-5 sm:px-8 md:px-12 lg:px-20 relative">

                    <h1 className='text-3xl sm:text-4xl md:text-6xl font-bold tracking-wide font1 text-white/90'>
                        LENS & DEPTH
                    </h1>

                </div>

                <div className="line w-[92%] h-px mt-5 bg-[#555]"></div>

            </div>


            {/* ===================================== */}
            {/* INTRODUCTION */}
            {/* ===================================== */}

            <div className='px-5 sm:px-8 md:px-12 lg:px-20'>

                <p className='text-gray-400 mt-4 text-[12px] sm:text-[13px] md:text-[15px] leading-relaxed font3 text-justify'>

                    Lenses shape how a story feels. They determine scale, emotion, intimacy, and how the audience connects with the characters. Whether it’s the surreal stretch of an anamorphic lens or the honesty of a 35mm prime, lens choice defines the mood and language of cinematography.

                    Different lenses guide the viewer’s attention—wide lenses pull the audience into the world, making spaces feel larger and more dynamic, while telephoto lenses compress distance and draw focus toward subtle details or emotions. Depth of field also plays a major role: a shallow depth isolates a subject to create intimacy or tension, while deeper focus allows the environment to speak just as loudly as the characters.

                    Filmmakers choose lenses not just for technical reasons but for storytelling intent.

                </p>


                {/* ===================================== */}
                {/* LENS TYPES CARDS */}
                {/* ===================================== */}

                <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-3 mt-7'>


                    {/* Prime Lenses */}

                    <div className="bx w-full min-h-[240px] lg:h-72 border font3 border-[#555] px-4 pt-6 pb-14 relative">

                        <h1 className='text-xl sm:text-2xl uppercase font1 tracking-wider'>
                            Prime Lenses
                        </h1>

                        <p className='text-gray-400 text-[12px] md:text-[15px] text-justify mt-3'>
                            Prime lenses have a fixed focal length, offering sharper images, better low-light performance,
                            and a more cinematic look. Filmmakers use them for their clarity, natural depth, and ability to
                            create consistent visual style across scenes.
                        </p>

                        <Link to={''}>
                            <button className="font3 flex gap-2 text-[#aaaaaa] hover:text-[cyan] font-medium text-sm transition-all duration-75 absolute bottom-3">
                                View Shots
                                <MoveRight size={18} className='mt-[1.5px]' />
                            </button>
                        </Link>

                    </div>


                    {/* Zoom Lenses */}

                    <div className="bx w-full min-h-[240px] lg:h-72 border font3 border-[#555] px-4 pt-6 pb-14 relative">

                        <h1 className='text-xl sm:text-2xl uppercase font1 tracking-wider'>
                            Zoom Lenses
                        </h1>

                        <p className='text-gray-400 text-[12px] md:text-[15px] text-justify mt-3'>
                            Zoom lenses offer variable focal lengths, allowing filmmakers to move from wide to close-up
                            without changing the lens. They provide flexibility and speed on set, making them ideal for
                            quick framing adjustments that are essential.
                        </p>

                        <Link to={''}>
                            <button className="font3 flex gap-2 text-[#aaaaaa] hover:text-[cyan] font-medium text-sm transition-all duration-75 absolute bottom-3">
                                View Shots
                                <MoveRight size={18} className='mt-[1.5px]' />
                            </button>
                        </Link>

                    </div>


                    {/* Anamorphic Lenses */}

                    <div className="bx w-full min-h-[240px] lg:h-72 border font3 border-[#555] px-4 pt-6 pb-14 relative">

                        <h1 className='text-xl sm:text-2xl uppercase font1 tracking-wider'>
                            Anamorphic Lenses
                        </h1>

                        <p className='text-gray-400 text-[12px] md:text-[15px] text-justify mt-3'>
                            Anamorphic lenses squeeze the image on the sensor to create a wider cinematic frame.
                            They produce signature horizontal lens flares, oval bokeh, and a dramatic sense of scale,
                            making them popular for epic, immersive storytelling in films.
                        </p>

                        <Link to={''}>
                            <button className="font3 flex gap-2 text-[#aaaaaa] hover:text-[cyan] font-medium text-sm transition-all duration-75 absolute bottom-3">
                                View Shots
                                <MoveRight size={18} className='mt-[1.5px]' />
                            </button>
                        </Link>

                    </div>


                    {/* Spherical Lenses */}

                    <div className="bx w-full min-h-[240px] lg:h-72 border font3 border-[#555] px-4 pt-6 pb-14 relative">

                        <h1 className='text-xl sm:text-2xl uppercase font1 tracking-wider'>
                            Spherical Lenses
                        </h1>

                        <p className='text-gray-400 text-[12px] md:text-[15px] text-justify mt-3'>
                            Spherical lenses capture images without the horizontal compression that found in anamorphic lenses,
                            resulting in natural-looking frames with minimal distortion. They are widely used in filmmaking
                            for their clean, sharp image quality.
                        </p>

                        <Link to={''}>
                            <button className="font3 flex gap-2 text-[#aaaaaa] hover:text-[cyan] font-medium text-sm transition-all duration-75 absolute bottom-3">
                                View Shots
                                <MoveRight size={18} className='mt-[1.5px]' />
                            </button>
                        </Link>

                    </div>


                    {/* Tilt Shift Lenses */}

                    <div className="bx w-full min-h-[240px] lg:h-72 border font3 border-[#555] px-4 pt-6 pb-14 relative">

                        <h1 className='text-xl sm:text-2xl uppercase font1 tracking-wider'>
                            Tilt-shift Lenses
                        </h1>

                        <p className='text-gray-400 text-[12px] md:text-[15px] text-justify mt-3'>
                            These lenses allow filmmakers to control the perspective and depth of field in unique ways.
                            By tilting the lens, you can create selective focus that makes real scenes look miniature.
                            Shifting helps to correct the distortion in architecture.
                        </p>

                        <Link to={''}>
                            <button className="font3 flex gap-2 text-[#aaaaaa] hover:text-[cyan] font-medium text-sm transition-all duration-75 absolute bottom-3">
                                View Shots
                                <MoveRight size={18} className='mt-[1.5px]' />
                            </button>
                        </Link>

                    </div>


                    {/* Macro Lenses */}

                    <div className="bx w-full min-h-[240px] lg:h-72 border font3 border-[#555] px-4 pt-6 pb-14 relative">

                        <h1 className='text-xl sm:text-2xl uppercase font1 tracking-wider'>
                            Macro Lenses
                        </h1>

                        <p className='text-gray-400 text-[12px] md:text-[15px] text-justify mt-3'>
                            Macro lenses allow filmmakers to capture extremely close details that are invisible to the naked eye.
                            They reveal textures, patterns, and tiny movements with high clarity, making them ideal for shots of eyes,
                            insects, objects.
                        </p>

                        <Link to={''}>
                            <button className="font3 flex gap-2 text-[#aaaaaa] hover:text-[cyan] font-medium text-sm transition-all duration-75 absolute bottom-3">
                                View Shots
                                <MoveRight size={18} className='mt-[1.5px]' />
                            </button>
                        </Link>

                    </div>

                </div>

            </div>


            {/* ===================================== */}
            {/* FOCAL LENGTHS */}
            {/* ===================================== */}

            <div className="w-full px-5 sm:px-8 md:px-12 lg:px-20 pt-10 lg:pt-10 mt-10 lg:mt-20">

                <h1 className='text-3xl sm:text-4xl md:text-6xl font1 tracking-wide'>
                    FOCAL LENGTHS
                </h1>


                {/* First Focal Length Section */}

                <div className="fl-box w-full flex flex-col md:flex-col mt-6 lg:mt-8 items-center gap-6 lg:gap-12">

                    <div className="fl-para w-full lg:w-[65%]">

                        <p className='text-gray-400 text-[12px] md:text-[15px] text-justify leading-relaxed'>

                            <span>
                                In filmmaking, focal length is not just a technical specification — it is a storytelling choice. Wide lenses (14mm–35mm) create a sense of openness, tension, or intimacy with the surrounding space, making viewers feel immersed inside the environment. On the other hand, telephoto lenses (85mm–200mm and above) isolate characters, create emotional focus, and compress depth, which can make scenes feel more dramatic or visually stylized.
                            </span>

                            <span>
                                A change in focal length also changes how motion is perceived. Wide lenses exaggerate movement toward or away from the camera, often used for dynamic action or handheld shots. Telephoto lenses flatten motion and soften camera shake, ideal for capturing subtle expressions or distant subjects. Because of these effects, filmmakers choose focal lengths carefully to match mood, pacing, and visual language.
                            </span>

                        </p>

                    </div>


                    <div className="fl-img w-full lg:w-[30%] mt-2 md:mt-0">

                        <img
                            src="/images/fl-diagram.png"
                            alt="Focal length diagram"
                            className='border border-[#555] w-full h-auto object-contain'
                        />

                    </div>

                </div>


                {/* Second Focal Length Section */}

                <div className="fl-box w-full flex flex-col lg:flex-row mt-8 items-center gap-6 lg:gap-12">

                    <div className="fl-img w-full lg:w-[30%]">

                        <img
                            src="/images/fl-common.png"
                            alt="Common focal lengths"
                            className='border border-[#555] w-full h-auto object-contain'
                        />

                    </div>


                    <div className="fl-para w-full lg:w-[65%]">

                        <p className='text-gray-400 text-[12px] md:text-[15px] text-justify font3 leading-relaxed'>

                            Understanding focal length helps filmmakers control audience perception. A lens can make a room feel huge or cramped, make a character feel powerful or vulnerable, and even shift how viewers emotionally experience a moment. Every millimeter of focal length adds or removes storytelling energy — making it one of cinematography’s most essential tools. The choice of focal length can subtly guide the viewer’s eye toward what truly matters in a frame or hide details to create mystery and tension. It can exaggerate perspective to heighten chaos or compress space to evoke stillness and intimacy. By mastering focal length, filmmakers are essentially shaping how audiences see, interpret, and emotionally connect with a story.

                            It influences not just what the audience sees, but how close they feel to the characters and their emotions. Longer focal lengths can create a sense of isolation or focus, while wider lenses pull viewers deeper into the environment. In the hands of a skilled filmmaker, focal length becomes a psychological tool—quietly shaping tension, scale, and the overall rhythm of a scene.

                        </p>

                    </div>

                </div>

            </div>


            {/* ===================================== */}
            {/* FOCAL LENGTH MOVIE EXAMPLES */}
            {/* ===================================== */}

            <div className="box fl-shots-main-div w-full mt-10 lg:mt-20 pb-16 lg:pb-20 px-5 sm:px-8 md:px-12 lg:px-20">

                <div className="fl-shots w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-4 lg:gap-2 lg:h-130">


                    {/* Blade Runner */}

                    <div className="fl-img h-60 sm:h-64 lg:h-full bg-red-300 overflow-hidden relative">

                        <img
                            src="https://i.pinimg.com/1200x/49/3d/1c/493d1c4e6accaa991db42acde73638d6.jpg"
                            className='h-full w-full object-cover'
                            alt="Blade Runner 2049"
                        />

                        <div className="overlay w-full h-full bg-black/20 bg-linear-0 from-black via-black/0 to-black/0 absolute top-0 right-0"></div>

                        <h1 className='text-[#ccc] font1 tracking-wider text-xl sm:text-2xl absolute bottom-6 left-2'>
                            BLADE RUNNER 2049
                        </h1>

                        <h1 className='text-[#808080] font3 tracking-wider text-[13px] absolute bottom-1 left-2'>
                            (18–24mm)
                        </h1>

                    </div>


                    {/* Joker */}

                    <div className="fl-img h-60 sm:h-64 lg:h-full bg-red-300 overflow-hidden relative">

                        <img
                            src="https://i.pinimg.com/1200x/22/fb/59/22fb59ed6f85745496d2a0868c000d0f.jpg"
                            className='h-full w-full object-cover'
                            alt="Joker"
                        />

                        <div className="overlay w-full h-full bg-black/20 bg-linear-0 from-black via-black/0 to-black/0 absolute top-0 right-0"></div>

                        <h1 className='text-[#ccc] font1 tracking-wider text-xl sm:text-2xl absolute bottom-6 left-2'>
                            JOKER
                        </h1>

                        <h1 className='text-[#808080] font3 tracking-wider text-[13px] absolute bottom-1 left-2'>
                            (28–35mm)
                        </h1>

                    </div>


                    {/* Barry Lyndon */}

                    <div className="fl-img h-60 sm:h-64 lg:h-full bg-red-300 overflow-hidden relative">

                        <img
                            src="https://i.pinimg.com/1200x/47/80/c1/4780c1d7c2f470d203702cab5ca93a35.jpg"
                            className='h-full w-full object-cover'
                            alt="Barry Lyndon"
                        />

                        <div className="overlay w-full h-full bg-black/20 bg-linear-0 from-black via-black/0 to-black/0 absolute top-0 right-0"></div>

                        <h1 className='text-[#ccc] font1 tracking-wider text-xl sm:text-2xl absolute bottom-6 left-2'>
                            Barry Lyndon
                        </h1>

                        <h1 className='text-[#808080] font3 tracking-wider text-[13px] absolute bottom-1 left-2'>
                            (50mm)
                        </h1>

                    </div>


                    {/* Black Swan */}

                    <div className="fl-img h-60 sm:h-64 lg:h-full bg-red-300 overflow-hidden relative">

                        <img
                            src="https://i.pinimg.com/1200x/09/ee/96/09ee9672fe5daae7ac75a9846d44adf6.jpg"
                            className='h-full w-full object-cover'
                            alt="Black Swan"
                        />

                        <div className="overlay w-full h-full bg-black/20 bg-linear-0 from-black via-black/0 to-black/0 absolute top-0 right-0"></div>

                        <h1 className='text-[#ccc] font1 tracking-wider text-xl sm:text-2xl absolute bottom-6 left-2'>
                            Black Swan
                        </h1>

                        <h1 className='text-[#808080] font3 tracking-wider text-[13px] absolute bottom-1 left-2'>
                            (85mm)
                        </h1>

                    </div>


                    {/* Oppenheimer */}

                    <div className="fl-img h-60 sm:h-64 lg:h-full bg-red-300 overflow-hidden relative">

                        <img
                            src="https://i.pinimg.com/736x/2b/6b/1e/2b6b1e6bc877a5a74f48b303bc971897.jpg"
                            className='h-full w-full object-cover'
                            alt="Oppenheimer"
                        />

                        <div className="overlay w-full h-full bg-black/20 bg-linear-0 from-black via-black/0 to-black/0 absolute top-0 right-0"></div>

                        <h1 className='text-[#ccc] font1 tracking-wider text-xl sm:text-2xl absolute bottom-6 left-2'>
                            Oppenheimer
                        </h1>

                        <h1 className='text-[#808080] font3 tracking-wider text-[13px] absolute bottom-1 left-2'>
                            (100–135mm)
                        </h1>

                    </div>


                    {/* Dune 2 */}

                    <div className="fl-img h-60 sm:h-64 lg:h-full bg-red-300 overflow-hidden relative">

                        <img
                            src="https://i.pinimg.com/1200x/4d/41/6d/4d416d63e98c481e715ad9e75c77f92a.jpg"
                            className='h-full w-full object-cover'
                            alt="Dune 2"
                        />

                        <div className="overlay w-full h-full bg-black/20 bg-linear-0 from-black/30 via-black/0 to-black/0 absolute top-0 right-0"></div>

                        <h1 className='text-[#ccc] font1 tracking-wider text-xl sm:text-2xl absolute bottom-6 left-2'>
                            DUNE 2
                        </h1>

                        <h1 className='text-[#808080] font3 tracking-wider text-[13px] absolute bottom-1 left-2'>
                            (200mm)
                        </h1>

                    </div>


                </div>

            </div>

        </div>

    )

}

export default Lens
