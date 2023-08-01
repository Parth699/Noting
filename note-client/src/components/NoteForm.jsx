import React, { useState } from "react";
import "./NoteForm.scss";

const NoteForm = ({content,action,loading}) => {
  const [values, setValues] = useState({ content});
  const handleInput = (e) => {
    setValues((preValues) => ({
      ...preValues,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="app__newnote">
      <form onSubmit={(e)=>{
          e.preventDefault();
          action({
              variables:{
                ...values
              }
          })
      }}>
        <textarea
          name="content"
          id="textarea"
          value={values.content}
          placeholder="Write note..."
          required
          onChange={handleInput}
        />
        <button type="submit">{loading?'Saving':'Save'}</button>
      </form>
    </div>
  );
};

export default NoteForm;
