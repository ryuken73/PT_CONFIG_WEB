import React from 'react';
import Chip from '@mui/material/Chip';

function AssetText(props) {
  const {textId, assetText, removeAssetText} = props;
  const onDelete = React.useCallback(() => {
    removeAssetText(textId)
  }, [removeAssetText, textId])
  return (
    <Chip
      sx={{marginRight: "10px", marginTop: "10px"}}
      label={assetText}
      onDelete={onDelete}
    />
  )
}

export default React.memo(AssetText);
