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
import { getText } from '../services/apiService'
import { useParams } from 'react-router-dom'

export default function TextAdd() {
  const [value, setValue] = React.useState(0)

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
    if (id) {
      dispatch(getText(id))
    } else {
      dispatch({ type: 'RESET_TEXT' })
    }
    setIsLoading(false)
  }, [dispatch, id])

  const title = id ? 'Update Text' : 'Add Text'

  return isLoading ? (
    <Progress />
  ) : (
    <React.Fragment>
      <Nav />

      <Box width='100%' display='flex' justifyContent='center' alignItems='center'>
        <Box width='90%' justifyContent='center' alignItems='center'>
          <h2>{title}</h2>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
              <Tab label='Heading' {...a11yProps(0)} />
              <Tab label='Sentences' {...a11yProps(1)} />
              <Tab label='Words' {...a11yProps(2)} />
              <Tab label='Preview' {...a11yProps(3)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Heading Title={text.title} />
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
