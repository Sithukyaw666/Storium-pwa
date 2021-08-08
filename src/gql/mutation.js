import { gql } from "@apollo/client";
export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      id
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
      user
    }
  }
`;
export const CLAP = gql`
  mutation clap($id: ID!) {
    clap(id: $id) {
      id
    }
  }
`;
export const FOLLOW_USER = gql`
  mutation followUser($id: ID!) {
    followUser(id: $id) {
      id
    }
  }
`;
