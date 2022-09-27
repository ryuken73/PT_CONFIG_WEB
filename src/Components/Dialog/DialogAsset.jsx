import React from 'react';
import styled from 'styled-components';
import TextBox from 'Components/Common/TextBox';
import ButtonSmall from 'Components/Common/ButtonSmall';
import prettyBytes from 'pretty-bytes';
import CloseIcon from '@mui/icons-material/Close';
import useDialogSourcesState from 'hooks/useDialogSourcesState';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 50%;
`
const LightTextBox = styled(TextBox)`
    text-align: right;
    opacity: 1;
    margin-left: 5px;
    margin-right: 5px;
    padding: 5px;
    min-width: 50px;
`
const StyledButtonSmall = styled(ButtonSmall)`
  padding: 1px 2px !important;
  span {
    margin-left: 0px;
    margin-right: 0px;
    svg.MuiSvgIcon-root {
      font-size: 15px;
    }
  }
`;

const AssetItem = (props) => {
    const { id, name, size, progress } = props
    const { removeSourceState } = useDialogSourcesState();
    const onClickDelete = React.useCallback(() => {
        removeSourceState(id);
    },[id, removeSourceState])
    return (
        <Container>
            <LightTextBox text={`${progress}`}></LightTextBox>
            <LightTextBox text={prettyBytes(size)}></LightTextBox>
            <LightTextBox text={name}></LightTextBox>
            <StyledButtonSmall onClick={onClickDelete} startIcon={<CloseIcon />} minWidth="20px" />
        </Container>
    )
}

export default React.memo(AssetItem);
