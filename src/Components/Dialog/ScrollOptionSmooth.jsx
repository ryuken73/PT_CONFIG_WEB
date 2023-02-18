import * as React from 'react';
import styled from 'styled-components';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
const Title = styled.div`
  margin-right: 15px;
  min-width: 150px;
`

function ScrollOptionSmooth(props) {
  const {isScrollSmooth=false, setIsScrollSmooth} = props;
  const onChange = React.useCallback((event) => {
      const { value } = event.target;
      setIsScrollSmooth(value === 'yes' ? true : false);
    },
    []
  );
  return (
    <Container>
      <Title>
        Scroll High Quality
      </Title>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={isScrollSmooth ? 'yes' : 'no'}
        onChange={onChange}
      >
        <FormControlLabel value="yes" control={<Radio />} label="True" />
        <FormControlLabel value="no" control={<Radio />} label="False" />
      </RadioGroup>
    </Container>
  );
}

export default React.memo(ScrollOptionSmooth);