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
      background: #9f7f7f;
      width: 300px;
      max-width: 800px;
    }
  }
`

const ConfirmDialog = props => {
  const {open, handleYes, handleNo, title} = props;

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
          <DialogContentText id="alert-dialog-description">
              {`delete ${title}?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{color: 'black'}} onClick={handleNo}>No</Button>
          <Button sx={{color: 'black'}} onClick={handleYes} autoFocus>Yes</Button>
        </DialogActions>
      </CustomDialog>
    </div>
  );
}

export default React.memo(ConfirmDialog);