import { gql } from "@apollo/client";
export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      user
      error
    }
  }
`;
export const REGISTER_USER = gql`
  mutation registerUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    createUser(username: $username, email: $email, password: $password) {
      user
      error
    }
  }
`;
export const UPDATE_STORY = gql`
  mutation updateStory($id: ID!, $title: String, $content: String) {
    updateStory(id: $id, title: $title, content: $content) {
      id
      title
      content
    }
  }
`;
export const DELETE_STORY = gql`
  mutation deleteStory($id: ID!) {
    deleteStory(id: $id) {
      id
    }
  }
`;
export const CREATE_STORY = gql`
  mutation CreateStory($title: String!, $content: String!) {
    createStory(title: $title, content: $content) {
      id
    }
  }
`;
export const LOGOUT = gql`
  mutation {
    logout {
      id
    }
  }
`;
export const COMMENT = gql`
  mutation comment($id: ID!, $comment: String) {
    comment(id: $id, comment: $comment) {
      id
      comments {
        author
        comment
      }
    }
  }
`;
export const REACT = gql`
  mutation react($id: ID!) {
    react(id: $id) {
      id
      reactions
    }
  }
`;
export const FOLLOW_USER = gql`
  mutation followUser($id: ID!) {
    followUser(id: $id) {
      id
      followings
      followers
    }
  }
`;
