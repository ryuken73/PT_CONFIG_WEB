import React from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import AssetTitleBox from './AssetTitleBox';
import AssetItemIcons from './AssetItemIcons';
import CheckBox from 'Components/Common/CheckBox';
import TextBox from 'Components/Common/TextBox';
import TypeSelect from 'Components/Pages/MainTab/TypeSelect';
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import colors from 'config/colors';
import useAssetListState from 'hooks/useAssetListState';

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
const IconBox = styled(Box)`
  min-width: 40px;
`
const TinyBox = styled(Box)`
  flex: 0;
  min-width: 60px;
`
const SmallBox = styled(Box)`
  flex: 0;
  min-width: 120px;
`
const SmallMediumBox = styled(Box)`
  flex: 0;
  min-width: 80px;
  text-align: left;
`
const MediumBox = styled(Box)`
  flex: 1;
  min-width: 200px;
`
const BigBox = styled(Box)`
  flex: 2;
  min-width: 300px;
`
const LightTextBox = styled(TextBox)`
  text-align: center;
  opacity: 1;
  cursor: ${props => props.clickable && 'pointer'};
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
const AssetItem = (props) => {
  console.log('3333', props)
  const { item: asset, rownum } = props;
  const {
    assetId,
    assetTitle,
    displayMode,
    checked,
    sources,
    created,
    updated,
    isFavorite,
    typeId
  } = asset;

  const {
    toggleCheckedState,
    toggleIsFavoriteState
  } = useAssetListState();

  const FavoriteIcon = isFavorite ? YellowStar : StarBorderIcon;

  const updateCheckState = React.useCallback(() => {
    toggleCheckedState(assetId);
  },[assetId, toggleCheckedState])

  const onClickFavorite = React.useCallback(() => {
    toggleIsFavoriteState(assetId, !isFavorite)
  }, [assetId, isFavorite, toggleIsFavoriteState])

  const firstSource = sources.length === 0 ? 'none' : basename(sources[0].srcLocal);
  const displayModeMap = {
    'flexRow': 'Row',
    'flexColumn': 'Column',
    'swipe': 'Swipe'
  };
  const displayModeText = displayModeMap[displayMode] || '-';

  const openBrowser = React.useCallback(() => {
    const url = sources[0].srcRemote;
    window.open(url, '_blank'); 
  }, [sources])

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
        <AssetTitleBox
          assetId={assetId}
          assetTitle={assetTitle}
        ></AssetTitleBox>
        <SmallMediumBox>
          <TypeSelect assetId={assetId} typeId={typeId}></TypeSelect>
        </SmallMediumBox>
        <AssetItemIcons
          asset={asset}
        ></AssetItemIcons>
        <BigBox>
          <LightTextBox clickable onClick={openBrowser} textAlign="left" maxWidth="300px" text={firstSource} />
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
