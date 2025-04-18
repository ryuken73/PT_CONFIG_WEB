import React from 'react';
import styled from 'styled-components';
import Scrollbar from 'react-smooth-scrollbar';

const StyledScrollbar = styled(Scrollbar)`
  display: fixed;
  bottom: 1px;
  height: 100%;
  width: ${(props) => props.width};
  .scroll-content {
    margin-right: 5px;
    height: 100%;
    div {
      height: ${(props) => props.vScroll && '100%'};
    }
  };
  .scrollbar-track-y {
    .scrollbar-thumb-y {
      border-radius: 0px;
    }
  }
  .scrollbar-track-x {
    .scrollbar-thumb-x {
      border-radius: 0px;
    }
  }
`;

const ScrollBarSmooth = (props, ref) => {
  const { height = '100%', width = '100%', direction='y', show=false } = props;
  const { getMoreItem = () => {}, refreshRefByTime = () => {} } = props;
  const scrollbar = React.useRef(null);
  const [parentRef, setParentRef] = React.useState(ref);
  console.log(height)
  React.useEffect(() => {
    // console.log('^^^ in scroll effect!')
    if (scrollbar === null) return;
    if (parentRef) {
      console.log('^^^^', parentRef, scrollbar);
      if (parentRef.current !== scrollbar.current.scrollbar.contentEl) {
        console.log(' set ^^^^', parentRef, scrollbar);
        setParentRef((ref) => {
          ref.current = scrollbar.current.scrollbar.contentEl;
          refreshRefByTime(Date.now());
        });
      }
    }
  }, [parentRef, refreshRefByTime]);
  const handleScroll = React.useCallback((scroll) => {
    // console.log(scroll.offset.y, scroll.limit.y)
    const haveReachedBottom = scroll.offset.y === scroll.limit.y;
    if (haveReachedBottom) {
      console.log('bottom')
      getMoreItem();
    }
  }, []);
  const vScroll = direction === 'y';
  // alert(`vScroll=${vScroll}&show=${show}`)
  return (
    <StyledScrollbar
      height={height}
      width={width}
      alwaysShowTracks={show}
      onScroll={handleScroll}
      ref={scrollbar}
      direction={direction}
      vScroll={direction === 'y'}
    >
      {props.children}
    </StyledScrollbar>
  );
};

export default React.memo(React.forwardRef(ScrollBarSmooth));
