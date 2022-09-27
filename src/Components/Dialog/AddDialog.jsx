import * as React from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import OptionItemText from 'Components/Dialog/OptionItemText';
import OptionItemRadio from 'Components/Dialog/OptionItemRadio';
import DialogAsset from 'Components/Dialog/DialogAsset';
import WebAsset from 'Components/Dialog/WebAsset';
import useDialogState from 'hooks/useDialogState';
import useDialogSourcesState from 'hooks/useDialogSourcesState';
import useDialogWebSourcesState from 'hooks/useDialogWebSourcesState';
import useAssetListState from 'hooks/useAssetListState';
import axiosRequest from 'lib/axiosRequest';
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
  background: maroon;
  opacity: 0.5;
  min-height: 35px;
  border-radius: 10px;
  margin-top: 5px;
`

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const handleDragOver = (event) => {
  event.preventDefault();
};

const saveFiles = (sources, filesToUpload, reqAborters, updateProgress) => {
  return sources.map((source, index) => {
    const blob = filesToUpload[index];
    const params = { fname: source.src, size: source.size };
    const progressHandler = updateProgress(source.id);
    const [axiosRequestWithAuth, aborter] = axiosRequest();
    reqAborters.current.push(aborter);
    return axiosRequestWithAuth.putAttach(params, blob, progressHandler)
  });
};

const saveAsset = (title, type, results) => {
  const sourcesWithFullPath = results.map(result => {
    return {src:result.saved, httpPath:result.httpPath, size: parseInt(result.size)};
  });
  const [axiosRequestWithAuth, ] = axiosRequest();
  const params = {title, type, sources: sourcesWithFullPath};
  return axiosRequestWithAuth.putAsset(params)
}

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
    title,
    type,
  } = useDialogState();

  const {
    sources,
    addSourceState,
    updateProgressState,    
  } = useDialogSourcesState();

  const {
    webSources,
  } = useDialogWebSourcesState();

  const { setAssetsState } = useAssetListState();

  const {
    filesToUpload,
    setFilesToUpload
  } = props

  const reqAborters = React.useRef([]);

  const handleClose = React.useCallback((event, reason) => {
    if(reason === 'backdropClick') return;
    reqAborters.current.forEach(aborter => aborter.cancel());
    const [axiosWithAuth] = axiosRequest();
    axiosWithAuth.getAssetList()
    .then(result => {
      setAssetsState(result.assetList);
    })    
    setOpen(false);
    clearDialogState();
    setFilesToUpload([]);
  },[clearDialogState, setAssetsState, setFilesToUpload, setOpen]);

  const handleAddAsset = React.useCallback(() => {
    console.log(title, type, sources, filesToUpload);
    reqAborters.current = [];
    const sendFilePromise = saveFiles( sources, filesToUpload, reqAborters, updateProgressState);
    Promise.all(sendFilePromise)
    .then(async results => {
      console.log('$$$$',results);
      if(results.some(result => result.success === false)){
        alert('cacnceled!');
        return;
      }
      await saveAsset(title, type, results);
      handleClose();
    })
    .catch(err => {
      console.error(err);
      reqAborters.current.forEach(aborter => aborter.cancel());
    })
  }, [filesToUpload, handleClose, sources, title, type, updateProgressState]);

  const onChangeTitle = React.useCallback((event) => {
    setTitleState(event.target.value);
  },[setTitleState])

  const onChangeType = React.useCallback((type) => {
    setTypeState(type);
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

  return (
    <div>
      <CustomDialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        onDrop={handleDrop} 
        onDragOver={handleDragOver}
        >
        <DialogTitle>{"Add Source"}</DialogTitle>
        <DialogContent>
          <OptionItemText
            autoFocus
            onChange={onChangeTitle}
            title="Title"
            id="title"
            value={title}
          />
          <OptionItemRadio
            onChange={onChangeType}
            title="Type"
            id="assetType"
            selected={type}
            formItems={assetTypeFormItems}
          />
          <Box sx={{marginTop: '10px'}}>Sources</Box>
          {type === 'web' && (
            <DialogAssets>
              {webSources.map(webSource => (
                <WebAsset
                  name={webSource.src}
                ></WebAsset>
              ))}
            </DialogAssets>
          )}
          {(type === 'video' || type === 'image') && (
            <DialogAssets>
              {sources.length === 0 && (
                <Box sx={{padding:'5px',color:'aliceblue', textAlign: 'center'}}>Drop Files.</Box>
              )}
              {sources.map(source => (
                <DialogAsset
                  name={source.src}
                  size={source.size}
                  progress={source.progress}
                ></DialogAsset>
              ))}
            </DialogAssets>
          )}
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