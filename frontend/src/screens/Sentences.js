import * as React from 'react'
import * as wordProcessing from '../services/wordProcessing'

import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import { TextField } from '@mui/material'
import { styled } from '@mui/material/styles'

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  width: 700,
}))

const Sentences = (props) => {
  const [englishSentences, setEnglishSentences] = React.useState([])
  const [arabicSentences, setArabicSentences] = React.useState([])

  function handleChangeEnglish(event) {
    setEnglishSentences(event.target.value)
    const englishSentencesProcessed = wordProcessing.splitTextToSentences(event.target.value)
    let theEnglishWords = []
    englishSentencesProcessed.forEach((sentence) => {
      theEnglishWords = theEnglishWords.concat(wordProcessing.splitSentencesToWords(sentence))
    })

    props.englishSentenceFunc(englishSentencesProcessed)
    props.englishWordsFunc(theEnglishWords)
  }

  function handleChangeArabic(event) {
    setArabicSentences(event.target.value)
    const arabicSentencesProcessed = wordProcessing.splitTextToSentences(event.target.value)
    const arabicWords = arabicSentencesProcessed.forEach((sentence) => {
      wordProcessing.splitSentencesToWords(sentence)
    })
    props.arabicSentenceFunc(arabicSentencesProcessed)
    props.arabicWordsFunc(arabicWords)
  }

  return (
    <Stack direction='row' divider={<Divider orientation='vertical' flexItem />} spacing={2}>
      <Item>
        <TextField InputProps={{ style: { fontSize: 20 } }} value={englishSentences} label='English' multiline rows={30} fullWidth variant='filled' onChange={handleChangeEnglish} />
      </Item>
      <Item>
        <div dir='rtl' fontSize='44'>
          <TextField InputProps={{ style: { fontSize: 30 } }} value={arabicSentences} label='Arabic' multiline rows={21} fullWidth variant='filled' onChange={handleChangeArabic} />
        </div>
      </Item>
    </Stack>
  )
}

export default Sentences
