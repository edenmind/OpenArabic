import { createTheme } from '@mui/material/styles'
import { green, teal } from '@mui/material/colors'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: 'rgb(156, 215, 105)'
    },
    secondary: {
      main: 'rgb(190, 203, 174)'
    },
    text: {
      primary: 'rgb(227, 227, 220)'
    },
    background: {
      default: 'rgb(26, 28, 24)',
      paper: 'rgb(26, 28, 24)'
    }
  },
  typography: {
    fontFamily: ['Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(',')
  }
})

export default darkTheme
