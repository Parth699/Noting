import { useQuery } from '@apollo/client'
import React from 'react'
import './mynotes.scss'
import {GET_MY_NOTES} from '../../gql/query'
import NoteFeed from '../../components/NoteFeed'

const Mynotes = () => {

  const {data,loading,error}=useQuery(GET_MY_NOTES);

  if(loading){
    return <p>loading...</p>
  }
  if(error){
    return <p>error</p>
  }
  return (
    <>
    {data.me.notes.length>0?
      <NoteFeed notes={data.me.notes} />
      :(
        <p>No notes</p>
      )}
    </>
  )
}

export default Mynotes