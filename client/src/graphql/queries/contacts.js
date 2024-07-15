// queries.js

import { gql } from '@apollo/client';

export const GET_CONTACTS = gql`
query Contacts($page: Int, $limit: Int) {
  contacts(page: $page, limit: $limit) {
    totalContacts
    contacts {
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
}
`;


// queries.js

export const GET_CONTACT = gql`
query Contact($contactId: ID!) {
  contact(id: $contactId) {
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
      status
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
