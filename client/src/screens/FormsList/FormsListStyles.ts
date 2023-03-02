import { Theme  } from '@mui/material';
import { themeConstants } from '../../styles/theme.constants';

export const styles = ((theme: Theme) => ({
    title: {
        color: theme.palette.custom.main,
    },
    paper: {
        borderRadius: 12,
        marginTop: 8
    },
    list: {
        paddingTop:0,
        paddingBottom:0,
        background: themeConstants.colors.paperWhite,
        "& li":{
            fontWeight:400,
            paddingTop:12,
            paddingBottom:12,
        },
        "& li:hover":{
            background: theme.palette.primary.light
        },
        "& li.Mui-selected":{
            color: themeConstants.colors.paperWhite,
            background: theme.palette.primary.main
        },
        "& li.Mui-selected:hover":{
            background: theme.palette.primary.light,
            color: theme.palette.primary.main,
        }
    },
    select: {
        minWidth: 80,
        height: 40,
        backgroundColor: themeConstants.colors.paperWhite,
        color: theme.palette.primary.main,
        fontWeight: 400,
        borderStyle: 'none',
        borderWidth: 2,
        borderRadius: 1,
        padding: 1,
        boxShadow: '0px 5px 8px -3px rgba(0,0,0,0.14)',
    },
}));