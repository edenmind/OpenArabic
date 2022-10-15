import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as api from '../services/api-service.js'
import Box from '@mui/material/Box'
import Heading from './text-add-heading.js'
import Nav from '../components/nav.js'
import Progress from '../components/progress.js'
import Sentences from './text-add-sentence.js'
import Tab from '@mui/material/Tab'
import TabPanel from '../components/tab-panel.js'
import Tabs from '@mui/material/Tabs'
import TextAddPreview from './text-add-preview.js'
import TextAddPublish from './text-add-publish.js'
import TextAddWords from './text-add-words.js'
import { useParams } from 'react-router-dom'

const selector = (state) => state.text

function a11yProperties(index) {
  return {
    // eslint-disable-next-line quote-props
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

export default function TextAdd() {
  const [value, setValue] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState(true)

  const { id } = useParams()
  const { text } = useSelector(selector)

  const handleChange = (event, value) => {
    setValue(value)
  }
  const dispatch = useDispatch()

  useEffect(() => {
    if (id) {
      dispatch(api.getTextToRedux(id))
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
              <Tab label="Publish" {...a11yProperties(4)} />
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
          <TabPanel value={value} index={4}>
            <TextAddPublish />
          </TabPanel>
        </Box>
      </Box>
    </React.Fragment>
  )
}
