import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { arrayUnion, doc, updateDoc, onSnapshot } from 'firebase/firestore';

import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';

const Movie = ({item}) => {
    const [savedShows, setSavedShows] = useState();
    const [saved, setSaved] = useState(false);
    const { user } = UserAuth();

    const movieId = doc(db, 'users', `${user?.email}`);

    const saveShow = async (passedId) => {
        if(user?.email) {
            if (!saved) {
                setSaved(true);
                await updateDoc(movieId, {
                    savedShows: arrayUnion({
                        id: item.id,
                        title: item.title,
                        img: item.backdrop_path,
                    })
                })
            } else {
                try {
                    setSaved(false);
                    const result = savedShows.filter((item) => item.id !== passedId);
                    await updateDoc(movieId, {
                        savedShows: result,
                    });
                } catch (error) {
                    console.log(error)
                }
            }
        } else {
            alert('Please log in to save a movie')
        }
    }

    useEffect(() => {
        onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
            setSavedShows(doc.data()?.savedShows);
          });
    }, [user?.email]);

    return (
        <div className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative m-2'>
            <img 
                className='w-full h-auto block'
                src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                alt={item.title} 
            />
            <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white '>
                <p className='whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>
                    {item.title}
                </p>
                <p onClick={() => saveShow(item.id)}>
                    {savedShows?.find(el => el.id === item.id) ? <FaHeart className='absolute top-3 left-3 text-gray-300'/> : <FaRegHeart className='absolute top-3 left-3 text-gray-300'/>}
                </p>
            </div>
        </div>
    )
}

export default Movie