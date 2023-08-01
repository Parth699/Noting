import { useMutation, useQuery } from '@apollo/client';
import React from 'react'
import { useNavigate, useParams } from 'react-router'
import NoteForm from '../../components/NoteForm';
import { EDIT_NOTE } from '../../gql/mutation';
import { GET_Me, GET_MY_NOTES, GET_NOTE, GET_NOTES } from '../../gql/query';

const Edit = () => {

    const {id}=useParams();
    const navigate=useNavigate();
    
    const {data,loading1,error}=useQuery(GET_NOTE,{
        variables:{id},
        // fetchPolicy:'no-cache'
    })
    const {data:userData}=useQuery(GET_Me);

    const [editNote,{loading,e}]=useMutation(EDIT_NOTE,{
        refetchQueries:[{query:GET_NOTES},{query:GET_MY_NOTES}],
        variables:{id},
        onCompleted:(data)=>{
            navigate(`/note/${id}`);
        }
    })

    // console.log(userData.me.id)
    console.log(userData,data)
    if(loading1){
        return <p>loading...</p>
    }
    if(error){
        return <p>error</p>
    }

   
    if(userData && data &&userData.me.id!==data.note.author.id){
        return <p>You do not have access to edit this note</p>
    }
    else if(userData && data){
        return <NoteForm content={data.note.content} action={editNote} loading={loading} />
    }

}

export default Edit