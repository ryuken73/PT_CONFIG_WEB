import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 300px;
`
const CustomImage = styled.img`
  width: 100%;
  object-fit: cover;
  aspect-ratio: 16/9;
`

function BlobImage(props) {
  const {blob, label} = props;
  const imgUrl = URL.createObjectURL(blob);
  return (
    <Container>
      <CustomImage 
        src={imgUrl}
      ></CustomImage>
    </Container>
  )
}

export default React.memo(BlobImage);
