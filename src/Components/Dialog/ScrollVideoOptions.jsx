import React from 'react';
import styled from 'styled-components';
import ScrollOptionSmooth from 'Components/Dialog/ScrollOptionSmooth';
import ScrollOptionSlow from 'Components/Dialog/ScrollOptionSlow';

const Container = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
`

function ScrollVideoOptions(props) {
  const {
    isScrollSmooth,
    scrollSpeed,
    setIsScrollSmooth,
    setScrollSpeed
  } = props
  return (
    <Container>
        <ScrollOptionSmooth
          isScrollSmooth={isScrollSmooth}
          setIsScrollSmooth={setIsScrollSmooth}
        ></ScrollOptionSmooth>
        <ScrollOptionSlow
          scrollSpeed={scrollSpeed} 
          setScrollSpeed={setScrollSpeed}
        ></ScrollOptionSlow>
    </Container>
  )
}

export default React.memo(ScrollVideoOptions)