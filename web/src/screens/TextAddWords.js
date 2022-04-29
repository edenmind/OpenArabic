import React from 'react'
import TextAddListOfWords from './TextAddListOfWords'
import { useSelector } from 'react-redux'

const TextAddWords = () => {
  const selector = (state) => state.text
  const { text } = useSelector(selector)

  const [wordByWord, setWordByWord] = React.useState([])

  const handleChangeArabic = (indexSentence, indexArabicWord, value) => {
    const newTheArabicWord = [...wordByWord]

    const translation = {
      arabic: text.arabicWords[indexSentence][indexArabicWord],
      english: value,
    }

    newTheArabicWord[indexSentence][indexArabicWord] = translation
    setWordByWord(newTheArabicWord)
  }

  return (
    <React.Fragment>
      <TextAddListOfWords handleChangeArabic={handleChangeArabic} />
    </React.Fragment>
  )
}

export default TextAddWords
