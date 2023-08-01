import { gql, useMutation, useReactiveVar } from '@apollo/client'
import React from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router'
import UserForm from '../../components/UserForm'
import { isLoggedIn } from '../../gql/variables'

const SignIn = () => {
const GET_SIGNIN=gql`
mutation signIn($email:String!,$password:String!){
    signIn(email:$email,password:$password)
}
`
  const navigate=useNavigate();  
  const location=useLocation();
  const [signIn,{loading,error}]=useMutation(GET_SIGNIN,{
      onCompleted:(data)=>{
          console.log(data)
          localStorage.setItem('token',data.signIn)
          isLoggedIn(true);
          navigate(location.state?.path || '/');
      }
  })

  console.log(useReactiveVar(isLoggedIn));

  return (
      <>
    <UserForm action={signIn} formType="signin" loading={loading}/>
    { error && <p>Error : {error.message}</p>}
    </>
  )
}

export default SignIn