import { gql } from "@apollo/client";
export const GET_STORY = gql`
  query {
    getAllStory {
      id
      content
      title
      authorID
      createdAt
      author {
        username
      }
    }
  }
`;
export const GET_STORY_BY_ID = gql`
  query getStoryById($id: ID!) {
    getStoryById(id: $id) {
      title
      content
      authorID
      createdAt
      author {
        username
      }
    }
  }
`;
export const GET_ME = gql`
  query {
    me {
      user
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query getUserById($id: ID!) {
    getUserById(id: $id) {
      username
      email
      followers
      followings
      stories {
        id
        title
        content
        createdAt
      }
    }
  }
`;
