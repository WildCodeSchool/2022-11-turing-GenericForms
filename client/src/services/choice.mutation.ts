import { gql } from "@apollo/client";

export const CREATE_CHOICE = gql(`
    mutation CreateChoice($createChoiceInput: CreateChoiceInput!) {
        createChoice(createChoiceInput: $createChoiceInput) {
            choiceId
            questionId
            text
        }
    }
`);

export const UPDATE_CHOICE = gql(`
    mutation UpdateChoice($updateChoiceInput: UpdateChoiceInput!) {
        updateChoice(updateChoiceInput: $updateChoiceInput) {
            message
            success
        }
    }
`);