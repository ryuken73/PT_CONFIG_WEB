import React from 'react';
import styled from 'styled-components';
import TextBox from 'Components/Common/TextBox';
import CustomInput from 'Components/Common/CustomInput';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
`
const WebAsset = (props) => {
    const {value, onChange} = props
    return (
        <Container>
            <CustomInput
                value={value}
                onChange={onChange}
            ></CustomInput>
        </Container>
    )
}

export default React.memo(WebAsset);
