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
    font-size: 14px;
    font-weight: 400;
    width: 100%;
    padding: 5px;
    padding-left: 10px;
    box-sizing: border-box;
    font-family: "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif !important;
    &:focus {
        outline: none;
    }
`;

const CustomInput = props => {
    const {onChange, value} = props;
    return (
        // <Container>
            <Input onChange={onChange} value={value} size="small"></Input>
        // </Container>
    )
}

export default React.memo(CustomInput)