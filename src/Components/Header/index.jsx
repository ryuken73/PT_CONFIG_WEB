import React from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import TextBox from 'Components/Common/TextBox';
import constants from 'config/constants';
import bullConstants from 'config/bull-constants';
import PlusMinuxBox from '../Common/PlusMinuxBox';


const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`
const QStatusBox = styled.div`
  margin-left: 10px;
  margin-right: auto;
`
const InfoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: auto;
  margin-right: 10px;
`
const CustomTextBox = styled(TextBox)`
  font-size: 12px;
  margin: 5px;
`

const Header = () => {
  return (
    <Container>
      <QStatusBox>
        <CustomTextBox text="동시 작업수">mediainfo</CustomTextBox>
        <PlusMinuxBox></PlusMinuxBox>
      </QStatusBox>
      <InfoBox>
        <Box marginRight="5px">
          <TextBox fontSize="11px" text={"출력폴더:"}></TextBox>
        </Box>
      </InfoBox>
    </Container>
  );
};

export default React.memo(Header);
