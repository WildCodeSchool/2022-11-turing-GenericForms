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

export const READ_THEME = gql(`
    query ReadOneTheme($themeId: Float!) {
        readOneTheme(themeId: $themeId) {
        themeId
        name
        style
        backgroundColor
        primaryColor
        secondaryColor
        }
    }
`);