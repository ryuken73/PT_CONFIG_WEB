/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import CheckBox from 'Components/Common/CheckBox';
import TextBox from 'Components/Common/TextBox';
import useAssetListState from 'hooks/useAssetListState';
import colors from 'config/colors';

const Container = styled(Box)`
  && {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    min-height: 40px;
  }
`
const TextContainer = styled(Container)`
  && {
    width: 100%;
    opacity: 1;
    background: ${(props) => (props.checked ? colors.checked : 'transparent')};
  }
`;
const IconContainer = styled(Container)`
  margin-left: 20px;
`


const TinyBox = styled(Box)`
  flex: 1;
  min-width: 60px;
  max-width: 100px;
`
const SmallBox = styled(Box)`
  flex: 2;
  min-width: 150px;
  max-width: 200px;
`
const MediumBox = styled(Box)`
  flex: 3;
  /* min-width: 120px;
  max-width: 120px; */
`
const BigBox = styled(Box)`
  flex: 4;
  /* width: 100%;
  min-width: 400px; */
`
const CustomTextBox = styled(TextBox)`
  text-align: center;
`
const CustomIconTextBox = styled(CustomTextBox)`
  font-size: 12px;
  opacity: 0.4;
`
const PaddingBox = styled.div`
  width: 10px;
`

const JobItem = () => {
  const { allChecked, toggleAllCheckedState } = useAssetListState();

  return (
    <Container>
      <TextContainer>
        <CheckBox checked={allChecked} setChecked={toggleAllCheckedState}/>
        <TinyBox>
          <CustomTextBox text="순번" />
        </TinyBox>
        <MediumBox>
          <CustomTextBox textAlign="left" text="타이틀" />
        </MediumBox>
        <BigBox>
          <CustomTextBox textAlign="left" text="대표소스" />
        </BigBox>
        <TinyBox>
          <CustomTextBox text="소스갯수" />
        </TinyBox>
        <SmallBox>
          <CustomTextBox text="생성일" />
        </SmallBox>
        <SmallBox>
          <CustomTextBox text="수정일" />
        </SmallBox>
      </TextContainer>
      <IconContainer>
        <TinyBox>
          <CustomIconTextBox text="수정" />
        </TinyBox>
        <TinyBox>
          <CustomIconTextBox text="삭제" />
        </TinyBox>
        <PaddingBox />
        {/* <Box width="50%" marginRight="20px" /> */}
      </IconContainer>
    </Container>
  )
};

export default React.memo(JobItem);
