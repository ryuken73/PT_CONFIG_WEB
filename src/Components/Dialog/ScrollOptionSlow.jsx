import * as React from 'react';
import styled from 'styled-components';
import Slider from '@mui/material/Slider';
import { Box } from '@mui/system';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
const Title = styled.div`
  margin-right: 25px;
  min-width: 150px;
`

function ScrollOptionSlow(props) {
  const {scrollSpeed=150, setScrollSpeed} = props;
  const onChange = React.useCallback((event) => {
      const { value } = event.target;
      setScrollSpeed(value);
    },
    [setScrollSpeed]
  );
  return (
    <Container>
      <Title>
        Scroll Speed
      </Title>
      <Box width="50%">
      <Slider
        aria-label="lineOpacity"
        value={scrollSpeed}
        min={150}
        step={100}
        marks
        max={1000}
        onChange={onChange}
        valueLabelDisplay="auto"
      />
      </Box>
    </Container>
  );
}

export default React.memo(ScrollOptionSlow);