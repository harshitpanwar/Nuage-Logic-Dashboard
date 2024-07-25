import { gql } from "@apollo/client";

export const SIGNUP_MUTATION = gql`
mutation CreateUser($userInput: UserInput) {
  createUser(userInput: $userInput) {
    _id
    email
    password
  }
}`;
