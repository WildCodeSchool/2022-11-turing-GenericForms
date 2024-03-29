import { gql } from "@apollo/client";

export const UPDATE_QUESTION = gql(`
    mutation UpdateQuestion($updateQuestionInput: UpdateQuestionInput!) {
        updateQuestion(updateQuestionInput: $updateQuestionInput) {
            message
            success
        }
    }
`);

export const CREATE_QUESTION = gql(`
mutation CreateQuestion($createQuestionInput: CreateQuestionInput!) {
    createQuestion(createQuestionInput: $createQuestionInput) {
      questionId
      formId
      title
      type
      description
    }
  }
`);

export const DELETE_QUESTION = gql(`
  mutation DeleteQuestion($questionId: Float!) {
    deleteQuestion(questionId: $questionId) {
      message
      success
    }
  }
`);

