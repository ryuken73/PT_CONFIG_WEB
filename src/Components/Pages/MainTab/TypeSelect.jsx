import React from 'react';
import styled from 'styled-components';
import useTypeListState from 'hooks/useTypeListState';

const Container = styled.div`
  position: relative;
  font-size: 12px;
  :hover {
    div {
      visibility: visible;
      transition: all 0.3s ease;
    }
  }
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
  visibility: hidden;
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
  :hover {
    visibility: visible;
    transition: all 0.3s ease;
  }
`;
const Type = styled.div`
  cursor: pointer;
  :hover {
    padding-left: 5px;
    /* border-left: 2px solid #3ca0e7; */
    transition: all 0.3s ease;
    color: yellow;
    visibility: visible !important;
  }
`;

function TypeSelect() {
  const {typeList, currentTypeId} = useTypeListState();
  const currentType = typeList.find(type => type.typeId === currentTypeId);
  const typesListable = typeList.filter(type => !type.notShowInList);

  return (
    <Container
    >
      <CurrentType>
        {currentType.name || '미분류'}
      </CurrentType>
      <TypeSelectList>
        {typesListable.map((type) => (
          <Type
            key={type.typeId}
            onClick={() => {alert(type.type)}}
          >
            {type.type}
          </Type>
        ))}
      </TypeSelectList>
    </Container>
  )
}

export default React.memo(TypeSelect);