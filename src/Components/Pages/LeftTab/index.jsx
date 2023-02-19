import React from 'react'
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Type from 'Components/Pages/LeftTab/Type';
import useTypeListState from 'hooks/useTypeListState';

const Container = styled.div`
  width: 80%;
  text-align: left;
`
const InputContainer = styled.div`
  display: flex;
  /* align-items: flex-end; */
`
const CustomAddIcon = styled(AddIcon)`
  color: black;
  border: 1px solid white;
  border-radius: 4px;
  background: #ffffff;
`
const CustomInput = styled.input`
  background: black;
  border-radius: 5px;
  color: white;
  border: 1px solid white;
  font-size: calc(10px + 1.1vmin);
  max-width: 50%;
  padding: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
  font-family: "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
`

function LeftTab() {
  const {typeList, currentTypeId, initTypeState, addTypeState} = useTypeListState();
  const inputRef = React.useRef(null);
  React.useEffect(() => {
    initTypeState();
  }, [initTypeState])

  const onClickAdd = React.useCallback(() => {
    const type = inputRef.current.value;
    if(type.length === 0){
      alert('Length of category is zero!');
      return;
    }
    addTypeState(type);
  }, [addTypeState])

  const onKeyDown = React.useCallback((event) => {
    const charCode = event.keyCode;
    if(charCode === 13){
      onClickAdd();
      inputRef.current.value = "";
    }
  }, [onClickAdd])

  return (
    <Container>
      <InputContainer>
        <CustomInput
          type="text"
          ref={inputRef}
          onKeyDown={onKeyDown}
        >
        </CustomInput>
        <IconButton onClick={onClickAdd}>
          <CustomAddIcon fontSize="medium"></CustomAddIcon>
        </IconButton>
      </InputContainer>
      {typeList.map((type, index) => (
        <Type 
          key={type.typeId}
          typeName={type.type}
          typeId={type.typeId}
          irremovable={type.irremovable}
          currentTypeId={currentTypeId}
        >
        </Type>
      ))}

    </Container>
  )
}

export default React.memo(LeftTab);
