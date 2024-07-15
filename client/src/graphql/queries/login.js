import { gql } from '@apollo/client';

export const LOGIN_QUERY = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userId
      token
      tokenExpiration
    }
  }
`;

export const ME_QUERY = gql`
    query Me {
        me {
        _id
        email
        }
    }
    `;

