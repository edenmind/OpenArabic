import * as React from 'react'

import MenuSelect from '../components/MenuSelect'
import { TextField } from '@mui/material'

const divStyle = {
  padding: '10px',
}

const Heading = (props) => {
  const [title, setTitle] = React.useState('')
  const handleChange = (event) => {
    setTitle(event.target.value)
    props.func(title)
  }
  return (
    <div>
      <div style={divStyle}>
        <TextField fullWidth id='outlined-basic' label='Title' variant='outlined' value={title} onChange={handleChange} />
      </div>
      <div style={divStyle}>
        <MenuSelect Heading='Author' Values={props.Authors} />
      </div>
      <div style={divStyle}>
        <MenuSelect Heading='Category' Values={props.Categories} />
      </div>
    </div>
  )
}

export default Heading
