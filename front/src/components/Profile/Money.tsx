import React from 'react'
import { useAuth } from '../../store/auth.store'
import { Paper, Typography, Grid } from '@mui/material'

const Money = () => {
  const { user } = useAuth()
  return (
    <>
      <Typography variant="h4" sx={{ marginTop: '50px' }}>
        {'כספים'}
      </Typography>
      <Paper elevation={4} sx={{ padding: '15px 40px', marginTop: '20px' }}>
        <Grid container spacing={1}>
          <Grid item sm={2} xs={6}>
            <Typography variant="h6">{'מס חברה'}</Typography>
            <Typography variant="body1">{user?.hp ?? '-'}</Typography>
          </Grid>
          <Grid item sm={2} xs={6}>
            <Typography variant="h6">{'קוד תנאי תשלום'}</Typography>
            <Typography variant="body1">{user?.payCode ?? '-'}</Typography>
          </Grid>
          <Grid item sm={2} xs={6}>
            <Typography variant="h6">{'תנאי תשלום'}</Typography>
            <Typography variant="body1">{user?.payDesc ?? '-'}</Typography>
          </Grid>
          <Grid item sm={2} xs={6}>
            <Typography variant="h6">{'תיקרת אשראי'}</Typography>
            <Typography variant="body1">{user?.maxCredit ?? '-'}</Typography>
          </Grid>
          <Grid item sm={2} xs={6}>
            <Typography variant="h6">{'תיקרת אובליגו'}</Typography>
            <Typography variant="body1">{user?.maxObligo ?? '-'}</Typography>
          </Grid>
          <Grid item sm={2} xs={6}>
            <Typography variant="h6">{'קוד ניכוי מס'}</Typography>
            <Typography variant="body1">{user?.taxCode ?? '-'}</Typography>
          </Grid>
          <Grid item sm={2} xs={6}>
            <Typography variant="h6">{'חובות פתוחים'}</Typography>
            <Typography variant="body1">{user?.taxCode ?? '-'}</Typography>
          </Grid>
          <Grid item sm={2} xs={6}>
            <Typography variant="h6">{'שיקים לפרעון'}</Typography>
            <Typography variant="body1">{user?.taxCode}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}

export default Money
