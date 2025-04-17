import React from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import TextBox from 'Components/Common/TextBox';
import useHeaderAssetState from 'hooks/useHeaderAssetState';

const MediumBox = styled(Box)`
  flex: 1;
  min-width: 200px;
`
const LightTextBox = styled(TextBox)`
  text-align: center;
  opacity: 1;
`
const AssetTitleBox = (props) => {
  const { assetId, assetTitle } = props;

  const { 
    assetsActive, 
  } = useHeaderAssetState();
  
  const isAssetActive = assetsActive.some(asset => asset.assetId === assetId)

  return (
    <MediumBox>
      <LightTextBox color={isAssetActive && 'yellow'} textAlign="left" text={assetTitle} />
    </MediumBox>
  )
};

export default React.memo(AssetTitleBox);
