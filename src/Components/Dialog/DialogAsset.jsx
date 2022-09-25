import React from 'react';
import styled from 'styled-components';
import TextBox from 'Components/Common/TextBox';
import prettyBytes from 'pretty-bytes';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 50%;
`
const LightTextBox = styled(TextBox)`
    text-align: right;
    opacity: 1;
    margin-left: 5px;
    margin-right: 5px;
    padding: 5px;
    min-width: 50px;
`

const AssetItem = (props) => {
    const {name, size, progress} = props
    return (
        <Container>
            <LightTextBox text={`${progress}%`}></LightTextBox>
            <LightTextBox text={prettyBytes(size)}></LightTextBox>
            <LightTextBox text={name}></LightTextBox>
        </Container>
    )
}

export default React.memo(AssetItem);
