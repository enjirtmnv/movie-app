import React from 'react';

import background from '../assets/main-bg.jpeg';
import SavedShows from '../components/SavedShows';

const Account = () => {
  return (
    <div className='w-full text-white'>
        <img
            className='w-full h-[400px] object-cover'
            src={background}
            alt="/" 
        />
        <div className='bg-black/60 fixed top-0 left-0 w-full h-[400px]'></div>
        <div className='absolute top-[20%] p-4 mmd:p-8'>
          <h1 className='text-3xl md:text-5xl font-bold'>My shows</h1>
        </div>
        <SavedShows />
    </div>
  )
}

export default Account