import React from 'react';
import DialogSource from './DialogSource';

const isHttpUrl = src => src.startsWith('http');

const DialogSources = (props) => {
  const { sources } = props;
  return (
    <div>
        {sources.map(source => (
            <DialogSource
                id={source.srcId}
                key={source.srcId}
                srcText={source.src}
                srcType={source.srcType}
                size={source.size}
                progress={source.progress}
                isHttpUrl={isHttpUrl(source.src)}
            ></DialogSource>
            )
        )}
        
    </div>
  )
}

export default React.memo(DialogSources)
