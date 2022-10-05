import React from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ButtonIcon from 'Components/Common/ButtonIcon';
import useAssetListState from 'hooks/useAssetListState';
import useDialogState from 'hooks/useDialogState';
import useHeaderState from 'hooks/useHeaderState';

const Container = styled.div`
  display: flex;
`
const ButtonContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  height: ${(prop) => prop.height || 'auto'};
  width: ${(prop) => prop.height || 'auto'};
  .MuiSvgIcon-root {
    color: ${(props) => props.color || 'white'};
    opacity: ${(props) => props.opacitynormal || '0.7'};
  }
`;

const TabButtons = () => {
  const { 
    assetListChecked, 
    removeAssetAllCheckedState, 
    resetToDefaultState 
  } = useAssetListState();
  const { setDialogOpenState } = useDialogState();
  const { 
    assetsActive,
    setAssetsActiveState,
    addAssetActiveState,
    loadAssetsActiveState,
  } = useHeaderState();

  const setDialogOpen = React.useCallback(() => {
    setDialogOpenState(true);
  },[setDialogOpenState])

  const addAssetsActive = React.useCallback(() => {
    const assetsFiltered = assetListChecked.filter(asset => {
      if(assetsActive.some(activeAsset => activeAsset.assetId === asset.assetId )){
        alert('Alreay Exists!');
        return false;
      }
      return true
    })
    setAssetsActiveState([...assetsActive, ...assetsFiltered]);
    
    // const addPromises = assetListChecked.map(asset => {
    //   if(assetsActive.some(activeAsset => activeAsset.assetId === asset.assetId )){
    //     alert('Alreay Exists!');
    //     return Promise.resolve({succes: true});
    //   }
    //   return addAssetActiveState(asset);
    // })
    // Promise.all(addPromises)
    // .then(results => {
    //   loadAssetsActiveState();
    // })
    // .catch(err => {
    //   console.error(err);
    // })
  }, [assetListChecked, assetsActive, setAssetsActiveState])

  // console.log('re-render TabButtons');
  return (
    <ButtonContainer>
      <ButtonIcon
        text="추가"
        iconcomponent={<AddIcon />}
        border="2px solid rgba(255, 255, 255, .5)"
        hoverBorder="2px solid rgba(255, 255, 255, 0.8)"
        onClick={setDialogOpen}
      />
      <ButtonIcon
        text="삭제"
        iconcomponent={<DeleteIcon />}
        border="2px solid rgba(255, 255, 255, .5)"
        hoverBorder="2px solid rgba(255, 255, 255, 0.8)"
        onClick={removeAssetAllCheckedState}
      />
      <ButtonIcon
        text="메뉴등록"
        iconcomponent={<ArrowUpwardIcon />}
        border="2px solid rgba(255, 255, 255, .5)"
        hoverBorder="2px solid rgba(255, 255, 255, 0.8)"
        onClick={addAssetsActive}
      />
      <Box sx={{marginLeft:'auto', marginRight: '10px'}}>
        <ButtonIcon
          text="초기화"
          iconcomponent={<RestartAltIcon />}
          border="2px solid rgba(255, 255, 255, .5)"
          hoverBackground="maroon"
          hoverBorder="2px solid rgba(155, 131, 131, 0.8)"
          onClick={resetToDefaultState}
        />
      </Box>
    </ButtonContainer>

  );
};

export default React.memo(TabButtons);
