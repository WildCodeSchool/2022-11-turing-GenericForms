import { gql } from "@apollo/client";

export const READ_USER = gql(`
query ReadOneUser($readOneUserId: String!) {
  readOneUser(id: $readOneUserId) {
    userId
    firstName
    lastName
    email
    role
    createdAt
    updatedAt
    forms {
      formId
      userId
      title
      category
      visibility
      themeId
      questions {
        questionId
        type
        title
        description
      }
      theme {
        themeId
        name
        style
        primaryColor
        secondaryColor
        backgroundColor
      }
    }
  }
}
`);