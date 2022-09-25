import React from 'react'
import styled from 'styled-components'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

const inputColor = 'black';

const Item = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 42px;
    width: 90%;
`
const CustomInput = styled(TextField)`
  .MuiInput-root {
    font-size: 0.8rem;
  }
  .MuiInput-root:after {
    border-bottom: black;
  }
  div input {
    color: black;
  }
  div input:-webkit-autofill,
  div input:-webkit-autofill:hover, 
  div input:-internal-autofill-selected,
  div input:-webkit-autofill:focus {
    /* border: 0px solid green; */
    background: transparent !important;
    -webkit-text-fill-color: black;
    -webkit-box-shadow: -1 0 0px 1000px #000 inset;
    transition: background-color 4999s ease-in-out 0s;
  }
  div input:after {
    border-bottom: black;
  }
`;

const OptionItemText = props => {
    const {id, title, onChange, value, ...rest} = props;
    return (
        <Item>
            <Box width="100px" mr="10px">{title}</Box>
            {value ? 
              <CustomInput fullWidth variant="standard" onChange={onChange} value={value} id={id} size="small"></CustomInput> :
              <CustomInput fullWidth variant="standard" onChange={onChange} id={id} size="small"></CustomInput>
            }
        </Item>
  )
}

export default React.memo(OptionItemText)