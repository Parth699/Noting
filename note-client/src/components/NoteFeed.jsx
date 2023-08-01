import React from "react";
import { Link } from "react-router-dom";
import Note from "./Note";
import "./NoteFeed.scss";

const NoteFeed = ({ notes}) => {
  return (
    <>
      {notes.map((note, index) => (
        <div className="note__wrapper" key={note.id}>
          
            <Note note={note} id={note.id} />
            <Link to={`/note/${note.id}`} className="note-link" >Open</Link>
       
        </div>
      ))}
    </>
  );
};

export default NoteFeed;
