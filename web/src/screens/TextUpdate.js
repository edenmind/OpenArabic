import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Box from '@mui/material/Box'
import Heading from './TextAddHeading'
import Nav from '../components/Nav'
import Progress from '../components/Progress'
import Sentences from './TextAddSentences'
import Tab from '@mui/material/Tab'
import { TabPanel } from '../components/TabPanel'
import Tabs from '@mui/material/Tabs'
import TextAddPreview from './TextAddPreview'
import Words from './TextAddWords'
import axios from 'axios'
import { getText } from '../services/apiService'
import { useParams } from 'react-router-dom'

export default function TextUpdate() {
  const [value, setValue] = React.useState(0)

  const [categories, setCategories] = React.useState([])
  const [authors, setAuthors] = React.useState([])

  const selector = (state) => state.text
  const { text } = useSelector(selector)
  const [isLoading, setIsLoading] = React.useState(true)

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const { id } = useParams()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getText(id))
    setIsLoading(false)
  }, [dispatch, id])

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/categories`)
      .then((response) => {
        setCategories(response.data)
      })
      .catch((err) => console.log(err))
    axios
      .get(`${process.env.REACT_APP_API_URL}/authors`)
      .then((response) => {
        setAuthors(response.data)
      })
      .catch((err) => console.log(err))
  }, [])

  return isLoading ? (
    <Progress />
  ) : (
    <React.Fragment>
      <Nav />

      <Box width='100%' display='flex' justifyContent='center' alignItems='center'>
        <Box width='90%' justifyContent='center' alignItems='center'>
          <h2>Update Text</h2>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
              <Tab label='Heading' {...a11yProps(0)} />
              <Tab label='Sentences' {...a11yProps(1)} />
              <Tab label='Words' {...a11yProps(2)} />
              <Tab label='Preview' {...a11yProps(3)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Heading Categories={categories} Authors={authors} Title={text.title} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Sentences />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Words />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <TextAddPreview />
          </TabPanel>
        </Box>
      </Box>
    </React.Fragment>
  )
}
