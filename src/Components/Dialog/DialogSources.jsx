import React from 'react';
import DialogSource from './DialogSource';
import styled from 'styled-components';

const Container = styled.div`
  padding: ${props => props.showPadding && '5px'};
`
const isHttpUrl = src => src.startsWith('http');

const DialogSources = (props) => {
  const { sources, displayMode } = props;
  const showPadding = sources.length > 0;
  return (
    <Container showPadding={showPadding}>
        {sources.map(source => (
            <DialogSource
              displayMode={displayMode}
              id={source.srcId}
              key={source.srcId}
              srcText={source.src}
              srcType={source.srcType}
              srcTitle={source.srcTitle}
              size={source.size}
              progress={source.progress}
              isHttpUrl={isHttpUrl(source.src)}
            ></DialogSource>
            )
        )}
        
    </Container>
  )
}

export default React.memo(DialogSources)
