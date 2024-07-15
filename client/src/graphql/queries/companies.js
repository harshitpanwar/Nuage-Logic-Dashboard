import { gql } from "@apollo/client";

export const GET_COMPANIES = gql`
query GetCompanies($page: Int, $limit: Int) {
  getCompanies(page: $page, limit: $limit) {
    companies {
      _id
      name
      groupsTag
      status
      assigned {
        _id
        email
      }
      notes
      logo
      summary
      opportunityTag
      specialties
      industry
      revenue
      size
      locations
      officePhone
      website
      mainContact {
        _id
        displayName
      }
      contacts {
        _id
        displayName
      }
    }
    totalCompanies
  }
}`;

export const GET_COMPANY = gql`
query GetCompany($companyId: ID!) {
  getCompany(companyId: $companyId) {
      _id
      name
      groupsTag
      status
      assigned {
        _id
        email
      }
      notes
      logo
      summary
      opportunityTag
      specialties
      industry
      revenue
      size
      locations
      officePhone
      website
      mainContact {
        _id
        groupsTag
        displayName
        firstName
        lastName
        nickname
        status
        source
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
      contacts {
        _id
        groupsTag
        displayName
        firstName
        lastName
        nickname
        status
        source
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
