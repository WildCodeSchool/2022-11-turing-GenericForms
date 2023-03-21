import React, { useState } from 'react';
import { FormControl, MenuItem, Select, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import theme from '../../styles/theme';
import { themeConstants } from '../../styles/theme.constants';
import { styles } from './SelectListDrop.styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface SelectListDropProps {
    menuItems: any[];
};

//! Possible to use only CSS to delkete this useStyles call ?
const useStyles = makeStyles(styles);

const useCss = (theme: Theme) => ({
    icon:{
        color: theme.palette.primary.main,
        right: 12,
        position: 'absolute',
        userSelect: 'none',
        pointerEvents: 'none'
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
});

const SelectListDrop = ({menuItems}: SelectListDropProps) => {
    const classes = useStyles();
    const css = useCss(theme);
    const [val,setVal] = useState(1);


    //Pass custom props to redesign the Menu elements used in the Select component : mui.com/material-ui/api/menu/
    //It inherits props from Popover : mui.com/material-ui/api/popover/
    const menuProps = {
        classes: {
            paper: classes.paper,
            list: classes.list,
        },
       anchorOrigin: {
        horizontal: 10,
        vertical: 10,
        },
        transformOrigin: {
            horizontal: 10,
            vertical: 10,
        }
    };

    const iconComponent = (props: any) => {
        return (
            <ExpandMoreIcon sx={css.icon}/>
        )
    };

    const handleChange = (event: any) => {
        setVal(event.target.value);
    };

    return (
        <FormControl>
            <Select
                sx={css.select}
                MenuProps={menuProps}
                IconComponent={iconComponent}
                value={val}
                onChange={handleChange}
            >
                {menuItems.map((item) => {
                    return (
                        <MenuItem value={item.value} key={item.id}>{item.label}</MenuItem>
                    )
                })
                }
            </Select>
        </FormControl>
    )
};

export default SelectListDrop;