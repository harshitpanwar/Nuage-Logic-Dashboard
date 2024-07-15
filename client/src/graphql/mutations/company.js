import { gql } from '@apollo/client';

export const CREATE_COMPANY = gql`
  mutation CreateCompany($companyInput: CompanyInput) {
    createCompany(companyInput: $companyInput) {
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
        firstName
        lastName
        groupsTag
        status
      }
      contacts {
        _id
        firstName
        lastName
        groupsTag
        status
      }
    }
  }
`;

export const UPDATE_COMPANY = gql`
  mutation UpdateCompany($companyId: ID, $companyInput: CompanyInput) {
    updateCompany(id: $companyId, input: $companyInput) {
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
        firstName
        lastName
        groupsTag
        status
      }
      contacts {
        _id
        firstName
        lastName
        groupsTag
        status
      }
    }
  }
`;
