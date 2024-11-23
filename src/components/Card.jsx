import React from 'react'
import download from "../assets/download.png"
import FileSaver from "file-saver"
function Card({_id,prompt,photo,name}) {
  const downloadImage=(_id,photo)=>{
    FileSaver.saveAs(photo,`download-${_id}.jpg`);

  }
  return (
    <div className='rounded-lg group relative shadow-card hover:shadow-cardhover card'>
        <img src={photo} alt={prompt} className='w-full h-auto object-cover rounded-xl'/>
        <div className='group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 right-0 left-0 bg-[#10131f] m-2 p-4 rounded-md'>
          <p className='text-white overflow-y-auto text-sm'>{prompt}</p>
          <div className='mt-5 flex justify-between items-center gap-2'>
            {/* name */}
            <div className='flex items-center gap-2 text-white'>
              <span className='w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-xs font-bold '>{name[0]}</span>
              <p className='text-sm font-semibold'>{name}</p>
            </div>
            {/* download */}
           <button type='button' onClick={()=>downloadImage(_id,photo)} className='bg-transparent outline-none border-none'>
           <img src={download} alt='download' className='w-6 h-6 object-contain invert'/>
           </button>
          </div>
        </div>
    </div>  
  )
}

export default Card
