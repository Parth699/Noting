import { useMutation } from '@apollo/client';
import { getTypenameFromStoreObject } from '@apollo/client/cache/inmemory/helpers';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { TOGGLE_FAVOURITE } from '../gql/mutation';
import { GET_FAVOURITES } from '../gql/query';
import favImg from '../assets/love.png'
import fillFavImg from '../assets/like.png'

const FavouriteNote = ({me,noteId,favouriteCount}) => {

    const [count, setCount] = useState(favouriteCount)
    const [favourited, setFavourited] = useState(
        me.favourites.filter((note)=>note.id===noteId).length>0
    )
    const [toggleFavourite]=useMutation(TOGGLE_FAVOURITE,{
        variables:{id:noteId},
        refetchQueries:[{query:GET_FAVOURITES}]
    })

  return (
    <>

    {!favourited?(
        <img 
        src={favImg} 
        alt="fav-icon"
        className='app__note-favourite-btn'
        onClick={()=>{
            toggleFavourite();
            setFavourited(true);
            setCount((preCount)=>preCount+1);
        }} />
    ):(
        <img 
        src={fillFavImg} 
        alt="fav-icon"
        className='app__note-favourite-btn' 
        onClick={()=>{
            toggleFavourite();
            setFavourited(false);
            setCount((preCount)=>preCount-1);
        }} />
    )}
    </>
  )
}

export default FavouriteNote;