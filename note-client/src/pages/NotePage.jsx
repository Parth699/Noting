import { gql, useQuery } from '@apollo/client';
import React from 'react'
import { useParams } from 'react-router';
import Note from '../components/Note';
import { GET_NOTE } from '../gql/query';

const NotePage = (props) => {
    const {id}=useParams();
    
    const {data,loading,error}=useQuery(GET_NOTE,{variables:{id}});

    if(loading){
        return <p>loading...</p>
    }
    if(error){
        return <p>error</p>
    }
    return <Note note={data.note} showAllContent={true} />
}

export default NotePage;