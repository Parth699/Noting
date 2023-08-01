import React from "react";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";
import "./Note.scss";
import { useReactiveVar } from "@apollo/client";
import { isLoggedIn } from "../gql/variables";
import NoteUser from "./NoteUser";

const Note = ({ note,showAllContent=false }) => {

  const isloggedIn=useReactiveVar(isLoggedIn);

  return (
    <article id={note.id} className="app__note">
      <div className="app__note-info">
        <div className="app__note-img">
          <img src={note.author.avatar} alt={`${note.author.username}-avatar`} />
        </div>
        <div className="app__note-author">
          <em>by</em> {note.author.username}
          <br />
          {format(new Date(note.createdAt), "MM dd yyyy")}
        </div>
        <div className="app__note-favourites">
          {isloggedIn?(<NoteUser note={note} />):(
            <>
            <em>favourites :</em> {note.favouriteCount}
            </>
          )}
        </div>
      </div>

        {!showAllContent?(
          <ReactMarkdown>{note.content.length>100?`${note.content.slice(0,201)}...`:note.content}</ReactMarkdown>
        ):(
          <ReactMarkdown>{note.content}</ReactMarkdown>
        )}
    </article>
  );
};

export default Note;
