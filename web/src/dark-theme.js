import { createTheme } from '@mui/material/styles'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: 'rgb(204, 204, 82)'
    },
    secondary: {
      main: 'rgb(202, 200, 165)'
    }
  },
  typography: {
    fontFamily: ['Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(',')
  }
})

export default darkTheme
