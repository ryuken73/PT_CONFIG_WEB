import React from 'react';
import styled from 'styled-components';
import { Box } from '@mui/system';
import ButtonSmall from 'Components/Common/ButtonSmall';
import CloseIcon from '@mui/icons-material/Close';
import useHeaderState from 'hooks/useHeaderState';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
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

const MenuItem = (props) => {
  const {id, title} = props;
  const { removeAssetActiveState } = useHeaderState();
  const onClickClose = React.useCallback(() => {
    removeAssetActiveState(id)
  }, [id, removeAssetActiveState])
  return (
    <Container>
      <Box>
        {title}
      </Box>
      <Box sx={{marginLeft: "5px"}}>
        <StyledButtonSmall 
          onClick={onClickClose} 
          startIcon={<CloseIcon />} 
          minWidth="20px" 
        />
      </Box>
    </Container>
  )
}

export default React.memo(MenuItem)
