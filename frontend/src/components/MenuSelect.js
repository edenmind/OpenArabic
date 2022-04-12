import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

const MenuSelect = (props) => (
  <FormControl fullWidth>
    <InputLabel id={props.Heading}>{props.Heading}</InputLabel>
    <Select labelId={props.Heading} id={props.Heading} value={props.value} label={props.Heading} onChange={props.onChangeFunc}>
      <MenuItem disabled value=''>
        <em>Select...</em>
      </MenuItem>
      {props.Values?.map((v, index) => (
        <MenuItem key={index} value={v.id}>
          {' '}
          {/* this should be refactored. */}
          {v.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
)
export default MenuSelect
