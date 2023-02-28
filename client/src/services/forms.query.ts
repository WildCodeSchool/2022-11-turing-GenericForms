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