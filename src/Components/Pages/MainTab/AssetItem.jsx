import React from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import CheckBox from 'Components/Common/CheckBox';
import TextBox from 'Components/Common/TextBox';
import TypeSelect from 'Components/Pages/MainTab/TypeSelect';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import colors from 'config/colors';
import useAssetListState from 'hooks/useAssetListState';
import useDialogState from 'hooks/useDialogState';
import useDialogSourcesState from 'hooks/useDialogSourcesState';
import useHeaderState from 'hooks/useHeaderState';

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
const TextContainer = styled(Container)`
  && {
    width: 100%;
    opacity: 1;
    background: ${(props) => (props.checked ? colors.checked : 'transparent')};
  }
`;
const IconContainer = styled(Container)`
  /* margin-left: 20px; */
  margin-right: 30px;
`
const IconBox = styled(Box)`
  min-width: 40px;
`
const TinyBox = styled(Box)`
  flex: 0;
  /* flex: 1; */
  min-width: 60px;
  /* max-width: 100px; */
`
const SmallBox = styled(Box)`
  flex: 0;
  /* flex: 2; */
  min-width: 120px;
  /* max-width: 180px; */
`
const SmallMediumBox = styled(Box)`
  flex: 0;
  min-width: 80px;
  text-align: left;
`
const MediumBox = styled(Box)`
  flex: 1;
  /* flex: 3; */
  min-width: 200px;
  /* max-width: 200px; */
`
const BigBox = styled(Box)`
  flex: 2;
  /* flex: 4; */
  /* width: 100%; */
  min-width: 300px;
  /* max-width: 400px; */
`
const LightTextBox = styled(TextBox)`
  text-align: center;
  opacity: 1;
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
const YellowStar = styled(StarIcon)`
  color: yellow;
`
const RedDeleteIcon = styled(DeleteIcon)`
  color: red;
`
const AssetItem = (props) => {
  const { asset, rownum } = props;
  const {
    assetId,
    assetTitle,
    displayMode,
    isScrollVideo,
    isNewsPreview,
    isScrollSmooth,
    scrollSpeed,
    assetTexts,
    checked,
    sources,
    created,
    updated,
    isFavorite,
    typeId
  } = asset;

  const {
    removeAssetState,
    toggleCheckedState,
    toggleIsFavoriteState
  } = useAssetListState();

  const {
    // setIdState,
    // setAssetTitleState,
    // setDisplayModeState,
    setDialogOpenState,
    setIsEditModeState,
    setAssetDetailState,
  } = useDialogState();

  const {
    setSourcesState,
    updateProgressState,
  } = useDialogSourcesState();

  const { 
    assetsActive, 
    addAssetActiveState, 
    removeAssetActiveState 
  } = useHeaderState();
  
  const isAssetActive = assetsActive.some(asset => asset.assetId === assetId)

  const CheckIcon = isAssetActive ? CheckBoxIcon : CheckBoxOutlineBlankIcon;
  const FavoriteIcon = isFavorite ? YellowStar : StarBorderIcon;

  const updateCheckState = React.useCallback(() => {
    toggleCheckedState(assetId);
  },[assetId, toggleCheckedState])

  const onClickFavorite = React.useCallback(() => {
    toggleIsFavoriteState(assetId, !isFavorite)
  }, [assetId, isFavorite, toggleIsFavoriteState])

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
  },[assetTexts, isAssetActive, setAssetDetailState, assetId, assetTitle, displayMode, isScrollVideo, isScrollSmooth, scrollSpeed, sources, setSourcesState, setIsEditModeState, setDialogOpenState, updateProgressState]);

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

  const firstSource = sources.length === 0 ? 'none' : basename(sources[0].srcLocal);
  const displayModeMap = {
    'flexRow': 'Row',
    'flexColumn': 'Column',
    'swipe': 'Swipe'
  };
  const displayModeText = displayModeMap[displayMode] || '-';

  return (
    <Container>
      <TextContainer>
        <CheckBox checked={checked} setChecked={updateCheckState}/>
        <IconBox>
          <CustomIconButton onClick={onClickFavorite}>
            <FavoriteIcon fontSize="small" />
          </CustomIconButton>
        </IconBox>
        <TinyBox>
          <LightTextBox text={rownum} />
        </TinyBox>
        <SmallBox>
          <LightTextBox text={displayModeText} />
        </SmallBox>
        <MediumBox>
          <LightTextBox color={isAssetActive && 'yellow'} textAlign="left" text={assetTitle} />
        </MediumBox>
        <SmallMediumBox>
          <TypeSelect assetId={assetId} typeId={typeId}></TypeSelect>
        </SmallMediumBox>
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
        <BigBox>
          <LightTextBox textAlign="left" maxWidth="300px" text={firstSource} />
        </BigBox>
        <TinyBox>
          <LightTextBox text={sources.length} />
        </TinyBox>
        <MediumBox>
          <LightTextBox text={created} />
        </MediumBox>
        <MediumBox>
          <LightTextBox text={updated} />
        </MediumBox>
      </TextContainer>
    </Container>
  )
};

export default React.memo(AssetItem);
