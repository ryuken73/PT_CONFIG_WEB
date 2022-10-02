import React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';

const ButtonSmall = styled(Button)`
  && {
    color: ${(props) => props.color || 'white'};
    font-size: ${(props) => props.fontSize || '10px'};
    background: ${(props) => props.background || 'transparent'};
    border-radius: ${props => props.borderRadius ? props.borderRadius : '10px'};
    border: ${(props) => props.border || 'none'};
    min-width: ${(props) => props.minWidth || '64px'};
    padding: ${props => props.padding};
    &:hover {
      background: ${(props) => props.hoverBackground || 'transparent'};
      border: ${(props) => props.hoverBorder || 'none'};
    }
  }
`;

export default React.memo(ButtonSmall);
