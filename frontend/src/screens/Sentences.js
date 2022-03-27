import * as React from 'react'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import { TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import * as wordProcessing from '../services/wordProcessing'
const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  width: 700,
}))

const Sentences = () => {
  const [englishSentences, setEnglishSentences] = React.useState()
  const [arabicSentences, setArabicSentences] = React.useState()

  const [englishSentencesObject, setEnglishSentencesObject] = React.useState()
  const [arabicSentencesObject, setArabicSentencesObject] = React.useState()

  function handleChangeEnglish(event) {
    setEnglishSentences(event.target.value)
    setEnglishSentencesObject(wordProcessing.splitTextToSentences(event.target.value))
    console.log(englishSentencesObject)
  }

  function handleChangeArabic(event) {
    setArabicSentences(event.target.value)
    setArabicSentencesObject(wordProcessing.splitTextToSentences(event.target.value))
    console.log(arabicSentencesObject)
  }

  return (
    <div>
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
    </div>
  )
}

export default Sentences
