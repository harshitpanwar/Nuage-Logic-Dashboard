// queries.js

import { gql } from '@apollo/client';

export const CREATE_CONTACT = gql`
  mutation CreateContact($input: ContactInput!) {
    createContact(input: $input) {
      _id
      groupsTag
      displayName
      firstName
      lastName
      nickname
      status
      source
      companyId {
        _id
        name
      }
      title
      workEmail
      additionalWorkEmail
      homeEmail
      mobilePhone
      workPhone
      extension
      linkedin
      homeAddress
      notes
    }
  }
`;

export const UPDATE_CONTACT = gql`
  mutation UpdateContact($id: ID!, $input: ContactInput!) {
    updateContact(id: $id, input: $input) {
      _id
      groupsTag
      displayName
      firstName
      lastName
      nickname
      status
      source
      companyId {
        _id
        name
      }
      title
      workEmail
      additionalWorkEmail
      homeEmail
      mobilePhone
      workPhone
      extension
      linkedin
      homeAddress
      notes
    }
  }
`;
