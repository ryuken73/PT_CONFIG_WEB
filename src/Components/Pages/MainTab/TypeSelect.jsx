import React from 'react';
import styled from 'styled-components';
import useTypeListState from 'hooks/useTypeListState';
import useAssetListState from 'hooks/useAssetListState';

const Container = styled.div`
  position: relative;
  font-size: 12px;
  /* :hover {
    div {
      visibility: visible;
      transition: all 0.3s ease;
    }
  } */
`;
const CurrentType = styled.div`
  cursor: pointer;
  :hover {
    color: yellow;
  }
`
const TypeSelectList = styled.div`
  position: absolute;
  left: 0;
  /* visibility: hidden; */
  visibility: ${props => props.hideList ? 'hidden':'visible'};
  width: 100%;
  min-width: 100px;
  text-align: left;
  background: black;
  padding: 5px;
  box-shadow: 5px 3px 5px 5px black;
  opacity: 1;
  z-index: 10;
  border: 1px solid white;
  border-radius: 5px;
  /* :hover {
    display: block;
    visibility: visible; */
    transition: all 0.3s ease;
  /* } */
`;
const Type = styled.div`
  cursor: pointer;
  visibility: ${props => props.hide ? 'hidden':'visible'};
  :hover {
    padding-left: 5px;
    /* border-left: 2px solid #3ca0e7; */
    transition: all 0.3s ease;
    color: yellow;
  }
`;

function TypeSelect(props) {
  const {assetId, typeId} = props;
  const [hideList, setHideList] = React.useState(true);
  const {setAssetTypeState} = useAssetListState();
  const {typeList} = useTypeListState();
  const currentType = typeList.find(type => type.typeId === typeId) || {};
  const typesListable = typeList.filter(type => !type.notShowInList);
  // console.log('$$$$', typeList, typeId, currentType)

  const showList = React.useCallback(() => {
    setHideList(false);
  }, [])

  const changeType = React.useCallback((typeId) => {
    return () => {
      setAssetTypeState(assetId, typeId);
      setHideList(true);
    }
  }, [assetId, setAssetTypeState])

  return (
    <Container>
      <CurrentType onClick={showList}>
        {currentType.type || '미분류'}
      </CurrentType>
      <TypeSelectList hideList={hideList}>
        {typesListable.map((type) => (
          <Type
            key={type.typeId}
            hide={hideList}
            onClick={changeType(type.typeId)}
          >
            {type.type}
          </Type>
        ))}
      </TypeSelectList>
    </Container>
  )
}

export default React.memo(TypeSelect);