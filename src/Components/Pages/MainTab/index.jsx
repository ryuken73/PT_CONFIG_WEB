import React from 'react';
import styled from 'styled-components';
import DnD from 'Components/Common/DnD';
import TabButtons from 'Components/Pages/MainTab/TabButtons';
import AssetItem from 'Components/Pages/MainTab/AssetItem';
import AssetItemHeader from 'Components/Pages/MainTab/AssetItemHeader';
import ScrollbarSmooth from 'Components/Common/ScrollBarSmooth';
import useAssetListState from 'hooks/useAssetListState';
import useDialogState from 'hooks/useDialogState';
import useDialogSourcesState from 'hooks/useDialogSourcesState';

// const { JOB_STATUS, TASK_STATUS, TASK_DEFAULT, Q_WORKER_EVENTS } = bullConstants;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const date = (new Date()).toLocaleString();
const getAssets = () => {
  return  Promise.resolve([{
    id:111,
    title: '돌풍정보',
    type: 'image',
    sources: [
      'http://localhost/20220925/a.jpg'
    ],
    created: date,
    updated: date

  }])
}

const MainTab = (props) => {
  const { setFilesToUpload } = props;
  const { assetListCurrentType, loadAssetListState } = useAssetListState();
  const { setDialogOpenState } = useDialogState();
  const { setDialogAssetState } = useDialogSourcesState();

  React.useEffect(() => {
    loadAssetListState();
  },[loadAssetListState])

  console.log('####', assetListCurrentType)

  const handleDrop = React.useCallback(
    (drops) => {
      setFilesToUpload(files => [...files, ...drops]);
      setDialogAssetState(drops)
      setDialogOpenState(true)
    },
    [setFilesToUpload, setDialogAssetState, setDialogOpenState]
  );

  const showInfoText = assetListCurrentType.length == 0;

  return (
    <Container>
      <TabButtons />
      <AssetItemHeader />
      <DnD onDrop={handleDrop} showPlaceholder={showInfoText}>
        <ScrollbarSmooth direction='x' show={true}>
          {assetListCurrentType.map((asset, index) => (
            <AssetItem
              asset={asset}
              key={asset.assetId}
              checked={asset.checked}
              rownum={index+1}
            />
          ))}
        </ScrollbarSmooth>
      </DnD>
    </Container>
  );
};

export default React.memo(MainTab);
