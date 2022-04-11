import { Button, Divider, Stack } from '@mui/material'
import React, { Fragment } from 'react'

import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import { useSelector } from 'react-redux'

export const Preview = () => {
  const { englishWords } = useSelector((state) => state.englishWords)
  const { arabicWords } = useSelector((state) => state.arabicWords)
  const { englishText } = useSelector((state) => state.englishText)
  const { arabicText } = useSelector((state) => state.arabicText)

  const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    width: 700,
  }))

  return (
    <Fragment>
      <Stack spacing={2}>
        <Item>
          <Divider textAlign='left'>English Text</Divider>
          <div>{englishText}</div>
        </Item>
        <Item>
          <Divider textAlign='left'>Arabic Text</Divider>
          <div>{arabicText}</div>
        </Item>
        <Item>
          <Divider textAlign='left'>Words</Divider>
          <div>{arabicText}</div>
        </Item>
      </Stack>
      <Button
        variant='contained'
        onClick={() => {
          alert('clicked')
        }}
      >
        Add Text
      </Button>
    </Fragment>
  )
}
