import React from 'react';
import styled from 'styled-components';
import TextBox from 'Components/Common/TextBox';
import ButtonSmall from 'Components/Common/ButtonSmall';
import prettyBytes from 'pretty-bytes';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
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
    max-width: 500px;
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
const StyledTextField = styled(TextField)`
  .MuiInput-root:after {
    border-bottom: black;
  }
  div input {
    border-radius: 5px;
    font-size: 0.8rem;
    color: yellow;
    padding: 2px;
    background: black;
  }
  div input:-webkit-autofill,
  div input:-webkit-autofill:hover, 
  div input:-internal-autofill-selected,
  div input:-webkit-autofill:focus {
    /* border: 0px solid green; */
    background: transparent !important;
    -webkit-text-fill-color: black;
    -webkit-box-shadow: -1 0 0px 1000px #000 inset;
    transition: background-color 4999s ease-in-out 0s;
  }
  div input:after {
    border-bottom: black;
  }
`

const DialogSource = (props) => {
    const { displayMode, id, srcText, srcType, srcTitle, size, progress, isHttpUrl } = props
    const { removeSourceState, toggleSrcTypeState, updateSourceState } = useDialogSourcesState();
    const onClickDelete = React.useCallback(() => {
      removeSourceState(id);
    },[id, removeSourceState])
    const toggleSrcType = React.useCallback(() => {
      toggleSrcTypeState(id);
    },[id, toggleSrcTypeState])
    const onBlur = React.useCallback((event) => {
      const srcTitle = event.target.value || '';
      updateSourceState({srcId:id, key:'srcTitle', value: srcTitle})
    }, [id, updateSourceState])
    const prorgressToPrint = isHttpUrl ? '-' : progress;
    const sizeToPrint = isHttpUrl ? '-' : prettyBytes(size);
    return (
        <Container>
          <StyledButtonSmall onClick={onClickDelete} startIcon={<CloseIcon />} minWidth="20px" />
          <ButtonSmall 
            hoverBackground="darkblue" 
            hoverBorder="1px solid white" 
            padding="2px" borderRadius="6px" 
            border="1px solid" 
            fontSize="5px"
            onClick={toggleSrcType}
          >{srcType}
          </ButtonSmall>
          <LightTextBox text={prorgressToPrint}></LightTextBox>
          <LightTextBox text={sizeToPrint} minWidth="60px"></LightTextBox>
          <LightTextBox text={srcText}></LightTextBox>
          {displayMode === 'newsPreview' && (
            <div style={{marginLeft: 'auto', marginRight: '10px'}}>
              <StyledTextField 
                onBlur={onBlur}
                placeholder="제목 입력" 
                size="small"
                defaultValue={srcTitle}
              ></StyledTextField>
            </div>
          )}
        </Container>
    )
}

export default React.memo(DialogSource);
