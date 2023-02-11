import React from 'react'
import styled from 'styled-components';
import Type from 'Components/Pages/LeftTab/Type';
import useTypeListState from 'hooks/useTypeListState';

const Container = styled.div``

function LeftTab() {
  const {typeList, setTypeState} = useTypeListState();
  React.useEffect(() => {
    setTypeState();
  }, [setTypeState])

  console.log('###',typeList)
  return (
    <Container>
      {typeList.map((type, index) => (
        <Type 
          key={type.typeId}
          typeName={type.type}
          typeId={type.typeId}
        >
        </Type>
      ))}

    </Container>
  )
}

export default React.memo(LeftTab);
