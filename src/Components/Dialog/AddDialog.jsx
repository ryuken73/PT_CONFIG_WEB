import * as React from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import ButtonSmall from 'Components/Common/ButtonSmall';
import OptionItemText from 'Components/Dialog/OptionItemText';
import OptionItemRadio from 'Components/Dialog/OptionItemRadio';
import DialogAddUrl from 'Components/Dialog/DialogAddUrl';
import DialogSources from 'Components/Dialog/DialogSources';
import ScrollVideoOptions from 'Components/Dialog/ScrollVideoOptions';
import AssetText from 'Components/Dialog/AssetText';
import useDialogState from 'hooks/useDialogState';
import useDialogSourcesState from 'hooks/useDialogSourcesState';
import useAssetListState from 'hooks/useAssetListState';
import useTypeListState from 'hooks/useTypeListState';
import axiosRequest from 'lib/axiosRequest';
import CONSTANTS from 'config/constants';

const isHttpUrl = src => src.startsWith('http');
const isSrcTypeVideo = src => src.srcType === 'video';

const videoExtensions = ['M3M8', 'MP4'];
const imageExtensions = ['JPG', 'GIF', 'PNG', 'ICO', 'BMP'];
const typeInfer = name => {
  const isVideo = videoExtensions.some(extension => {
    return name.toUpperCase().endsWith(extension)
  })
  const isImage = imageExtensions.some(extension => {
    return name.toUpperCase().endsWith(extension)
  })
  return isVideo ? 'video' : isImage ? 'image' : 'web';
}

const formItems = [
  {label: 'Row', value: 'flexRow'},
  {label: 'Column', value: 'flexColumn'},
  {label: 'Swipe', value: 'swipe'}
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
const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
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
  background: indigo;
  opacity: 1;
  /* min-height: 35px; */
  border-radius: 5px;
  margin-top: 5px;
`
const GuideContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 12px;
`
const GuideText = styled.div`
  color: darkblue;
  padding: 1px;
  margin-top: 10px;
  margin-left: 12px;
`
const EnableScrollVideo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: auto;
`
const CustomIconButton = styled(IconButton)`
  && {
    color: ${(props) => props.disabled ? 'black !important' : '#1976d2 !important'};
    padding: 5px;
    margin-top: 5px;
    background: ${(props) =>
      props.disabled ? 'transparent !important' : 'transparent'};
    opacity: 1;
  }
`
const TypeButton = () => {
  return (
    <ButtonSmall 
      background="transparent" 
      hoverBackground="transparent" 
      hoverBorder="1px solid white" 
      padding="2px" borderRadius="6px" 
      border="1px solid" 
      fontSize="5px"
    >type
    </ButtonSmall>
  )
}

const GuideMessage = styled.div`
  font-size: 12px;
  margin-left: 5px;
  color: darkblue;
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
    const params = { fname: `${Date.now()}_${src}`, size, srcId };
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

const saveAsset = (assetDetail) => {
  // console.log('$$$1', assetTitle, displayMode, sources, results);
  const [axiosRequestWithAuth, ] = axiosRequest();
  return axiosRequestWithAuth.putAsset(assetDetail)
}

const changeAsset = (assetId, assetDetail) => {
  const [axiosRequestWithAuth, ] = axiosRequest();
  const params = {assetId, ...assetDetail};
  return axiosRequestWithAuth.postAsset(params)
}

const toArray = obj => {
  return Object.values(obj);
}

const TYPE_ID_FAVORITE = 0;
const TYPE_ID_ALL = 1;
const TYPE_ID_NONE = 2;

const AddDialog = props => {
  const {
    dialogOpen: open,
    isEditMode,
    setDialogOpenState: setOpen,
    clearDialogState,
    // setAssetTitleState,
    // setDisplayModeState,
    addAssetTextState,
    removeAssetTextState,
    clearAssetTextState,
    setIsEditModeState,
    setAssetDetailState,
    assetId,
    assetTitle,
    assetText,
    assetTexts,
    displayMode,
    isScrollVideo,
    isScrollSmooth,
    scrollSpeed,
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

  const { currentTypeId } = useTypeListState();
  const typeId = currentTypeId === TYPE_ID_ALL ?  TYPE_ID_NONE :
                 currentTypeId === TYPE_ID_FAVORITE ? TYPE_ID_NONE :
                 currentTypeId 
  const isFavorite = currentTypeId === TYPE_ID_FAVORITE;

  const {
    filesToUpload,
    setFilesToUpload
  } = props

  const reqAborters = React.useRef([]);
  const [currentUrl, setCurrentUrl] = React.useState('http://');
  // const [isScrollVideoChecked, setIsScrollVideoChecked] = React.useState(false);
  // const [isScrollSmooth, setIsScrollSmooth] = React.useState(false);
  // const [scrollSpeed, setScrollSpeed] = React.useState(150);

  const CheckIcon = isScrollVideo ? CheckBoxIcon : CheckBoxOutlineBlankIcon;

  const handleClose = React.useCallback((event, reason) => {
    if(reason === 'backdropClick') return;
    reqAborters.current.forEach(aborter => aborter.cancel());
    // loadAssetListState();
    setIsEditModeState(false);
    setOpen(false);
    clearDialogState();
    clearAssetTextState();
    setFilesToUpload([]);
  },[clearDialogState, setFilesToUpload, setIsEditModeState, setOpen, clearAssetTextState]);

  const handleAddAsset = React.useCallback(() => {
    console.log('$$$', assetTitle, displayMode, sources, filesToUpload, typeId, isFavorite, isScrollVideo, assetTexts);
    const isChanging = isEditMode;
    const fileSources = isChanging 
                        ? sources.filter(source => !isHttpUrl(source.src) && source.progress === '0%')
                        : sources.filter(source => !isHttpUrl(source.src));
    const httpSources = isChanging 
                        ? sources.filter(source => isHttpUrl(source.src) && source.progress === '0%')
                        : sources.filter(source => isHttpUrl(source.src));
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
      const httpSrcFakeResults = httpSources.map(source => {
        return {
          ...source,
          srcLocal: source.src,
          srcRemote: source.src,
          success: true
        }
      })
      const sourceUploadResults = [...resultsParsed, ...httpSrcFakeResults];
      console.log(resultsParsed, httpSrcFakeResults);
      const merged = mergeResults(sources, sourceUploadResults);
      const assetDetail = {
        assetTitle,
        sources: merged,
        displayMode,
        typeId,
        isFavorite,
        isScrollVideo,
        isScrollSmooth,
        scrollSpeed,
        assetTexts
      }
      isChanging 
      ? await changeAsset(assetId, assetDetail)
      : await saveAsset(assetDetail);
      handleClose();
    })
    .catch(err => {
      console.error(err);
      reqAborters.current.forEach(aborter => aborter.cancel());
    })
  }, [
    assetTitle, 
    displayMode, 
    sources, 
    filesToUpload, 
    typeId, 
    isFavorite, 
    isScrollVideo, 
    isEditMode, 
    updateProgressState, 
    isScrollSmooth, 
    scrollSpeed, 
    assetId, 
    handleClose,
    assetTexts
  ]);

  const onChangeAssetTitle = React.useCallback((event) => {
    setAssetDetailState('assetTitle', event.target.value)

  },[setAssetDetailState])

  const onChangeAssetText = React.useCallback((event) => {
    setAssetDetailState('assetText', event.target.value)
  },[setAssetDetailState])

  const onKeyUpAssetText = React.useCallback((event) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
      const textId = Date.now();
      addAssetTextState(textId, assetText);
      setAssetDetailState('assetText', '')
    }
  }, [addAssetTextState, assetText, setAssetDetailState])

  const onChangeDisplayMode = React.useCallback((displayMode) => {
    setAssetDetailState('displayMode', displayMode)
  },[setAssetDetailState])

  const onKeyUpUrl = React.useCallback((event) => {
    if(event.keyCode === 13){
      if(currentUrl.length < 8){
          alert('url too small. enter valid url.');
          return;
      }
      if(!(currentUrl.startsWith('http://') || currentUrl.startsWith('https://'))){
          alert('not valid url(need to http:// or https://)');
          return;
      }
      const srcId = Date.now();
      addSourceState({src: currentUrl, size: null, srcType:'web', srcId});
      setCurrentUrl('http://');
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
      const srcType = typeInfer(name);
      addSourceState({src: name, size, srcType, srcId: id});
    })
  },[addSourceState, setFilesToUpload])

  const toggleEnableScroll = React.useCallback(() => {
    const newValue = !isScrollVideo;
    setAssetDetailState('isScrollVideo', newValue);
  }, [isScrollVideo, setAssetDetailState])

  const setIsScrollSmooth = React.useCallback((value) => {
    setAssetDetailState('isScrollSmooth', value);
  }, [setAssetDetailState])

  const setScrollSpeed = React.useCallback((value) => {
    setAssetDetailState('scrollSpeed', value);
  }, [setAssetDetailState])

  const titleText = isEditMode ? 'Edit Source' : 'Add Source';
  const addBtnText = isEditMode ? 'Apply' : 'Add';
  const displayModeDefault = displayMode || 'flexRow';
  const displayModeSelected = sources.length > 1 && displayModeDefault;
  const showScrollCheck = sources.length === 1 && isSrcTypeVideo(sources[0]);

  React.useEffect(() => {
    if(showScrollCheck === false) {
      setAssetDetailState('isScrollVideo', false);
    }
  }, [setAssetDetailState, showScrollCheck])

  const Guide = sources.length === 0 ?
    "[Drag Images or Videos. Or Type URL and click +]" : 
    "";

  return (
    <div>
      <CustomDialog
        open={open}
        TransitionComponent={Transition}
        // keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        onDrop={handleDrop} 
        onDragOver={handleDragOver}
        >
        <TitleContainer>
          <DialogTitle>
            {titleText}
          </DialogTitle>
          <GuideMessage>
            {Guide}
          </GuideMessage>
        </TitleContainer>
        <DialogContent>
          <OptionItemText
            autoFocus={true}
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
              selected={displayModeSelected}
              formItems={formItems}
            />
          )}
          {isScrollVideo ? (
              <ScrollVideoOptions
                isScrollSmooth={isScrollSmooth}
                scrollSpeed={scrollSpeed}
                setIsScrollSmooth={setIsScrollSmooth}
                setScrollSpeed={setScrollSpeed}
              >
              </ScrollVideoOptions>
            ) : (
            <AddUrlContainer>
              <DialogAddUrl
                value={currentUrl}
                setCurrentUrl={setCurrentUrl}
                onChange={onChangeUrl}
                onKeyUp={onKeyUpUrl}
              ></DialogAddUrl>
            </AddUrlContainer>
          )}
          <DialogAssets>
            <DialogSources
              sources={sources}
            ></DialogSources>
          </DialogAssets>
          {sources.length > 0 && (
            <GuideContainer>
              <GuideText>
                <div>* click <span style={{margin:'5px'}}> <TypeButton /> </span> button to change type of source.</div>
              </GuideText>
              {showScrollCheck && (
                <EnableScrollVideo>
                  <CustomIconButton onClick={toggleEnableScroll}>
                    <CheckIcon fontSize="small" />
                  </CustomIconButton>
                  <div>scroll-video</div>
                </EnableScrollVideo>
              )}
            </GuideContainer>
          )}
          <OptionItemText
            autoFocus={false}
            onChange={onChangeAssetText}
            onKeyUp={onKeyUpAssetText}
            title="Text"
            id="assetText"
            value={assetText}
          />
          {assetTexts.map(({textId, assetText}) => (
            <AssetText 
              key={textId} 
              textId={textId} 
              assetText={assetText} 
              removeAssetText={removeAssetTextState}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: 'black' }} onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            disabled={sources.length === 0} 
            sx={{ color: 'black' }} 
            // onClick={isEditMode ? handleChangeAsset : handleAddAsset}
            onClick={handleAddAsset}
          >
            {addBtnText}
          </Button>
        </DialogActions>
      </CustomDialog>
    </div>
  );
}

export default React.memo(AddDialog);