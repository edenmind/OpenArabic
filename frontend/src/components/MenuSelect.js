import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useState } from 'react'

const MenuSelect = (props) => {
  const [value, setValue] = useState()

  return (
    <FormControl fullWidth>
      <InputLabel id={props.Heading}>{props.Heading}</InputLabel>
      <Select labelId={props.Heading} id={props.Heading} value={value} label={props.Heading} onChange={setValue}>
        {props.Values.map((v, index) => (
          <MenuItem key={index} value={v.categroyId ? v.categroyId : v.authorId}>
            {v.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
export default MenuSelect
