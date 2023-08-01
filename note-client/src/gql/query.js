import { gql } from "@apollo/client";

const GET_NOTES = gql`
  query NoteFeed($cursor: String) {
    noteFeed(cursor: $cursor) {
      cursor
      hasNextPage
      notes {
        id
        createdAt
        content
        favouriteCount
        author {
          id
          username
          avatar
        }
      }
    }
  }
`;

const GET_NOTE = gql`
  query note($id: ID!) {
    note(id: $id) {
      id
      content
      createdAt
      favouriteCount
      author {
        id
        username
        avatar
      }
    }
  }
`;

const GET_MY_NOTES = gql`
  query me {
    me {
      id
      username
      notes {
        id
        content
        createdAt
        favouriteCount
        author {
          id
          username
          avatar
        }
      }
    }
  }
`;

const GET_FAVOURITES = gql`
  query me {
    me {
      id
      username
      favourites {
        id
        content
        createdAt
        favouriteCount
        author {
          id
          username
          avatar
        }
      }
    }
  }
`;

const GET_Me=gql`
query me{
  me{
    id
    username
    favourites{
      id
    }
  }
}
`

export { GET_NOTES, GET_NOTE, GET_MY_NOTES, GET_FAVOURITES,GET_Me };
