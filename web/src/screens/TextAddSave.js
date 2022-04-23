import { Button, Chip, Stack } from '@mui/material'

import { Fragment } from 'react'
import PropTypes from 'prop-types'

function TextAddSave(props) {
  return (
    <Fragment>
      <Stack direction='row' spacing={2}>
        {props.title.length > 4 ? <Chip label='Title' color='success' /> : <Chip label='Title' color='error' />}
        {props.category.length > 4 ? <Chip label='Category' color='success' /> : <Chip label='Category' color='error' />}
        {props.source.length > 4 ? <Chip label='Source' color='success' /> : <Chip label='Source' color='error' />}
        {props.author.length > 4 ? <Chip label='Author' color='success' /> : <Chip label='Author' color='error' />}
        <Button onClick={props.handleSave}>Save</Button>
      </Stack>
      <br />
      <br />
      <br />
      <br />
    </Fragment>
  )
}

export default TextAddSave

TextAddSave.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  handleSave: PropTypes.func.isRequired,
}
