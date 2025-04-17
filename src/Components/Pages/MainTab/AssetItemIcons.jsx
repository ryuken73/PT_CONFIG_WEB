import React from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import useAssetListState from 'hooks/useAssetListState';
import useDialogAssetState from 'hooks/useDialogAssetState';
import useDialogAssetSourcesState from 'hooks/useDialogAssetSourcesState';
import useHeaderAssetState from 'hooks/useHeaderAssetState';

const basename = path => path.substring(path.lastIndexOf('\\') + 1);

const Container = styled(Box)`
  && {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    min-height: 40px;
  }
`

const IconContainer = styled(Container)`
  /* margin-left: 20px; */
  margin-right: 30px;
`
const IconBox = styled(Box)`
  min-width: 40px;
`
const CustomIconButton = styled(IconButton)`
  && {
    color: ${(props) => props.disabled ? 'grey !important' : 'white !important'};
    padding: 5px;
    background: ${(props) =>
      props.disabled ? 'transparent !important' : 'transparent'};
    opacity: 0.6;
  }
`
const RedDeleteIcon = styled(DeleteIcon)`
  color: red;
`
const AssetItemIcons = (props) => {
  const { asset } = props;
  const {
    assetId,
    assetTitle,
    displayMode,
    isScrollVideo,
    isNewsPreview,
    isScrollSmooth,
    scrollSpeed,
    assetTexts,
    sources,
  } = asset;

  const {
    removeAssetState,
  } = useAssetListState();

  const {
    setDialogOpenState,
    setIsEditModeState,
    setAssetDetailState,
  } = useDialogAssetState();

  const {
    setSourcesState,
    updateProgressState,
  } = useDialogAssetSourcesState();

  const { 
    assetsActive, 
    addAssetActiveState, 
    removeAssetActiveState 
  } = useHeaderAssetState();
  
  const isAssetActive = assetsActive.some(asset => asset.assetId === assetId)

  const CheckIcon = isAssetActive ? CheckBoxIcon : CheckBoxOutlineBlankIcon;

  const onClickEdit = React.useCallback(() => {
    if(isAssetActive){
      alert('Remove asset from active list first.')
      return
    }
    setAssetDetailState('assetId', assetId);
    setAssetDetailState('assetTitle', assetTitle);
    setAssetDetailState('displayMode', displayMode);
    setAssetDetailState('isScrollVideo', isScrollVideo);
    setAssetDetailState('isNewsPreview', isNewsPreview);
    setAssetDetailState('isScrollSmooth', isScrollSmooth);
    setAssetDetailState('scrollSpeed', scrollSpeed);
    setAssetDetailState('assetTexts', assetTexts);
    const sourcesBasename = sources.map(source => {
      return {
        ...source,
        src:basename(source.srcLocal)
      }
    });
    setSourcesState(sourcesBasename);
    sources.forEach(source => {
      updateProgressState(source.srcId)('100%');
    })
    setIsEditModeState(true);
    setDialogOpenState(true);
  },[isAssetActive, setAssetDetailState, assetId, assetTitle, displayMode, isScrollVideo, isNewsPreview, isScrollSmooth, scrollSpeed, assetTexts, sources, setSourcesState, setIsEditModeState, setDialogOpenState, updateProgressState]);

  const toggleActive = React.useCallback(() => {
    if(isAssetActive){
      removeAssetActiveState(assetId);
    } else {
      addAssetActiveState(asset);
    }
  }, [addAssetActiveState, asset, assetId, isAssetActive, removeAssetActiveState])

  const onClickRemove = React.useCallback(() => {
    if(isAssetActive){
      alert('Remove asset from active list first.')
      return
    }
    removeAssetState(assetId)
  },[assetId, isAssetActive, removeAssetState]);

  return (
    <IconContainer>
      <IconBox>
        <CustomIconButton onClick={toggleActive}>
          <CheckIcon fontSize="small" />
        </CustomIconButton>
      </IconBox>
      <IconBox>
        <CustomIconButton onClick={onClickEdit} disabled={isAssetActive}>
          <EditIcon fontSize="small" />
        </CustomIconButton>
      </IconBox>
      <IconBox>
        <CustomIconButton onClick={onClickRemove} disabled={isAssetActive}>
          <RedDeleteIcon fontSize="small" />
        </CustomIconButton>
      </IconBox>
    </IconContainer>
  )
};

export default React.memo(AssetItemIcons);
