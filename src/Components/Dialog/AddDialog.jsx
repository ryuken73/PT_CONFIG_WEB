import * as React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import OptionItemText from 'Components/Dialog/OptionItemText';
import OptionItemRadio from 'Components/Dialog/OptionItemRadio';
import DialogAsset from 'Components/Dialog/DialogAsset';
import useDialogState from 'hooks/useDialogState';
import CONSTANTS from 'config/constants';

const assetTypeFormItems = [
  {label: 'video', value: 'video'},
  {label: 'image', value: 'image'},
  {label: 'web', value: 'web'}
];

const CustomDialog = styled(Dialog)`
  div.MuiDialog-container {
    div.MuiPaper-root {
      background: #9f7f7f;
      width: 800px;
      max-width: 800px;
    }
  }
`
const DialogAssets = styled.div`
  width: 100%;
  background: black;
`

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const handleDragOver = (event) => {
  event.preventDefault();
};

const toArray = obj => {
  return Object.values(obj);
}

const AddDialog = props => {
  const {
    dialogOpen: open,
    setDialogOpenState: setOpen,
    clearDialogState,
    setTitleState,
    setTypeState,
    addSourceState,
    title,
    type,
    sources
  } = useDialogState();

  const {
    filesToUpload,
    setFilesToUpload
  } = props

  const handleClose = React.useCallback((event, reason) => {
    if(reason === 'backdropClick') return;
    setOpen(false);
    clearDialogState();
    setFilesToUpload([]);
  },[clearDialogState, setFilesToUpload, setOpen]);

  const handleAddAsset = React.useCallback(() => {
    console.log(title, type, sources, filesToUpload);
    handleClose();
  }, [filesToUpload, handleClose, sources, title, type]);

  const onChangeTitle = React.useCallback((event) => {
    setTitleState(event.target.value);
  },[setTitleState])

  const onChangeType = React.useCallback((event) => {
    setTypeState(event.target.value);
  },[setTypeState])

  const handleDrop = React.useCallback((event) => {
    const {files} = event.dataTransfer;
    const filesArray = toArray(files);
    console.log(files, filesArray);
    const now = Date.now();
    setFilesToUpload(filesToUpload => [...filesToUpload, ...filesArray]);
    filesArray.forEach(file => {
      const id = now + 1;
      const {name, size} = file;
      addSourceState({src: name, size, id});
    })
  },[addSourceState, setFilesToUpload])

  // const onChangeOption = React.useCallback((event, idOfRadiioButton) => {
  //     const key = event.target.id !== '' ? event.target.id : idOfRadiioButton;
  //     const { value } = event.target;
  //     console.log(key, value)
  //     setAsset({
  //       ...asset,
  //       [key]: value
  //     })
  //   },
  //   [setAsset, asset]
  // );

  return (
    <div>
      <CustomDialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        onDrop={handleDrop} 
        onDragOver={handleDragOver}>
      >
        <DialogTitle>{"Add Asset"}</DialogTitle>
        <DialogContent>
          <OptionItemText
            autoFocus
            onChange={onChangeTitle}
            title="TITLE"
            id="title"
            value={title}
          />
          <OptionItemRadio
            onChange={onChangeType}
            title="TYPE"
            id="assetType"
            selected={type}
            formItems={assetTypeFormItems}
          />
          <div>ASSETS</div>
          <DialogAssets>
            {sources.map(source => (
              <DialogAsset
                name={source.src}
                size={source.size}
                progress={source.progress}
              ></DialogAsset>
            ))}
          </DialogAssets>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: 'black' }} onClick={handleClose}>
            Cancel
          </Button>
          <Button sx={{ color: 'black' }} onClick={handleAddAsset}>
            Add
          </Button>
        </DialogActions>
      </CustomDialog>
    </div>
  );
}

export default React.memo(AddDialog);