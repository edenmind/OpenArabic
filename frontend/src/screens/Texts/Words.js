import { Box, Button, Stack, TextField } from '@mui/material'
import React, { useEffect } from 'react'

import Footer from '../../components/Footer'
import axios from 'axios'
import { useSelector } from 'react-redux'

const Words = () => {
  const { arabicWords } = useSelector((state) => state.arabicWords)
  const { englishSentence } = useSelector((state) => state.englishSentence)
  const { arabicSentence } = useSelector((state) => state.arabicSentence)
  const { title } = useSelector((state) => state.title)
  const { category } = useSelector((state) => state.category)
  const { author } = useSelector((state) => state.author)
  const { source } = useSelector((state) => state.source)

  const [wordByWord, setWordByWord] = React.useState([])

  const handleChangeArabic = (indexSentence, indexArabicWord, value) => {
    const newTheArabicWord = [...wordByWord]
    newTheArabicWord[indexSentence][indexArabicWord] = value
    setWordByWord(newTheArabicWord)
  }

  const handleSave = () => {
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/texts`,
      data: {
        title,
        category,
        author,
        source,
        englishSentence,
        arabicSentence,
        wordByWord,
      },
    })
      .then((response) => {
        if (response.status === 201) {
          console.log('text saved')
        }
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    const newTheArabicWord = []

    for (const arabicWord of arabicWords) {
      const numberOfWords = arabicWord.length
      const newArray = []
      for (let j = 0; j < numberOfWords; j++) {
        newArray.push([''])
      }
      newTheArabicWord.push(newArray)
    }
    setWordByWord(newTheArabicWord)

    console.log('length: ', wordByWord.length)
  }, [])
  const listOfWords = arabicWords.map((sentence, indexSentence) => (
    <Stack spacing={2} key={indexSentence}>
      <TextField InputProps={{ style: { fontSize: 18 } }} value={englishSentence[indexSentence]} label='English' multiline rows={2} fullWidth variant='outlined' />
      <div dir='rtl'>
        <TextField InputProps={{ style: { fontSize: 33 } }} value={arabicSentence[indexSentence]} label='Arabic' multiline rows={2} fullWidth variant='outlined' />
      </div>
      {wordByWord.length > 1 &&
        sentence.map((arabicWord, indexArabicWord) => (
          <Box sx={{ fontSize: 'h4.fontSize' }} key={indexArabicWord}>
            {arabicWord}
            <TextField
              InputProps={{ style: { fontSize: 15 } }}
              value={wordByWord[indexSentence][indexArabicWord]}
              onChange={(event) => handleChangeArabic(indexSentence, indexArabicWord, event.target.value)}
              rows={1}
              fullWidth
              variant='outlined'
            />
          </Box>
        ))}
      <br />
      <br />
      <br />
      <Button onClick={handleSave}>Save</Button>
    </Stack>
  ))

  return (
    <React.Fragment>
      {listOfWords}
      <Footer />
    </React.Fragment>
  )
}

export default Words
