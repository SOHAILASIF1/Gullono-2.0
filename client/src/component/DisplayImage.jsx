import React from 'react'
import { IoIosClose } from "react-icons/io";


function DisplayImage({imgUrl, onClose}) {
  return (
    <div className='fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center'>
    <div className="bg-white shadow-2xl max-w-5xl rounded-xl mx-auto p-3">
        <div className='w-fit ml-auto text-2xl cursor-pointer'>
            <IoIosClose onClick={onClose}/>
        </div>
        <div className="flex justify-center max-w-[80vh] max-h-[80vh]">
            <img src={imgUrl} alt="" className='w-full h-full' />

        </div>


    </div>
        

    </div>
  )
}

export default DisplayImage