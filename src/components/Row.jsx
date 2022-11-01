import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import Movie from './Movie';

const Row = ({title, fetchURL, rowId}) => {
    const [movies, setMovie] = useState([]);

    useEffect(() => {
        axios.get(fetchURL).then((response) => {
            setMovie(response.data.results)
        })
    }, [fetchURL])

    const slideLeft = () => {
        var slider = document.getElementById('slider' + rowId);
        slider.scrollLeft = slider.scrollLeft - 500;
      };

    const slideRight = () => {
        var slider = document.getElementById('slider' + rowId);
        slider.scrollLeft = slider.scrollLeft + 500;
    };

    return (
        <>
            <h2 className='text-white font-bold md:text-xl p-4'>{title}</h2>
            <div className='relative flex items-center group'>
                <MdChevronLeft 
                    onClick={slideLeft}
                    size={40} 
                    className='bg-white rounded-full absolute left-0 opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
                />
                <div id={'slider' + rowId} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'>
                    {movies.map((item) => (
                        <Movie key={item.id} item={item}/>
                    ))}
                </div>
                <MdChevronRight 
                    onClick={slideRight}
                    size={40} 
                    className='bg-white rounded-full absolute right-0 opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
                />
            </div>
        </>
  )

}

export default Row