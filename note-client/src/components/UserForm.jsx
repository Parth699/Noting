import React, { useState } from 'react'
import { useNavigate } from 'react-router';

const UserForm = ({action,formType,loading}) => {

    const [values, setValues] = useState({username:"",email:"",password:""})

    const inputHandler = (e) => {
        setValues((preValues) => ({
          ...preValues,
          [e.target.name]: e.target.value,
        }));
      };
    
  return (
    <div className="app__signUp">
      <h1>{formType==="signup"?"SignUp":"SignIn"}</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          action({variables:{
              ...values
          }});
        //   setValues({username:"",email:"",password:""})
        }}
      >
      {formType==="signup" && (<>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Username"
            required
            name="username"
            value={values.username}
            id="username"
            onChange={inputHandler}
          />
          </>
      )}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Email"
          required
          name="email"
          value={values.email}
          id="email"
          onChange={inputHandler}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          required
          name="password"
          value={values.password}
          id="password"
          onChange={inputHandler}
        />
        <button type='submit'>{loading?'Singning...':'SignIn'}</button>
      </form>
    </div>
  )
}

export default UserForm