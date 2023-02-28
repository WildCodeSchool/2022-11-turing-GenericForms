import { gql } from "@apollo/client";

export const READ_USER = gql(`
query ReadOneUser($readOneUserId: String!) {
    readOneUser(id: $readOneUserId) {
      userId
      role
      firstName
      lastName
      email
      createdAt
      updatedAt
    }
  }
`);