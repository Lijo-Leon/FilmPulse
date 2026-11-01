import React from 'react'

function AdminPreloader() {
    return (
        <div className='bg-black min-h-screen w-full z-200 relative'>
            <div className='text-center'>
                <h1 className='text-amber-50 text-[250px] font1'>
                    ARE YOU ADMIN ?
                </h1>

                <div className='flex gap-30 w-full items-center justify-center'>
                    <button class="btn">
                        <span class="left-span"></span>
                        <p class="text-btn">YES</p>
                        <p class="hidden-text-btn">NO</p>
                        <span class="right-span"></span>
                    </button>

                    <button class="btn">
                        <span class="left-span"></span>
                        <p class="text-btn">NO</p>
                        <p class="hidden-text-btn">YES</p>
                        <span class="right-span"></span>
                    </button>

                </div>
            </div>
        </div>
    )
}

export default AdminPreloader
