import { useQuery } from '@apollo/client';
import React from 'react'
import NoteFeed from '../../components/NoteFeed';
import { GET_FAVOURITES } from '../../gql/query';
import './favourite.scss'

const Favourite = () => {
  const {data,loading,error}=useQuery(GET_FAVOURITES);
  console.log(data)

  if(loading){
    return <p>loading...</p>
  }
  if(error){
    return <p>error</p>
  }
  return (
    <>
    {data.me.favourites.length>0?
    <NoteFeed notes={data.me.favourites} />
    :(
      <p>No favourites</p>
    )}
    </>
  )
}

export default Favourite
