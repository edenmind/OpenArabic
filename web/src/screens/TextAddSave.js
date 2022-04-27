import { Button, Chip, Stack } from '@mui/material'

import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

function TextAddSave(props) {
  const { text } = useSelector((state) => state.text)
  return (
    <Fragment>
      <Stack direction='row' spacing={2}>
        {text.title.length > 4 ? <Chip label='Title' color='success' /> : <Chip label='Title' color='error' />}
        {text.category.length > 4 ? <Chip label='Category' color='success' /> : <Chip label='Category' color='error' />}
        {text.source.length > 4 ? <Chip label='Source' color='success' /> : <Chip label='Source' color='error' />}
        {text.author.length > 4 ? <Chip label='Author' color='success' /> : <Chip label='Author' color='error' />}
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
  handleSave: PropTypes.func.isRequired,
}
