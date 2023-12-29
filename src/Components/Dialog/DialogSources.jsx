import React from 'react';
import DialogSource from './DialogSource';
import {sortableContainer, sortableElement, sortableHandle} from 'react-sortable-hoc';
import styled from 'styled-components';
import { arrayMoveImmutable } from 'array-move';
import ButtonSmall from 'Components/Common/ButtonSmall';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import useDialogSourcesState from 'hooks/useDialogSourcesState';

const Container = styled.div`
  padding: ${props => props.showPadding && '5px'};
`
const StyledUl = styled.ul`
  margin: 0;
  padding: 0;
`
const ItemContainer = styled.div`
  display: flex;
  align-items: center;
`
const StyledButtonSmall = styled(ButtonSmall)`
  cursor: drag;
  padding: 1px 10px !important;
  span {
    margin-left: 0px;
    margin-right: 0px;
    svg.MuiSvgIcon-root {
      font-size: 15px;
      color: grey;
      font-weight: bold;
    }
  }
`;
const isHttpUrl = src => src.startsWith('http');

const DragHandle = sortableHandle(() => <StyledButtonSmall startIcon={<DragIndicatorIcon />} minWidth="20px" /> );

const SortableItem = sortableElement(({source, isNewsPreview}) => (
  <ItemContainer>
    <DragHandle></DragHandle>
    <DialogSource
      id={source.srcId}
      key={source.srcId}
      srcText={source.src}
      srcType={source.srcType}
      srcTitle={source.srcTitle}
      size={source.size}
      progress={source.progress}
      playUrl={source.srcRemote||'http://non'}
      isHttpUrl={isHttpUrl(source.src)}
      isNewsPreview={isNewsPreview}
    ></DialogSource>
  </ItemContainer>
));

const SortableContainer = sortableContainer(({children}) => {
  return <StyledUl>
    {children}
    </StyledUl>;
});

const DialogSources = (props) => {
  const { sources, isNewsPreview } = props;
  const { setSourcesState } = useDialogSourcesState();
  const showPadding = sources.length > 0;
  const onSortEnd = React.useCallback(({oldIndex, newIndex}) => {
    const sourcesSorted = arrayMoveImmutable(sources, oldIndex, newIndex);
    setSourcesState(sourcesSorted);
  }, [setSourcesState, sources])
  return (
    <Container showPadding={showPadding}>
      <SortableContainer onSortEnd={onSortEnd} useDragHandle>
      {/* <SortableContainer> */}
        {sources.map((source, index) => (
          <SortableItem key={`item-${source.srcId}`} index={index} source={source} isNewsPreview={isNewsPreview} />
        ))}
      </SortableContainer>
        {/* {sources.map(source => (
            <DialogSource
              id={source.srcId}
              key={source.srcId}
              srcText={source.src}
              srcType={source.srcType}
              srcTitle={source.srcTitle}
              size={source.size}
              progress={source.progress}
              playUrl={source.srcRemote||'http://non'}
              isHttpUrl={isHttpUrl(source.src)}
              isNewsPreview={isNewsPreview}
            ></DialogSource>
            )
        )} */}
        
    </Container>
  )
}

export default React.memo(DialogSources)
