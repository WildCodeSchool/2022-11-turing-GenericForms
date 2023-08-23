import * as React from 'react';
import {Popover as MuiPopover} from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

interface PopoverProps {
    btnTitle: string;
    btnColor?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
    children?: React.ReactNode;
    customStyle?: React.CSSProperties;
}

const Popover = ({btnTitle, children, btnColor = 'primary', customStyle}: PopoverProps) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button aria-describedby={id} variant="contained" onClick={handleClick} color={btnColor} sx={customStyle}>
       {btnTitle}
      </Button>
      <MuiPopover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {children ? children : <Typography sx={{ p: 2 }}>Aucun élément défini pour le popover.</Typography> }
      </MuiPopover>
    </div>
  );
}

export default Popover;