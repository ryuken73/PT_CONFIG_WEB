
import React from 'react'
import styled from 'styled-components'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'

const Item = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`
const CustomRadio = styled(Radio)`
    span {
        color: black;
    }

`
const OptionItemText = props => {
    const {id, title, formItems, selected, onChange} = props;
    const onChangeRadio = React.useCallback((event, id) => {
        onChange(id)
    },[onChange])
    return (
        <Item>
            <Box minWidth="100px" mr="10px">{title}</Box>
            <FormControl>
                <RadioGroup row value={selected} onChange={onChangeRadio}>
                    {formItems.map((formItem, index) => {
                        const {value, label} = formItem;
                        return <FormControlLabel sx={{minWidth:'100px'}} key={index} id={label} value={value} label={label} control={<CustomRadio />}></FormControlLabel>
                    })}
                </RadioGroup>
            </FormControl>
        </Item>
  )
}

export default React.memo(OptionItemText)