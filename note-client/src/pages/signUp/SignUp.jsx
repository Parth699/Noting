import React, { useState } from "react";
import "./SignUp.scss";
import { useMutation, useApolloClient, gql, useQuery, makeVar, useReactiveVar } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../gql/variables";
import UserForm from "../../components/UserForm";

const SignUp = (props) => {
  // const client=useApolloClient();


  // const GET_ISLOGGEDIN=gql`
  // query IsLoggedIn{
  //     isLoggedIn @client
  //   }
  // `

  // console.log(useQuery(gql`
  //   query IsLoggedIn{
  //       isLoggedIn @client
  //   }  
  // `))

  const SIGNUP_USER = gql`
    mutation signUp($username: String!, $email: String!, $password: String!) {
      signUp(username: $username, email: $email, password: $password)
    }
  `;

  const navigate=useNavigate();

  const [signUp, { loading, error }] = useMutation(SIGNUP_USER,{
      onCompleted:(data)=>{
          console.log(data);
          localStorage.setItem('token',data.signUp)
          isLoggedIn(true);
          // client.cache.writeQuery(GET_ISLOGGEDIN,{data:{isLoggedIn:true}})
          // console.log(useQuery(GET_ISLOGGEDIN))
          navigate("/");
      }
  });

  // console.log(useQuery(GET_ISLOGGEDIN))
  console.log(useReactiveVar(isLoggedIn))

  return (
    <>
    <UserForm action={signUp} formType="signup" loading={loading} />
    { error && <p>Error : {error.message}</p>}
    </>
  );
};

export default SignUp;
