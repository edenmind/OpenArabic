import { Box, Button, Divider, Stack } from '@mui/material'
import React, { Fragment } from 'react'

import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import { useSelector } from 'react-redux'

export const Review = () => {
  const { englishWords } = useSelector((state) => state.englishWords)
  const { arabicWords } = useSelector((state) => state.arabicWords)
  const { englishText } = useSelector((state) => state.englishText)
  const { arabicText } = useSelector((state) => state.arabicText)
  const { englishSentence } = useSelector((state) => state.englishSentence)
  const { arabicSentence } = useSelector((state) => state.arabicSentence)

  const { title } = useSelector((state) => state.title)
  const { category } = useSelector((state) => state.category)
  const { author } = useSelector((state) => state.author)
  const { source } = useSelector((state) => state.author)

  const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    width: 700,
  }))

  const ItemSmall = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    width: 115,
  }))

  const arabicSentences = (
    <Stack spacing={1}>
      {arabicSentence.map((sentence, index) => (
        <Fragment key={index}>
          <div dir='rtl'>
            <Box sx={{ fontSize: 'h4.fontSize' }}>{arabicSentence[index]}</Box>
          </div>
          <Box>{englishSentence[index]}</Box>

          <br />
        </Fragment>
      ))}
    </Stack>
  )

  return (
    <Stack spacing={2}>
      <h2>{title}</h2>
      <h3>{category}</h3>
      <h3>{author}</h3>
      <h3>{source}</h3>

      <Item>
        <Divider textAlign='left'>English Text</Divider>
        <div>{englishText}</div>
      </Item>
      <Item>
        <Divider textAlign='left'>Arabic Text</Divider>
        <div>{arabicText}</div>
      </Item>
      <Item>
        <Divider textAlign='left'>Sentences</Divider>
        {arabicSentences}
      </Item>

      <ItemSmall>
        <Button
          variant='contained'
          onClick={() => {
            alert('clicked')
          }}
        >
          Add Text
        </Button>
      </ItemSmall>
    </Stack>
  )
}
