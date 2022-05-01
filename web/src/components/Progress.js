/* eslint-disable react/react-in-jsx-scope */

import { CircularProgress, Grid } from '@mui/material'

function Progress() {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}>
      <Grid item xs={3}>
        <CircularProgress />
      </Grid>
    </Grid>
  )
}

export default Progress
