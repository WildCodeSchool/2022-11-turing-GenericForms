import { gql } from '@apollo/client';

export const UPDATE_FORM = gql(`
mutation UpdateForm($updateFormInput: UpdateFormInput!) {
    updateForm(updateFormInput: $updateFormInput) {
      success
      message
    }
  }
`);