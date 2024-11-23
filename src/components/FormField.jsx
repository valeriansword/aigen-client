import React from 'react'

function FormField({LabelName,name,type,value,placeholder,handleChange,isPreloaded,handlePreload}) {
  return (
    <div>
        {/* lablename */}
     <div className='flex items-center gap-2 mb-2'>
        <label
            htmlFor={name}
            className='block text-sm font-medium text-gray-900'
        >
            {LabelName}
        </label>
        {
            isPreloaded && (
                <button type="button" onClick={handlePreload} className='font-semibold rounded-md text-black bg-[#ececf1] py-1 px-2'>
                    Generate
                </button>
            )
        }
          
     </div>
     {/* input field */}
     <input 
     type={type}
     name={name}
     id={name}
     placeholder={placeholder}
     value={value}
     onChange={handleChange}
     required
     className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3' />
    </div>
  )
}

export default FormField
