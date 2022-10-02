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
import DialogAddUrl from 'Components/Dialog/DialogAddUrl';
import DialogSources from 'Components/Dialog/DialogSources';
import useDialogState from 'hooks/useDialogState';
import useDialogSourcesState from 'hooks/useDialogSourcesState';
import useAssetListState from 'hooks/useAssetListState';
import axiosRequest from 'lib/axiosRequest';
import CONSTANTS from 'config/constants';

const isHttpUrl = src => src.startsWith('http');

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
const AddUrlContainer = styled.div`
  width: 100%;
  background: transparent;
  opacity: 0.8;
  min-height: 35px;
  border-radius: 10px;
  margin-top: 5px;
`
const DialogAssets = styled.div`
  width: 100%;
  background: deeppink;
  opacity: 1;
  /* min-height: 35px; */
  border-radius: 5px;
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
    const {src, size, srcId} = source;
    const params = { fname: src, size, srcId };
    const progressHandler = updateProgress(source.srcId);
    const [axiosRequestWithAuth, aborter] = axiosRequest();
    reqAborters.current.push(aborter);
    return axiosRequestWithAuth.putAttach(params, blob, progressHandler)
  });
};

const mergeResults = (sources, results) => {
  return sources.map(source => {
    return {
      ...source,
      ...results.find(result => result.srcId === source.srcId),
      progress: '100%'
    }
  })
}

const saveAsset = (assetTitle, displayMode, sources, results) => {
  // console.log('$$$1', assetTitle, displayMode, sources, results);
  const merged = mergeResults(sources, results);
  // console.log('$$$2', assetTitle, displayMode, sources, results, merged);
  const [axiosRequestWithAuth, ] = axiosRequest();
  const params = {assetTitle, displayMode, sources: merged};
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
    setAssetTitleState,
    setDisplayModeState,
    assetTitle,
    displayMode,
  } = useDialogState();

  const {
    sources,
    addSourceState,
    updateProgressState,    
  } = useDialogSourcesState();

  const { 
    loadAssetListState, 
    // setAssetsState 
  } = useAssetListState();

  const {
    filesToUpload,
    setFilesToUpload
  } = props

  const reqAborters = React.useRef([]);
  const [currentUrl, setCurrentUrl] = React.useState('http://');

  const handleClose = React.useCallback((event, reason) => {
    if(reason === 'backdropClick') return;
    reqAborters.current.forEach(aborter => aborter.cancel());
    loadAssetListState();
    // const [axiosWithAuth] = axiosRequest();
    // axiosWithAuth.getAssetList()
    // .then(result => {
    //   setAssetsState(result.assetList);
    // })    
    setOpen(false);
    clearDialogState();
    setFilesToUpload([]);
  },[clearDialogState, loadAssetListState, setFilesToUpload, setOpen]);

  const handleAddAsset = React.useCallback(() => {
    console.log('$$$', assetTitle, displayMode, sources, filesToUpload);
    const fileSources = sources.filter(source => !isHttpUrl(source.src));
    reqAborters.current = [];
    const sendFilePromise = saveFiles(fileSources, filesToUpload, reqAborters, updateProgressState);
    Promise.all(sendFilePromise)
    .then(async results => {
      console.log('$$$$',results);
      if(results.some(result => result.success === false)){
        alert('cacnceled!');
        return;
      }
      const resultsParsed = results.map(result => {
        return {
          ...result,
          srcId: parseInt(result.srcId),
          size: parseInt(result.size)
        }
      })
      await saveAsset(assetTitle, displayMode, sources, resultsParsed);
      handleClose();
    })
    .catch(err => {
      console.error(err);
      reqAborters.current.forEach(aborter => aborter.cancel());
    })
  }, [filesToUpload, handleClose, sources, assetTitle, displayMode, updateProgressState]);

  const onChangeAssetTitle = React.useCallback((event) => {
    setAssetTitleState(event.target.value);
  },[setAssetTitleState])

  const onChangeDisplayMode = React.useCallback((displayMode) => {
    setDisplayModeState(displayMode);
  },[setDisplayModeState])

  const onKeyUpUrl = React.useCallback((event) => {
    if(event.keyCode === 13){
      if(currentUrl.length < 8){
          alert('url too small. enter valid url.');
          return;
      }
      const srcId = Date.now();
      addSourceState({src: currentUrl, size: null, srcType:'web', srcId});
    }
  },[addSourceState, currentUrl])

  const onChangeUrl = React.useCallback((event) => {
    setCurrentUrl(event.target.value);
  },[])

  const handleDrop = React.useCallback((event) => {
    const {files} = event.dataTransfer;
    const filesArray = toArray(files);
    console.log(files, filesArray);
    const now = Date.now();
    setFilesToUpload(filesToUpload => [...filesToUpload, ...filesArray]);
    filesArray.forEach((file, index) => {
      const id = now + index;
      const {name, size} = file;
      addSourceState({src: name, size, srcId: id});
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
            onChange={onChangeAssetTitle}
            title="Title"
            id="assetTitle"
            value={assetTitle}
          />
          {sources.length > 1 && (
            <OptionItemRadio
              onChange={onChangeDisplayMode}
              title="Mode"
              id="displayMode"
              selected={displayMode}
              formItems={assetTypeFormItems}
            />
          )}
          <Box sx={{marginTop: '10px', marginBottom: '10px'}}>Sources</Box>
          <AddUrlContainer>
            <DialogAddUrl
              value={currentUrl}
              setCurrentUrl={setCurrentUrl}
              onChange={onChangeUrl}
              onKeyUp={onKeyUpUrl}
            ></DialogAddUrl>
          </AddUrlContainer>
          <DialogAssets>
            <DialogSources
              sources={sources}
            ></DialogSources>
          </DialogAssets>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: 'black' }} onClick={handleClose}>
            Cancel
          </Button>
          <Button disabled={sources.length === 0} sx={{ color: 'black' }} onClick={handleAddAsset}>
            Add
          </Button>
        </DialogActions>
      </CustomDialog>
    </div>
  );
}

export default React.memo(AddDialog);