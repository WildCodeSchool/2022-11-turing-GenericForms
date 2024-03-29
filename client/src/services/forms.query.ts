import { gql } from "@apollo/client";

export const READ_FORMS = gql(`
  query readForms {
    readForms {
      formId
      userId
      title
      category
      visibility
      themeId
      theme {
        themeId
        name
        style
      }
      user {
        userId
      }
      questions {
        questionId
        type
        title
        description
      }
    }
  }
`);

export const READ_FORM = gql(`
  query ReadOneForm($readOneFormId: String!) {
    readOneFormByFormId(formId: $readOneFormId) {
      formId
      title
      category
      themeId
      visibility
      theme {
        themeId
        name
        style
        primaryColor
        secondaryColor
        backgroundColor
      }
      user {
        userId
      }
      questions {
        questionId
        title
        description
        type
        formId
        choices {
          choiceId
          text
        }
        validation {
          validationId
          required
          textCharMax
          textCharMin
          multipleChoiceMin
          multipleChoiceMax
        }
      }
    }
  }
`);