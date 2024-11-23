import React, { useState } from 'react'
import { preLoadedData } from '../constant/data'
import FormField from './FormField';
import preview from "../assets/preview.png"
import Loader from './Loader';
import axios from "axios";
import {useNavigate} from "react-router-dom"
function CreatePost() {

  const getRandomPrompt=(prompt)=>{
      
      const randomIndex=Math.floor(Math.random()*preLoadedData.length);
      const randomPrompt=preLoadedData[randomIndex];
      if(prompt===randomPrompt){
        return getRandomPrompt(prompt);
      }
      return randomPrompt;
  }
  const [form,setForm]=useState({
    name:"",
    prompt:"",
    photo:""
  })
  const [loading,setLoading]=useState(false);
  const [generatingImage,setGeneratingImage]=useState(false);
   const navigate=useNavigate();
  const handleSubmit=async(e)=>{
      e.preventDefault();
      if(form.prompt && form.photo){
        try{
          setLoading(true);
          const response=await axios.post("http://localhost:3000/api/v1/post",form,{
            headers:{
              "Content-Type":"application/json"
            }
          })
          console.log(response.data);

          navigate("/")
        }catch(err){
          console.log(err)
        }
        finally{
          setLoading(false)
        }
      }else{
        setLoading(false);
        alert("please enter all the details")
      }
     







  }
  const handleChange=(e)=>{
    setForm({...form,[e.target.name]:e.target.value})

  }
  const handlePreload=()=>{
    const randomPrompt=getRandomPrompt(form.prompt);
    setForm({...form,prompt:randomPrompt});
  }
  const generateImage=async()=>{
        if(form.prompt){
          setGeneratingImage(true)
          const prompt=form.prompt;
          axios.post("http://localhost:3000/api/v1/dalle",{prompt},
            {
              headers:{
                "Content-type":"application/json",
              }
          }
          ).then(res=>{
            console.log(res.data.resultImage);
            setForm({...form,photo:res.data.resultImage})
            setGeneratingImage(false);
          }).catch(err=>{
            console.log(err);
            setGeneratingImage(false);
            alert(err);
          })
        

        } else{
          setGeneratingImage(false)
          alert("please enter a prompt");
        }
  }
  
  return (
    <div className='max-w-7xl mx-auto'>
     {/* top heading */}
     <div>
            <h1 className='text-xl  font-extrabold text-[#222328]'>Create</h1>
            <p className='text-[#666e75] font-normal text-lg max-w-[500px]'>Create imaginative and visually stunning images through  DALL-E AI and share them with community</p>
      </div>
      {/* form submit */}
      <form className='max-w-3xl mt-16' onSubmit={handleSubmit}>
      <div className='flex flex-col gap-5'>

      <FormField 
        LabelName='Your name'
        type="text"
        name="name"
        value={form.name}
        placeholder="john doe"
        handleChange={handleChange}
        
        
        />
        <FormField 
        LabelName='Prompt'
        type="text"
        name="prompt"
        value={form.prompt}
        placeholder="a sea otter with a pearl earring by Johannes Vermeer"
        handleChange={handleChange}
        isPreloaded
        handlePreload={handlePreload}
        
        />
        {/* generate image */}
        <div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center'>
          {
            form.photo?(
              <img src={form.photo} alt={form.prompt} className='w-full h-full object-contain' />

            ):(
              <img src={preview} alt={preview} className='w-9/12 h-9/12 object-contain opacity-40'/>
            )
          }

          { generatingImage &&(
            <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
              <Loader />
            </div>
          )}


        </div>
      </div>
       
       {/* submit photo */}
       <div className='mt-5 flex gap-5'>
        <button
          type='button'
          onClick={generateImage}
          className='bg-[#3a5a40] text-white rounded-md w-full sm:w-auto px-5 py-2 text-center '
        >
          {
            generatingImage?('Generating ...'):('Generate')
          }
        </button>
            
       </div>
       {/* share community */}
       <div className='mt-10'>
        <p className='mt-2 text-[#666e75] text-lg font-normal'>Once you have generated the image you can share it with the community</p>
          <button type='submit' className='mt-3 bg-[#6469ff] text-white rounded-md w-full sm:w-auto px-5 py-2 text-center '>

          {loading?'sharing':'share it with community'}
          </button>
       </div>
      </form>

    </div>
  )
}

export default CreatePost
