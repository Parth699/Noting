import { useApolloClient, useReactiveVar } from '@apollo/client'
import React from 'react'
import { Link } from 'react-router-dom'
import { isLoggedIn } from '../gql/variables'
import './Header.scss'

const Header = () => {
  const client=useApolloClient();

  const handleLogout=()=>{
    localStorage.removeItem('token');
    isLoggedIn(false);
    client.clearStore();
  }

  return (
    <div className='app__header' id='header'>
    <h1>Header</h1>
    <div className='app__header-user'>
    {useReactiveVar(isLoggedIn)?(
      <p onClick={handleLogout} >Logout</p>
    ):(<>
      <Link to='/signup'>SignUp</Link>
      <Link to='/signin'>SignIn</Link>
      </>)}
    </div>
    </div>
  )
}

export default Header