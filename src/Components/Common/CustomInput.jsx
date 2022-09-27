import React from 'react'
import styled from 'styled-components'
import TextField from '@mui/material/TextField'

const Container = styled.div`
    padding: 10px;
`

const Input = styled.input`
    background: transparent;
    border: 0px;
    color: aliceblue;
    font-size: 16px;
    width: 100%;
    box-sizing: border-box;
    &:focus {
        outline: none;
    }
`;

const CustomInput = props => {
    const {onChange, value} = props;
    return (
        <Container>
            <Input onChange={onChange} value={value} size="small"></Input>
        </Container>
    )
}

export default React.memo(CustomInput)