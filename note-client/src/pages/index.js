import React from "react";
import { BrowserRouter as Router, Routes, Route,Navigate,useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import Favourite from "./favourites/Favourite";
import Home from "./home/Home";
import Mynotes from "./mynotes/Mynotes";
import NotePage from "./NotePage";
import SignUp from "./signUp/SignUp";
import SignIn from "./signIn/SignIn";
import { useReactiveVar } from "@apollo/client";
import { isLoggedIn } from "../gql/variables";
import NewNote from "./NewNote";
import Edit from "./edit/Edit";

const RequireAuth=({children})=>{

  const IsLoggedIn=useReactiveVar(isLoggedIn);
  const location=useLocation();
  
  return (
    IsLoggedIn?children:<Navigate to='/signin' replace state={{path:location.pathname}} />
  )
}

const Pages = () => {
  return (
    <Router>
      <Layout>
      <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/mynotes" element={<RequireAuth><Mynotes /></RequireAuth>} />
          <Route path="/favourites" element={<RequireAuth><Favourite /></RequireAuth>} />
          <Route path="/note/:id" element={<NotePage/>} />
          <Route path='/signup' element={<SignUp />} />
          <Route path="/signin" element={<SignIn />}  />
          <Route path="/newnote" element={<RequireAuth><NewNote /></RequireAuth>} />
          <Route path="/edit/:id" element={<RequireAuth><Edit /></RequireAuth>} />
          
        </Routes>
      </Layout>
    </Router>
  );
};

export default Pages;
