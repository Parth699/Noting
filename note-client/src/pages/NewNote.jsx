import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useNavigate } from "react-router";
import NoteForm from "../components/NoteForm";
import { GET_MY_NOTES, GET_NOTES } from "../gql/query";

const NewNote = () => {
  const NEW_NOTE = gql`
    mutation newNote($content: String!) {
      newNote(content: $content) {
        id
        content
        createdAt
        favouriteCount
        favouritedBy {
          id
          username
        }
        author {
          id
          username
        }
      }
    }
  `;
  let navigate = useNavigate();

  const [newNote,{loading,error}]=useMutation(NEW_NOTE,{
      refetchQueries:[{query:GET_NOTES},{query:GET_MY_NOTES}],
      onCompleted:(data)=>{
          navigate(`/note/${data.newNote.id}`)
      }
  })

  return (
    <>
      <NoteForm action={newNote} loading={loading} />
      {error && <p>Error</p>}
    </>
  );
};

export default NewNote;
