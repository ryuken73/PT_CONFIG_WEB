import React from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ButtonIcon from 'Components/Common/ButtonIcon';
import useAssetListState from 'hooks/useAssetListState';

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
    safeRemoveJobAllCheckedState,
  } = useAssetListState();
  // console.log('re-render TabButtons');
  return (
    <ButtonContainer>
      <ButtonIcon
        text="추가"
        iconComponent={<AddIcon />}
        border="2px solid rgba(255, 255, 255, .5)"
        hoverBorder="2px solid rgba(255, 255, 255, 0.8)"
        onClick={safeRemoveJobAllCheckedState}
      />
      <ButtonIcon
        text="삭제"
        iconComponent={<DeleteIcon />}
        border="2px solid rgba(255, 255, 255, .5)"
        hoverBorder="2px solid rgba(255, 255, 255, 0.8)"
        onClick={safeRemoveJobAllCheckedState}
      />
      <ButtonIcon
        text="메뉴등록"
        iconComponent={<ArrowUpwardIcon />}
        border="2px solid rgba(255, 255, 255, .5)"
        hoverBorder="2px solid rgba(255, 255, 255, 0.8)"
        onClick={safeRemoveJobAllCheckedState}
      />
    </ButtonContainer>

  );
};

export default React.memo(TabButtons);
