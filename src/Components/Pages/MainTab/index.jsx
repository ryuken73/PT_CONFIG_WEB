import React from 'react';
import styled from 'styled-components';
import DnD from 'Components/Common/DnD';
import TabButtons from 'Components/Pages/MainTab/TabButtons';
import AssetItem from 'Components/Pages/MainTab/AssetItem';
import JobItemHeader from 'Components/Pages/MainTab/JobItemHeader';
import ScrollbarSmooth from 'Components/Common/ScrollBarSmooth';
import useAssetListState from 'hooks/useAssetListState';
import useDialogState from 'hooks/useDialogState';

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
  const { assetList, setAssetsState } = useAssetListState();
  const { setDialogOpenState, setDialogAssetState } = useDialogState();

  React.useEffect(() => {
    getAssets()
    .then(assets => {
      setAssetsState(assets);
    })
  },[setAssetsState])

  console.log('####', assetList)

  const handleDrop = React.useCallback(
    (drops) => {
      // if(drops.length > 1){
      //   alert('only one file can be dropped!')
      //   return;
      // }
      // const dropped = drops[0];
      setFilesToUpload(files => [...files, ...drops]);
      setDialogAssetState(drops)
      setDialogOpenState(true)
    },
    [setFilesToUpload, setDialogAssetState, setDialogOpenState]
  );

  const showInfoText = assetList.length == 0;

  return (
    <Container>
      <TabButtons />
      <JobItemHeader />
      <DnD onDrop={handleDrop} showPlaceholder={showInfoText}>
        <ScrollbarSmooth>
          {assetList.map((asset, index) => (
            <AssetItem
              asset={asset}
              key={asset.id}
              rownum={index+1}
            />
          ))}
        </ScrollbarSmooth>
      </DnD>
    </Container>
  );
};

export default React.memo(MainTab);
