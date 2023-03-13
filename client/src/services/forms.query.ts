import { gql } from "@apollo/client";

export const READ_FORMS = gql(`
  query readForms {
    readForms {
      formId
      title
      category
      themeId
      theme {
        themeId
        name
        style
      }
    }
  }
`);

export const READ_FORM = gql(`
  query ReadOneForm($readOneFormId: String!) {
    readOneForm(id: $readOneFormId) {
      formId
      title
      category
      themeId
      theme {
        themeId
        name
        style
        primaryColor
        secondaryColor
        backgroundColor
      }
      questions {
        questionId
        title
        description
        type
        choices {
          choiceId
          text
        }
      }
    }
  }
`);