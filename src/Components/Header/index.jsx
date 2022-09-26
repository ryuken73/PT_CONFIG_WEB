import React from 'react';
import styled from 'styled-components';
import MenuControl from 'Components/Header/MenuControl';
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
const Header = () => {
  return (
    <Container>
      <MenuControl></MenuControl>
    </Container>
  );
};

export default React.memo(Header);
