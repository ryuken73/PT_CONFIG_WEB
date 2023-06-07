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
  margin-right: 20px;
`
const IconBox = styled(Box)`
  min-width: 40px;
`
const TinyBox = styled(Box)`
  flex: 0;
  /* flex: 1; */
  min-width: 60px;
  /* max-width: 100px; */
`
const SmallBox = styled(Box)`
  flex: 0;
  /* flex: 2; */
  min-width: 120px;
  /* max-width: 180px; */
`
const SmallMediumBox = styled(Box)`
  flex: 0;
  min-width: 80px;
  text-align: left;
`
const MediumBox = styled(Box)`
  flex: 1;
  /* flex: 3; */
  min-width: 200px;
  /* max-width: 200px; */
`
const BigBox = styled(Box)`
  flex: 2;
  /* flex: 4; */
  /* width: 100%; */
  min-width: 300px;
  /* max-width: 400px; */
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
  const { allChecked, toggleAllCheckedInTypeState } = useAssetListState();

  return (
    <Container>
      <TextContainer>
        <CheckBox checked={allChecked} setChecked={toggleAllCheckedInTypeState}/>
        <IconBox>
          <CustomTextBox text="" />
        </IconBox>
        <TinyBox>
          <CustomTextBox text="순번" />
        </TinyBox>
        <SmallBox>
          <CustomTextBox text="모드" />
        </SmallBox>
        <MediumBox>
          <CustomTextBox textAlign="left" text="타이틀" />
        </MediumBox>
        <SmallMediumBox>
          <CustomTextBox textAlign="left" text="분류" />
        </SmallMediumBox>
        <IconContainer>
          <IconBox>
            <CustomIconTextBox text="등록" />
          </IconBox>
          <IconBox>
            <CustomIconTextBox text="수정" />
          </IconBox>
          <IconBox>
            <CustomIconTextBox text="삭제" />
          </IconBox>
          <PaddingBox />
          {/* <Box width="50%" marginRight="20px" /> */}
        </IconContainer>
        <BigBox>
          <CustomTextBox textAlign="left" text="대표소스" />
        </BigBox>
        <TinyBox>
          <CustomTextBox text="소스갯수" />
        </TinyBox>
        <MediumBox>
          <CustomTextBox text="생성일" />
        </MediumBox>
        <MediumBox>
          <CustomTextBox text="수정일" />
        </MediumBox>
      </TextContainer>
    </Container>
  )
};

export default React.memo(JobItem);
