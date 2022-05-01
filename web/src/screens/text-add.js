/* eslint-disable react/react-in-jsx-scope */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Box from '@mui/material/Box'
import Heading from './text-add-heading'
import Nav from '../components/nav'
import Progress from '../components/progress'
import Sentences from './text-add-sentence'
import Tab from '@mui/material/Tab'
import { TabPanel } from '../components/tab-panel'
import Tabs from '@mui/material/Tabs'
import TextAddPreview from './text-add-preview'
import TextAddWords from './text-add-words'
import { getText } from '../services/api-service'
import { useParams } from 'react-router-dom'

const selector = (state) => state.text

function a11yProperties(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}
export default function TextAdd() {
  const [value, setValue] = React.useState(0)

  const { text } = useSelector(selector)
  const [isLoading, setIsLoading] = React.useState(true)

  const handleChange = (event, value) => {
    setValue(value)
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

      <Box width="100%" display="flex" justifyContent="center" alignItems="center">
        <Box width="90%" justifyContent="center" alignItems="center">
          <h2>{title}</h2>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Heading" {...a11yProperties(0)} />
              <Tab label="Sentences" {...a11yProperties(1)} />
              <Tab label="Words" {...a11yProperties(2)} />
              <Tab label="Preview" {...a11yProperties(3)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Heading Title={text.title} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Sentences />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <TextAddWords />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <TextAddPreview />
          </TabPanel>
        </Box>
      </Box>
    </React.Fragment>
  )
}
