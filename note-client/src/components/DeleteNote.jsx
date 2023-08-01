import { useMutation } from '@apollo/client'
import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { DELETE_NOTE } from '../gql/mutation'
import { GET_MY_NOTES, GET_NOTES } from '../gql/query'
import ButtonNote from './ButtonNote'

const DeleteNote = (props) => {
    const navigate=useNavigate(); 

    const [deleteNote]=useMutation(DELETE_NOTE,{
        variables:{id:props.note.id},
        refetchQueries:[{query:GET_NOTES},{query:GET_MY_NOTES}],
        onCompleted:()=>{
            navigate('/mynotes');
        }
    })

  return (
    <ButtonNote text="Delete" onClick={deleteNote} />
  )
}

export default DeleteNote