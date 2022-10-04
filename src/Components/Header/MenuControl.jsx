import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import useHeaderState from 'hooks/useHeaderState';
import useSocketIO from 'hooks/useSocketIO';
import constants from 'config/constants';

const { TOUCH_WEB_SERVER_URL } = constants;

// fake data generator
const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 ${grid}px 0 0`,

  // change background colour if dragging
  background: isDragging ? 'indigo':'midnightblue',
  borderRadius: '5px',
  opacity: '0.8',
  border: '1px solid darkgrey',
  
  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? '#00000e' : '#03000e',
  display: 'flex',
  padding: grid,
  overflow: 'auto',
});


const MenuControl = (props) => {
    // const [items, setItems] = React.useState(getItems(6));
    const { assetsActive, loadAssetsActiveState, setAssetsActiveState } = useHeaderState();
    const { children } = props;

    const [connected, setSocketConnected] = React.useState(false);
    const { socket } = useSocketIO({
      hostAddress: TOUCH_WEB_SERVER_URL,
      setSocketConnected,
    });

    React.useEffect(() => {
      if(socket === null) return;
      socket.emit('ASSET_CHANGE', assetsActive);
    },[assetsActive, socket])

    React.useEffect(() => {
      loadAssetsActiveState();
    },[loadAssetsActiveState])
    const onDragEnd = React.useCallback((result) => {

        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const newAssetsActive = reorder(
            assetsActive,
            result.source.index,
            result.destination.index
        );
        setAssetsActiveState(newAssetsActive)
    },[assetsActive, setAssetsActiveState])

    console.log(')))', assetsActive)

    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
            >
              {assetsActive.length === 0 && (
                  <div>No Menu Selected</div>
              )}
              {assetsActive.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {React.cloneElement(children, {
                        id: item.assetId,
                        title: item.assetTitle
                      })}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );

}

export default React.memo(MenuControl);