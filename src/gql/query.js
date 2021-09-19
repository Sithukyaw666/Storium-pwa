import { gql } from "@apollo/client";
export const GET_STORY = gql`
  query {
    getAllStory {
      id
      content
      title
      authorID
      createdAt
      reactions
      comments {
        author
        comment
      }
      author {
        username
      }
    }
  }
`;
export const GET_STORY_BY_ID = gql`
  query getStoryById($id: ID!) {
    getStoryById(id: $id) {
      id
      title
      content
      authorID
      createdAt
      reactions
      comments {
        author
        comment
      }
      author {
        username
      }
    }
  }
`;
export const GET_ME = gql`
  query {
    me {
      id
      username
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query getUserById($id: ID!) {
    getUserById(id: $id) {
      id
      username
      email
      followers
      followings
      stories {
        id
        title
        content
        createdAt
        reactions
        comments {
          author
          comment
        }
      }
    }
  }
`;
