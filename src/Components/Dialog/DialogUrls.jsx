import React from 'react';
import styled from 'styled-components';
import CustomInput from 'Components/Common/CustomInput';
import ButtonSmall from 'Components/Common/ButtonSmall';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import useDialogWebSourcesState from 'hooks/useDialogWebSourcesState';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
`

const StyledButtonSmall = styled(ButtonSmall)`
  padding: 0px 20px !important;
  span {
    margin-left: -1px;
    margin-right: -1px;
    svg.MuiSvgIcon-root {
      font-size: 14px;
    }
  }
`
const WebAsset = (props) => {
    const {value, setCurrentUrl, onChange, id} = props;
    const {addWebSourceState, removeWebSourceState} = useDialogWebSourcesState();
    const onClickAddUrl = React.useCallback(() => {
        if(value.length < 8){
            alert('url too small. enter valid url.');
            return;
        }
        addWebSourceState(value);
        setCurrentUrl('http://');
    },[addWebSourceState, setCurrentUrl, value]);
    const onClickRemoveUrl = React.useCallback(() => {
        removeWebSourceState(id);
    },[id, removeWebSourceState])
    return (
        <Container>
            {id ? (
                <StyledButtonSmall 
                    onClick={onClickRemoveUrl} 
                    startIcon={<CloseIcon />} 
                    minWidth="20px" 
                />
            ):(
                <StyledButtonSmall 
                    onClick={onClickAddUrl} 
                    startIcon={<AddIcon />} 
                    minWidth="20px" 
                />
            )}
            <CustomInput
                value={value}
                onChange={onChange}
            ></CustomInput>
        </Container>
    )
}

export default React.memo(WebAsset);
