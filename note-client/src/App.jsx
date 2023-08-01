import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache,createHttpLink, gql, makeVar } from "@apollo/client";
import { setContext} from 'apollo-link-context'
import "./App.scss";
import Pages from "./pages";
import { isLoggedIn } from "./gql/variables";

const App = () => {
  isLoggedIn(!!localStorage.getItem('token'))

  const uri = "http://localhost:4000/";
  const httpLink=createHttpLink({uri})
  const cache = new InMemoryCache({
    typePolicies:{
      Query:{
        fields:{
          isLoggedIn:{
            read(){
              return isLoggedIn();
            }
          }
        }
      }
    }
  });

  const authLink=setContext((_,{headers})=>{
    // console.log(headers)
    return {
      headers:{
        ...headers,
        authorization:localStorage.getItem('token')||" "
      }
    }
  })



  const client = new ApolloClient({
    link:authLink.concat(httpLink),
    cache,
    resolvers:{},
    connectToDevTools: true,
  });

  const QUERY=gql`
    query IsLoggedIn{
      isLoggedIn @client
    }
  `
  const data={
    isLoggedIn:!!localStorage.getItem('token')
  }
  // cache.writeQuery({
  //   query:QUERY,
  //   data
  // })


  return (
    <ApolloProvider client={client}>
      <div className="app">
        <Pages />
      </div>
    </ApolloProvider>
  );
};

export default App;
