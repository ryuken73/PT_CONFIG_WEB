import * as React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const CustomDialog = styled(Dialog)`
  div.MuiDialog-container {
    div.MuiPaper-root {
      /* background: #9f7f7f; */
      background: maroon;
      color: white;
      width: 300px;
      max-width: 800px;
    }
  }
`

const ConfirmDialog = props => {
  const {open, handleYes, handleNo, title, isDefaultNo=true} = props;
  const isDefaultYes = !isDefaultNo;

  return (
    <div>
      <CustomDialog
        open={open}
        onClose={handleNo}
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{color: 'white'}} id="alert-dialog-description">
              {title}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{color: 'white'}} onClick={handleNo} autoFocus >No</Button>
          <Button sx={{color: 'white'}} onClick={handleYes} autoFocus={isDefaultYes}>Yes</Button>
        </DialogActions>
      </CustomDialog>
    </div>
  );
}

export default React.memo(ConfirmDialog);