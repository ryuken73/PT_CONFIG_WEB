import * as React from 'react';
import AnimatedNumber from 'Components/Common/AnimatedNumber';
import usePrevious from 'hooks/usePrevious';

const FlipNumber = props => {
  const {number} = props;
  const [to, setTo] = React.useState(number);
  const from = usePrevious(to);
  React.useEffect(() => {
    setTo(number);
  },[number])
  return <AnimatedNumber from={from} to={to}></AnimatedNumber>
}

export default React.memo(FlipNumber)
