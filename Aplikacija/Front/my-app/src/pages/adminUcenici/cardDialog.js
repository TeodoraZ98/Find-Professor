import Dialog from '@mui/material/Dialog';
import React from 'react';

const CardDialog = props => {
  const [open, setOpen] = React.useState(false);
  const [scroll] = React.useState('paper');



  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  return (
    <div>
      
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        
      </Dialog>
    </div>
  );
};
export default CardDialog;
