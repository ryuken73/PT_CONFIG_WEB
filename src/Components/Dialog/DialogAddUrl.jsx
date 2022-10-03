import React from 'react';
import styled from 'styled-components';
import CustomInput from 'Components/Common/CustomInput';
import ButtonSmall from 'Components/Common/ButtonSmall';
import AddIcon from '@mui/icons-material/Add';
import useDialogSourcesState from 'hooks/useDialogSourcesState';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
`

const StyledButtonSmall = styled(ButtonSmall)`
  padding: 0px 5px !important;
  margin-top: 3px !important;
  border-radius: 5px !important;
  span {
    margin-left: -1px;
    margin-right: -1px;
    svg.MuiSvgIcon-root {
      font-size: 20px;
    }
  }
`
const DialogAddUrl = (props) => {
    const {value, setCurrentUrl, onChange, onKeyUp} = props;
    const {addSourceState} = useDialogSourcesState();
    const onClickAddUrl = React.useCallback(() => {
        if(value.length < 8){
            alert('url too small. enter valid url.');
            return;
        }
        const srcId = Date.now();
        addSourceState({src: value, size: null, srcType:'web', srcId});
        setCurrentUrl('http://');
    },[addSourceState, setCurrentUrl, value]);
    return (
        <Container>
            <StyledButtonSmall 
                onClick={onClickAddUrl} 
                startIcon={<AddIcon />} 
                minWidth="20px" 
                background="transparent"
            />
            <CustomInput
                value={value}
                onChange={onChange}
                onKeyUp={onKeyUp}
                fontSize={'16px'}
                color="black"
            ></CustomInput>
        </Container>
    )
}

export default React.memo(DialogAddUrl);
