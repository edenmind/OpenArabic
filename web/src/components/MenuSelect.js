import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

import PropTypes from 'prop-types'

function MenuSelect(props) {
  return (
    <FormControl fullWidth>
      <InputLabel id={props.Heading}>{props.Heading}</InputLabel>
      <Select
        labelId={props.Heading}
        id={props.Heading}
        value={props.value}
        label={props.Heading}
        onChange={props.onChangeFunc}>
        <MenuItem disabled value="">
          <em>Select...</em>
        </MenuItem>
        {props.Values?.map((v, index) => (
          <MenuItem key={index} value={v.name}>
            {/* this should be refactored. */}
            {v.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
MenuSelect.propTypes = {
  Heading: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  Values: PropTypes.array.isRequired,
  onChangeFunc: PropTypes.func.isRequired
}

export default MenuSelect
