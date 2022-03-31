import React, { useState } from 'react'

import Box from '@mui/material/Box'
import { Button } from '@mui/material'
import Heading from './Heading'
import LangSentences from '../models/LangSentences'
import LangText from '../models/LangText'
import Sentences from './Sentences'
import Tab from '@mui/material/Tab'
import { TabPanel } from './TabPanel'
import Tabs from '@mui/material/Tabs'
import Words from './Words'
import axios from 'axios'

export default function TextProduction() {
  const [value, setValue] = React.useState(0)

  const [categories, setCategories] = React.useState([])
  const [authors, setAuthors] = React.useState([])

  const [title, setTitle] = React.useState('')
  const [text, setText] = useState(new LangText())

  const [englishSentencesObject, setEnglishSentencesObject] = React.useState([])
  const [arabicSentencesObject, setArabicSentencesObject] = React.useState([])

  const [englishWords, setEnglishWords] = React.useState([])
  const [arabicWords, setArabicWords] = React.useState([])

  const logText = () => {
    console.log(text)
  }

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
  }

  const doTheUpdate = () => {
    const newText = new LangText()
    const newSentences = new LangSentences()

    newSentences.arabic = 'arabic sentence'
    newSentences.english = 'english sentence'

    newText.author = 'someAuthor'
    newText.heading = title
    newText.sentences = newSentences

    setText(newText)
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  React.useEffect(() => {
    axios
      .get('https://api.openarabic.io/api/categories')
      .then((response) => {
        setCategories(response.data)
      })
      .catch((err) => console.log(err))
    axios
      .get('https://api.openarabic.io/api/authors')
      .then((response) => {
        setAuthors(response.data)
      })
      .catch((err) => console.log(err))
  }, [])

  const setTitleFunc = (theTitle) => {
    setTitle(theTitle)
  }

  const setEnglishSentencesObjectFunc = (englishValue) => {
    setEnglishSentencesObject(englishValue)
  }

  const setArabicSentencesObjectFunc = (arabicValue) => {
    setArabicSentencesObject(arabicValue)
  }

  const setEnglishWordsFunc = (englishValue) => {
    setEnglishWords(englishValue)
  }

  const setArabicWordsFunc = (arabicValue) => {
    setArabicWords(arabicValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
          <Tab label='Heading' {...a11yProps(0)} />
          <Tab label='Sentences' {...a11yProps(1)} />
          <Tab label='Words' {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Heading Categories={categories} Authors={authors} Title={title} func={setTitleFunc} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Sentences arabicSentenceFunc={setArabicSentencesObjectFunc} englishSentenceFunc={setEnglishSentencesObjectFunc} englishWordsFunc={setEnglishWordsFunc} arabicWordsFunc={setArabicWordsFunc} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Words english={englishWords} arabic={arabicWords} />
      </TabPanel>

      <Button
        variant='contained'
        onClick={() => {
          alert('clicked')
        }}
      >
        Add Text
      </Button>
      <Button onClick={doTheUpdate}>Do The Update</Button>
      <Button onClick={logText}>Log The Text</Button>
    </Box>
  )
}
