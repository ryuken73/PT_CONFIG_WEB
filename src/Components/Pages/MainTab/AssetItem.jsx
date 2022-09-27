import React from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import CheckBox from 'Components/Common/CheckBox';
import TextBox from 'Components/Common/TextBox';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import colors from 'config/colors';
import useAssetListState from 'hooks/useAssetListState';
import useDialogState from 'hooks/useDialogState';
import useSourcesState from 'hooks/useSourcesState';

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
  margin-left: 20px;
`
const TinyBox = styled(Box)`
  /* flex: 1; */
  min-width: 60px;
  max-width: 100px;
`
const SmallBox = styled(Box)`
  /* flex: 2; */
  min-width: 180px;
  max-width: 180px;
`
const MediumBox = styled(Box)`
  /* flex: 3; */
  min-width: 200px;
  max-width: 200px;
`
const BigBox = styled(Box)`
  /* flex: 4; */
  width: 100%;
  min-width: 200px;
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

const AssetItem = (props) => {
  const { asset, rownum } = props;
  const {
    id,
    title,
    type,
    checked,
    sources,
    created,
    updated
  } = asset;

  const {
    removeAssetState,
    toggleCheckedState
  } = useAssetListState();

  const {
    setIdState,
    setTitleState,
    setTypeState,
    setDialogOpenState,
  } = useDialogState();

  const {
    setSourcesState,
    updateProgressState,
  } = useSourcesState();

  const updateJobCheckState = React.useCallback(() => {
    toggleCheckedState(id);
  },[id, toggleCheckedState])

  const onClickEdit = React.useCallback(() => {
    setIdState(id);
    setTitleState(title);
    setTypeState(type);
    const sourcesBasename = sources.map(source => {
      return {
        ...source,
        src:basename(source.src)
      }
    });
    setSourcesState(sourcesBasename);
    sources.forEach(source => {
      updateProgressState(source.id)('100%');
    })
    setDialogOpenState(true)
  },[id, setDialogOpenState, setIdState, setSourcesState, setTitleState, setTypeState, sources, title, type, updateProgressState]);

  const onClickRemove = React.useCallback(() => {
    removeAssetState(id)
  },[id, removeAssetState]);

  const firstSource = basename(sources[0].src);


  return (
    <Container>
      <TextContainer>
        <CheckBox checked={checked} setChecked={updateJobCheckState}/>
        <TinyBox>
          <LightTextBox text={rownum} />
        </TinyBox>
        <TinyBox>
          <LightTextBox text={type.toUpperCase()} />
        </TinyBox>
        <MediumBox>
          <LightTextBox textAlign="left" text={title} />
        </MediumBox>
        <BigBox>
          <LightTextBox textAlign="left" text={firstSource} />
        </BigBox>
        <TinyBox>
          <LightTextBox text={sources.length} />
        </TinyBox>
        <SmallBox>
          <LightTextBox text={created} />
        </SmallBox>
        <SmallBox>
          <LightTextBox text={updated} />
        </SmallBox>
      </TextContainer>
      <IconContainer>
        <TinyBox>
          <CustomIconButton onClick={onClickEdit}>
            <EditIcon fontSize="small" />
          </CustomIconButton>
        </TinyBox>
        <TinyBox>
          <CustomIconButton onClick={onClickRemove}>
            <DeleteIcon fontSize="small" />
          </CustomIconButton>
        </TinyBox>
      </IconContainer>
    </Container>
  )
};

export default React.memo(AssetItem);
