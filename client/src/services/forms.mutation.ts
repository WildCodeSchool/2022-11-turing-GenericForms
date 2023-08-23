import { gql } from '@apollo/client';

export const UPDATE_FORM = gql(`
mutation UpdateForm($updateFormInput: UpdateFormInput!) {
    updateForm(updateFormInput: $updateFormInput) {
      success
      message
    }
  }
`);

export const CREATE_FORM = gql(`
mutation CreateForm($createFormInput: CreateFormInput!) {
    createForm(createFormInput: $createFormInput) {
      title
      userId
      themeId
      category
      visibility
    }
  }
`);