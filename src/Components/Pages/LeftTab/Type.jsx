import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
`

function Type(props) {
  const { typeName, typeId } = props;
  return (
    <Container>
        {typeName}
    </Container>
  )
}

export default React.memo(Type);