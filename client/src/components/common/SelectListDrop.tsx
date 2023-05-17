import React, { useEffect, useState } from 'react';
import { FormControl, MenuItem, Select, SelectChangeEvent, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import theme from '../../styles/theme';
import { themeConstants } from '../../styles/theme.constants';
import { styles } from './SelectListDrop.styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { SelectItem } from '../../types/common';

interface SelectListDropProps {
    menuItems: SelectItem[];
    handleChange?: any;
    initialValue?: number;
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

const SelectListDrop = ({menuItems, handleChange, initialValue}: SelectListDropProps) => {
    const classes = useStyles();
    const css = useCss(theme);
    const [val, setVal] = useState(initialValue || menuItems[0].value);

    useEffect(() => {
        console.log("SelectListDrop menuItems ===> ", menuItems)
    }, [menuItems]);


    //Pass custom props to redesign the Menu elements used in the Select component : mui.com/material-ui/api/menu/
    //It inherits props from Popover : mui.com/material-ui/api/popover/
    const menuProps = {
        classes: {
            paper: classes.paper,
            list: classes.list,
        },
       anchorOrigin: {
        horizontal: 10,
        vertical: 45,
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

    const handleChangeValue = (event: SelectChangeEvent<string | number>) => {
        setVal(event.target.value);
        handleChange && handleChange(event.target.value);
    };

    return (
        <FormControl>
            <Select
                sx={css.select}
                MenuProps={menuProps}
                IconComponent={iconComponent}
                value={val}
                onChange={handleChangeValue}
            >
                {menuItems.map((item, index) => {
                    return (
                        <MenuItem value={item.value} key={index}>{item.label}</MenuItem>
                    )
                })
                }
            </Select>
        </FormControl>
    )
};

export default SelectListDrop;