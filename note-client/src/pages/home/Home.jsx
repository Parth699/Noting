import React from "react";
import { useQuery, gql } from "@apollo/client";
import "./home.scss";
import NoteFeed from "../../components/NoteFeed";
import { GET_NOTES } from "../../gql/query";

const Home = () => {

  const { data, loading, error, fetchMore } = useQuery(GET_NOTES);

  console.log(data);

  if (loading) {
    return <p>loading...</p>;
  }
  if (error) {
    return <p>error...</p>;
  }
  return (
    <div className="app__home">
      <NoteFeed notes={data.noteFeed.notes} />

      {data.noteFeed.hasNextPage && (
        <button onClick={()=>{
          fetchMore({variables:{cursor:data.noteFeed.cursor},
            updateQuery:(previourResult,{fetchMoreResult})=>{
              return {
                noteFeed:{
                  cursor:fetchMoreResult.noteFeed.cursor,
                  hasNextPage:fetchMoreResult.noteFeed.hasNextPage,
                  notes:[
                    ...previourResult.noteFeed.notes,
                    ...fetchMoreResult.noteFeed.notes
                  ],
                  __typename:'noteFeed'
                }
              }
            }
          })}
        } >Load more</button>
      )}
    </div>
  );
};

export default Home;