import { useQuery } from '@apollo/client'
import React from 'react'
import { Link } from 'react-router-dom'
import { GET_Me } from '../gql/query'
import {withRouter} from 'react-router-dom'
import DeleteNote from './DeleteNote'
import FavouriteNote from './FavouriteNote'

const NoteUser = ({note}) => {

    const {data,loading,error}=useQuery(GET_Me);

    if(loading){
        return <p>loading...</p>
    }
    if(error){
        return <p>error</p>
    }
    return (
    <>
    <FavouriteNote me={data.me} noteId={note.id} favouriteCount={note.favouriteCount} /> &nbsp;
    favourites : {note.favouriteCount}<br/>
    {note.author.id===data.me.id && (
<>
        <Link to={`/edit/${note.id}`} >Edit</Link><br/>
        <DeleteNote note={note} />
        </>
    )}
    </>
  )
}

export default NoteUser;