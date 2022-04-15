import Box from '@mui/material/Box'
import Footer from '../../components/Footer'
import Heading from './Heading'
import Nav from '../../components/Nav'
import React from 'react'
import Sentences from './Sentences'
import Tab from '@mui/material/Tab'
import { TabPanel } from '../../components/TabPanel'
import Tabs from '@mui/material/Tabs'
import Words from './Words'
import axios from 'axios'

export default function Texts() {
  const [value, setValue] = React.useState(0)

  const [categories, setCategories] = React.useState([])
  const [authors, setAuthors] = React.useState([])

  const [title, setTitle] = React.useState('')

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

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

  const setTitleFunc = (theTitle) => {
    setTitle(theTitle)
  }

  return (
    <React.Fragment>
      <Nav />

      <Box width='100%' display='flex' justifyContent='center' alignItems='center'>
        <Box width='90%' justifyContent='center' alignItems='center'>
          <h2>Add Text</h2>
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
        </Box>
      </Box>
      <Footer />
    </React.Fragment>
  )
}
