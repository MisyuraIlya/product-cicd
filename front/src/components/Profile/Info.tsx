import React from 'react'
import { useAuth } from '../../store/auth.store'
import { Paper, Typography, Grid, Button, Box } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import CreditCardIcon from '@mui/icons-material/CreditCard'

const Info = () => {
  const { user, logOut } = useAuth()

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4">אזור אישי</Typography>
        <Button
          variant="outlined"
          color="error"
          sx={{ fontSize: '19px' }}
          onClick={() => logOut()}
          startIcon={<LogoutIcon />}
        >
          התנתק
        </Button>
      </Box>
      <Paper elevation={4} sx={{ padding: '24px 40px', marginTop: '20px' }}>
        <Grid container spacing={2}>
          <Grid item sm={2} xs={6}>
            <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
              <PersonIcon />
              <Typography variant="body1">{'שם'}</Typography>
            </Box>
            <Typography variant="subtitle2" sx={{ pt: '8px' }}>
              {user?.name}
            </Typography>
          </Grid>
          <Grid item sm={2} xs={6}>
            <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
              <EmailIcon />
              <Typography variant="body1">{'מייל'}</Typography>
            </Box>
            <Typography variant="subtitle2" sx={{ pt: '8px' }}>
              {user?.email}
            </Typography>
          </Grid>
          <Grid item sm={2} xs={6}>
            <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
              <LocalPhoneIcon />
              <Typography variant="body1">{'טלפון'}</Typography>
            </Box>
            <Typography variant="subtitle2" sx={{ pt: '8px' }}>
              {user?.phone}
            </Typography>
          </Grid>
          <Grid item sm={2} xs={6}>
            <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
              <CreditCardIcon />
              <Typography variant="body1">{'אובליגו'}</Typography>
            </Box>
            <Typography variant="subtitle2" sx={{ pt: '8px' }}>
              {user?.maxCredit}
            </Typography>
          </Grid>
          <Grid item sm={2} xs={6}>
            <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
              <CreditCardIcon />
              <Typography variant="body1">{'יתרת חוב'}</Typography>
            </Box>
            <Typography variant="subtitle2" sx={{ pt: '8px' }}>
              {user?.maxCredit}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}

export default Info
