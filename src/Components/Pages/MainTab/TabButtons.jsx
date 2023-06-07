import React from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ButtonIcon from 'Components/Common/ButtonIcon';
import ConfirmDialog from 'Components/Dialog/ConfirmDialog';
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
  const [ confirmOpen, setConfirmOpen ] = React.useState(false);
  const [ confirmTitle, setConfirmTitle ] = React.useState('Confirm?');
  const { 
    assetListChecked, 
    removeAssetState,
    removeAssetAllCheckedState, 
    resetToDefaultState 
  } = useAssetListState();
  const { setDialogOpenState } = useDialogState();
  const { 
    assetsActive,
    setAssetsActiveState,
    addAssetActiveState,
    loadAssetsActiveState,
    addAssetsActiveState
  } = useHeaderState();

  const setDialogOpen = React.useCallback(() => {
    setDialogOpenState(true);
  },[setDialogOpenState])

  const addAssetsActive = React.useCallback(() => {
    console.log('xxxx:', assetListChecked);
    addAssetsActiveState(assetListChecked)
  }, [addAssetsActiveState, assetListChecked])

  const delAssetsChecked = React.useCallback(() => {
    console.log('xxxx:', assetListChecked);
    assetListChecked.forEach(async assetChecked => {
      await removeAssetState(assetChecked.assetId)
    })
  }, [assetListChecked, removeAssetState])

  const onClickSetDefault = React.useCallback(() => {
    setConfirmTitle('*[Warning]* Clear All Items?')
    setConfirmOpen(true);
  }, [])

  const handleNo = React.useCallback(() => {
    setConfirmOpen(false);
    setConfirmTitle('Confirm?');
  }, [])

  const resetDefault = React.useCallback(() => {
    resetToDefaultState();
    setConfirmOpen(false);
    setConfirmTitle('Confirm?');
  }, [resetToDefaultState])

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
        onClick={delAssetsChecked}
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
          onClick={onClickSetDefault}
        />
      </Box>
      <ConfirmDialog 
        open={confirmOpen} 
        handleYes={resetDefault} 
        handleNo={handleNo} 
        title={confirmTitle}>
      </ConfirmDialog>
    </ButtonContainer>

  );
};

export default React.memo(TabButtons);
