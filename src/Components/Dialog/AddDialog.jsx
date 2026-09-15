import * as React from 'react';
import styled from 'styled-components';
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
import AssetText from 'Components/Dialog/AssetText';
import Aws3dConfigField from 'Components/Dialog/Aws3dConfigField';
import useDialogState from 'hooks/useDialogState';
import useDialogSourcesState from 'hooks/useDialogSourcesState';
import useTypeListState from 'hooks/useTypeListState';
import axiosRequest from 'lib/axiosRequest';
import { applyAws3dConfigToSources } from 'lib/aws3dUrl';
import CONSTANTS from 'config/constants';

const isHttpUrl = src => src.startsWith('http');
const isSrcTypeVideo = src => src.srcType === 'video';

const {TOUCH_WEB_SERVER_URL, SERVER_URL} = CONSTANTS;
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
      width: 1000px;
      max-width: 1000px;
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
const IsNewsPreview = styled(EnableScrollVideo)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  margin-bottom: 5px;
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

const convertIframeOnly = (sourceFile) => {
  const [axiosRequestWithAuth, ] = axiosRequest();
  return axiosRequestWithAuth.convertIframeOnly(sourceFile);
}

const uploadAws3dConfig = (file) => {
  const [axiosRequestWithAuth, ] = axiosRequest();
  return axiosRequestWithAuth.putAws3dConfig({ fname: file.name }, file);
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
    addAssetTextState,
    removeAssetTextState,
    clearAssetTextState,
    setIsEditModeState,
    setAssetDetailState,
    assetId,
    assetTitle,
    assetText,
    assetTexts=[],
    displayMode,
    isScrollVideo,
    isNewsPreview,
    isScrollSmooth,
    scrollSpeed,
    aws3dConfig,
    aws3dConfigRemoved,
  } = useDialogState();

  const {
    sources,
    addSourceState,
    updateProgressState,    
  } = useDialogSourcesState();

  const allSourcesUploaded = sources.every((source) => {
    return source.progress === '100%';
  })

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
  const [isConverting, setIsConverting] = React.useState(false);
  const [ffmpegProgress, setFfmpegProgress] = React.useState({});
  const [pendingAws3dFile, setPendingAws3dFile] = React.useState(null);
  const [pendingAws3dMeta, setPendingAws3dMeta] = React.useState(null);

  const CheckIconPreview = isNewsPreview ? CheckBoxIcon : CheckBoxOutlineBlankIcon;
  const CheckIcon = isScrollVideo ? CheckBoxIcon : CheckBoxOutlineBlankIcon;

  const firstWebSourceUrl = React.useMemo(() => {
    const web = sources.find((source) => {
      const candidate = source.srcLocal || source.src || source.srcRemote;
      return source.srcType === 'web' && candidate && String(candidate).startsWith('http');
    });
    if (!web) return null;
    return web.srcLocal || web.src || web.srcRemote;
  }, [sources]);

  const handleClose = React.useCallback((event, reason) => {
    if(reason === 'backdropClick') return;
    reqAborters.current.forEach(aborter => aborter.cancel());
    setIsEditModeState(false);
    setOpen(false);
    clearDialogState();
    clearAssetTextState();
    setFilesToUpload([]);
    setPendingAws3dFile(null);
    setPendingAws3dMeta(null);
  },[setIsEditModeState, setOpen, clearDialogState, clearAssetTextState, setFilesToUpload]);

  const onSelectAws3dFile = React.useCallback((file, meta) => {
    setPendingAws3dFile(file);
    setPendingAws3dMeta(meta);
    setAssetDetailState('aws3dConfigRemoved', false);
  }, [setAssetDetailState]);

  const onClearPendingAws3d = React.useCallback(() => {
    setPendingAws3dFile(null);
    setPendingAws3dMeta(null);
  }, []);

  const onRemoveSavedAws3d = React.useCallback(() => {
    setPendingAws3dFile(null);
    setPendingAws3dMeta(null);
    setAssetDetailState('aws3dConfig', null);
    setAssetDetailState('aws3dConfigRemoved', true);
  }, [setAssetDetailState]);

  const listenSSE = React.useCallback((jobId) => {
    return new Promise((resolve, reject) => {
      if (!jobId) return;
      const source = new EventSource(`${SERVER_URL}/ffmpeg/progress/${jobId}`);
      source.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data)
        if (data.status === 'complete') {
          setFfmpegProgress(data);
          // setStatus('완료!');
          resolve('done')
          source.close();
        } else if (data.status === 'error') {
          // setStatus(`에러: ${data.error}`);
          setFfmpegProgress({});
          source.close();
          resolve('done')
        } else {
          setFfmpegProgress(data);
          // setStatus(`처리 중: ${data.timemark} (${data.percent}%)`);
        }
      };

      source.onerror = () => {
        // setStatus('연결 오류. 다시 시도해주세요.');
        source.close();
        resolve('done')
      };
    })
  }, [])

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
        alert('error in sendFile! check server alive');
        return;
      }
      const resultsParsed = results.map(result => {
        return {
          ...result,
          srcId: parseInt(result.srcId),
          size: parseInt(result.size),
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
      let merged = mergeResults(sources, sourceUploadResults);

      let nextAws3dConfig = aws3dConfig;
      if (pendingAws3dFile) {
        const uploadResult = await uploadAws3dConfig(pendingAws3dFile);
        if (!uploadResult.success) {
          alert(uploadResult.message || 'AWS 3D 방송 구성 업로드에 실패했습니다.');
          return;
        }
        nextAws3dConfig = uploadResult.aws3dConfig;
      } else if (aws3dConfigRemoved) {
        nextAws3dConfig = null;
      }

      const publicRelativePath =
        nextAws3dConfig && nextAws3dConfig.publicRelativePath
          ? nextAws3dConfig.publicRelativePath
          : null;
      merged = applyAws3dConfigToSources(merged, publicRelativePath);

      const assetDetail = {
        assetTitle,
        sources: merged,
        displayMode,
        typeId,
        isFavorite,
        isScrollVideo,
        isNewsPreview,
        isScrollSmooth,
        scrollSpeed,
        assetTexts,
      };
      if (pendingAws3dFile || (!isChanging && nextAws3dConfig)) {
        assetDetail.aws3dConfig = nextAws3dConfig;
      } else if (aws3dConfigRemoved) {
        assetDetail.aws3dConfig = null;
      }
      console.log('assetDetail=', assetDetail);
      // isScrollVideo && await convertIframeOnly(sources)
      if(isScrollVideo && !isChanging){
        const sourceFile = assetDetail.sources[0].srcLocal;
        const result = await convertIframeOnly(sourceFile);
        if(!result.success){
          setIsConverting(false)
          alert('error to convert')
          return;
        } else {
          setIsConverting(true)
          const {jobId} = result;
          await listenSSE(jobId)
        }
        setIsConverting(false)
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
  }, [assetTitle, displayMode, sources, filesToUpload, typeId, isFavorite, isScrollVideo, assetTexts, isEditMode, updateProgressState, isNewsPreview, isScrollSmooth, scrollSpeed, assetId, handleClose, listenSSE, aws3dConfig, aws3dConfigRemoved, pendingAws3dFile]);

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

  const toggleNewsPreview = React.useCallback(() => {
    const newValue = !isNewsPreview;
    setAssetDetailState('isNewsPreview', newValue);
    if(newValue === true){
      const today = new Date();
      const todayString = new Intl.DateTimeFormat("en-US").format(today)
      setAssetDetailState('assetTitle', `8뉴스예고-${todayString}`)
    }
  }, [isNewsPreview, setAssetDetailState])

  const toggleEnableScroll = React.useCallback(() => {
    const newValue = !isScrollVideo;
    setAssetDetailState('isScrollVideo', newValue);
  }, [isScrollVideo, setAssetDetailState])

  const openBrowser = React.useCallback(() => {
    const url = `${TOUCH_WEB_SERVER_URL}/html/news-preview?assetId=${assetId}`;
    console.log(url)
    window.open(url, '_blank', ) 
  }, [assetId])

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
          <IsNewsPreview>
            <CustomIconButton onClick={toggleNewsPreview}>
              <CheckIconPreview fontSize="small" />
            </CustomIconButton>
            <div>8뉴스 예고</div>
            {isNewsPreview && (
              <Button
                size="small"
                variant="contained"
                sx={{marginLeft: '20px'}}
                onClick={openBrowser}
                disabled={!allSourcesUploaded || sources.length === 0}
              >Preview</Button>
            )}
          </IsNewsPreview>
        </TitleContainer>
        <DialogContent>
          <OptionItemText
            autoFocus={true}
            onChange={onChangeAssetTitle}
            title="Title"
            id="assetTitle"
            value={assetTitle}
          />
          {sources.length > 1 && !isNewsPreview && (
            <OptionItemRadio
              onChange={onChangeDisplayMode}
              title="Mode"
              id="displayMode"
              selected={displayModeSelected}
              formItems={formItems}
            />
          )}
          {!isScrollVideo && (
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
              isNewsPreview={isNewsPreview}
            ></DialogSources>
          </DialogAssets>
          <Aws3dConfigField
            aws3dConfig={aws3dConfigRemoved ? null : aws3dConfig}
            pendingFile={pendingAws3dFile}
            pendingMeta={pendingAws3dMeta}
            onSelectFile={onSelectAws3dFile}
            onClearPending={onClearPendingAws3d}
            onRemoveSaved={onRemoveSavedAws3d}
            previewServiceUrl={firstWebSourceUrl}
          />
          {sources.length > 0 && (
            <GuideContainer>
              <GuideText>
                <div>* click <span style={{margin:'5px'}}> <TypeButton /> </span> button to change type of source.</div>
              </GuideText>
              {showScrollCheck && (
                <EnableScrollVideo>
                  {isConverting && (
                    <div>Extracting Iframe...{ffmpegProgress.percent}%</div>
                  )}
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