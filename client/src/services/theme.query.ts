import {gql} from "@apollo/client";

export const READ_THEMES = gql(`
    query ReadThemes {
        readThemes {
            themeId
            name
            style
            backgroundColor
            primaryColor
            secondaryColor
        }
    }
`);