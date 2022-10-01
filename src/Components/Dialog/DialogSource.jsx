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
    width: 100%;
`
const LightTextBox = styled(TextBox)`
    text-align: right;
    opacity: 1;
    margin-left: 5px;
    margin-right: 5px;
    padding: 5px;
    min-width: ${props => props.minWidth ? props.minWidth : '20px'};
`
const StyledButtonSmall = styled(ButtonSmall)`
  padding: 1px 20px !important;
  span {
    margin-left: 0px;
    margin-right: 0px;
    svg.MuiSvgIcon-root {
      font-size: 15px;
    }
  }
`;

const DialogSource = (props) => {
    const { id, srcText, size, progress, isHttpUrl } = props
    const { removeSourceState } = useDialogSourcesState();
    const onClickDelete = React.useCallback(() => {
        removeSourceState(id);
    },[id, removeSourceState])
    const prorgressToPrint = isHttpUrl ? '-' : progress;
    const sizeToPrint = isHttpUrl ? '-' : prettyBytes(size);
    return (
        <Container>
          <StyledButtonSmall onClick={onClickDelete} startIcon={<CloseIcon />} minWidth="20px" />
          <LightTextBox text={prorgressToPrint}></LightTextBox>
          <LightTextBox text={sizeToPrint} minWidth="60px"></LightTextBox>
          <LightTextBox text={srcText}></LightTextBox>
        </Container>
    )
}

export default React.memo(DialogSource);
