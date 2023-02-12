import React from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import ButtonSmall from 'Components/Common/ButtonSmall';
import CloseIcon from '@mui/icons-material/Close';
import useTypeListState from 'hooks/useTypeListState';

const Container = styled.div`
  display: flex;
  cursor: pointer;
  color: ${props => props.isCurrent && 'yellow'};
  :active {
    transform: translateY(2px);
  }
`
const StyledButtonSmall = styled(ButtonSmall)`
  padding: 5px 5px 5px 5px !important;
  span {
    margin-left: 0px;
    margin-right: 0px;
    svg.MuiSvgIcon-root {
      font-size: 15px;
    }
  }
`;

function Type(props) {
  const { typeName, typeId, irremovable=false, currentTypeId } = props;
  const { removeTypeState, setCurrentTypeIdState } = useTypeListState();

  const onClickType = React.useCallback(() => {
    setCurrentTypeIdState(typeId);
  }, [setCurrentTypeIdState, typeId])

  const onClickClose = React.useCallback(() => {
    removeTypeState(typeId)
  }, [removeTypeState, typeId])

  const isCurrent = typeId === currentTypeId;

  return (
    <Container isCurrent={isCurrent} onClick={onClickType}>
      <Box>
        {typeName}
      </Box>
      {!irremovable && (
        <Box sx={{marginLeft: "5px"}}>
          <StyledButtonSmall 
            onClick={onClickClose} 
            startIcon={<CloseIcon />} 
            minWidth="20px" 
          />
        </Box>
      )}
    </Container>
  )
}

export default React.memo(Type);