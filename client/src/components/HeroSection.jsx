import React from 'react'
import { assets } from '../assets/assets'
import { ArrowRight, CalendarIcon, ClockIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {

    const navigate = useNavigate()

  return (
    <div className='flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-[url("/backgroundImage.jpg")] bg-cover bg-center h-screen'>

      <h1 className='text-5xl md:text-[70px] md:leading-18 font-semibold max-w-110'>AVATAR: <br /> FIRE AND ASH</h1>

      <div className='flex items-center gap-4 text-white'>
        <span>Action | Adventure | Fantasy | Sci-Fi</span>
        <div className='flex items-center gap-1'>
            <CalendarIcon className='w-4.5 h-4.5'/> 19 Dec 2025
        </div>
        <div className='flex items-center gap-1'>
            <ClockIcon className='w-4.5 h-4.5'/> 3h 17m
        </div>
      </div>
      <p className='max-w-md text-white'>The biggest film in the world, the ultimate cinematic experience and spectacle, goes even bigger with Avatar: Fire and Ash. In the aftermath of great loss, Jake Sully and Neytiri confront a new and dangerous force on Pandora. As tensions rise, their family`s strength and unity are tested like never before.</p>
      <button onClick={()=> navigate('/movies')} className='flex items-center gap-1 px-6 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'>
         Explore Movies
         <ArrowRight className="w-5 h-5"/>
      </button>
    </div>
  )
}

export default HeroSection
