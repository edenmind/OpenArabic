import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Heading from './Heading'
import Sentences from './Sentences'
import Words from './Words'
import { Button } from '@mui/material'
import axios from 'axios'
import LangSentences from '../models/LangSentences'
import LangText from '../models/LangText'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div role='tabpanel' hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export default function TextProduction() {
  const [value, setValue] = React.useState(0)

  const [categories, setCategories] = React.useState([])
  const [authors, setAuthors] = React.useState([])
  const [title, setTitle] = React.useState('')

  const [text, setText] = useState(new LangText())

  const logText = () => {
    console.log(text)
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
        <Sentences />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Words />
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
