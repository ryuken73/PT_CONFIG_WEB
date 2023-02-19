import React from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import ButtonSmall from 'Components/Common/ButtonSmall';
import CloseIcon from '@mui/icons-material/Close';
import useTypeListState from 'hooks/useTypeListState';
import useAssetListState from 'hooks/useAssetListState';

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

const TYPE_ID_FAVORITE = 0;
const TYPE_ID_ALL = 1;

const getCountFavorite = (assetList) => {
  return assetList.filter(asset => asset.isFavorite).length;
}

function Type(props) {
  const { typeName, typeId, irremovable=false, currentTypeId } = props;
  const { removeTypeState, setCurrentTypeIdState } = useTypeListState();
  const { assetListInState } = useAssetListState();

  // const assetsOfType = assetList.filter(asset => asset.typeId === typeId) || [];
  const countOfAsset = typeId === TYPE_ID_FAVORITE ?  getCountFavorite(assetListInState) : 
                       typeId === TYPE_ID_ALL ?  assetListInState.length : 
                       assetListInState.filter(asset => asset.typeId === typeId).length 


  const onClickType = React.useCallback(() => {
    setCurrentTypeIdState(typeId);
  }, [setCurrentTypeIdState, typeId])

  const onClickClose = React.useCallback((event) => {
    event.stopPropagation();
    removeTypeState(typeId)
  }, [removeTypeState, typeId])

  const isCurrent = typeId === currentTypeId;

  return (
    <Container isCurrent={isCurrent} onClick={onClickType}>
      <Box>
        {typeName}[{countOfAsset}]
      </Box>
      {!irremovable && countOfAsset === 0 && (
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