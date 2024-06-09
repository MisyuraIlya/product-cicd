import React from 'react'
import {
  Container,
  Grid,
  Typography,
  TextField,
  TextareaAutosize,
  Button,
  List,
  ListItem,
  Box,
  ListItemIcon,
  ListItemText,
  FormControl,
} from '@mui/material'
import { themeColors, colors } from '../../styles/mui'
import { useForm, Controller } from 'react-hook-form'
import BusinessIcon from '@mui/icons-material/Business'
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import { useMobile } from '../../provider/MobileProvider'

type form = {
  firstName: string
  lastName: string
  phone: string
  email: string
  description: string
}

const Footer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<form>()

  const { isMobile } = useMobile()

  return (
    <Box
      sx={{
        backgroundColor: themeColors.primary,
        padding: isMobile ? '16px' : '40px 100px',
      }}
      component={'footer'}
    >
      <Box sx={{ minHeight: '400px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                color: 'white',
                bgcolor: colors.alpha.white[5],
                padding: '24px',
                mb: '0px',
              }}
            >
              <Typography variant="h5">יש לכם שאלות? תצרו איתנו קשר</Typography>
              <Box sx={{ display: 'flex', gap: '10px' }}>
                <FormControl fullWidth margin="normal">
                  <Controller
                    name="firstName"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: 'שם שדה חובה',
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="standard"
                        label="שם מלא"
                        placeholder="שם מלא"
                        type="text"
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                        sx={{
                          color: 'white',
                          '& .MuiInput-underline:before': {
                            borderBottomColor: 'white',
                          },
                          '& .MuiInput-underline:hover:before': {
                            borderBottomColor: 'white',
                          },
                          '& .MuiInputBase-input': {
                            color: 'white',
                          },
                        }}
                        InputLabelProps={{ style: { color: 'white' } }}
                      />
                    )}
                  />
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <Controller
                    name="lastName"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: 'מספר טלפון לקוח שדה חובה',
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="standard"
                        label="מספר טלפון"
                        placeholder="מספר טלפון"
                        type="text"
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                        sx={{
                          color: 'white',
                          '& .MuiInput-underline:before': {
                            borderBottomColor: 'white',
                          },
                          '& .MuiInput-underline:hover:before': {
                            borderBottomColor: 'white',
                          },
                          '& .MuiInputBase-input': {
                            color: 'white',
                          },
                        }}
                        InputLabelProps={{ style: { color: 'white' } }}
                      />
                    )}
                  />
                </FormControl>
              </Box>
              <Box sx={{ display: 'flex', gap: '10px' }}>
                <FormControl fullWidth margin="normal">
                  <Controller
                    name="firstName"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: 'מייל שדה חובה',
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="standard"
                        label="מייל"
                        placeholder="מייל"
                        type="text"
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                        sx={{
                          color: 'white',
                          '& .MuiInput-underline:before': {
                            borderBottomColor: 'white',
                          },
                          '& .MuiInput-underline:hover:before': {
                            borderBottomColor: 'white',
                          },
                          '& .MuiInputBase-input': {
                            color: 'white',
                          },
                        }}
                        InputLabelProps={{ style: { color: 'white' } }}
                      />
                    )}
                  />
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <Controller
                    name="lastName"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: 'מספר לקוח שדה חובה',
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="standard"
                        label="מספר לקוח פנימי*"
                        placeholder="הכנס את המספר שלך"
                        type="text"
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                        sx={{
                          color: 'white',
                          '& .MuiInput-underline:before': {
                            borderBottomColor: 'white',
                          },
                          '& .MuiInput-underline:hover:before': {
                            borderBottomColor: 'white',
                          },
                          '& .MuiInputBase-input': {
                            color: 'white',
                          },
                        }}
                        InputLabelProps={{ style: { color: 'white' } }}
                      />
                    )}
                  />
                </FormControl>
              </Box>
              <FormControl fullWidth margin="normal">
                <Controller
                  name="firstName"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: 'מספר לקוח שדה חובה',
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="standard"
                      label="הודעה"
                      placeholder="הודעה"
                      multiline
                      rows={5}
                      type="text"
                      error={!!errors.firstName}
                      helperText={errors.firstName?.message}
                      sx={{
                        color: 'white',
                        '& .MuiInput-underline:before': {
                          borderBottomColor: 'white',
                        },
                        '& .MuiInput-underline:hover:before': {
                          borderBottomColor: 'white',
                        },
                        '& .MuiInputBase-input': {
                          color: 'white',
                        },
                      }}
                      InputLabelProps={{ style: { color: 'white' } }}
                    />
                  )}
                />
              </FormControl>
              <Button
                variant="contained"
                sx={{
                  background: 'white',
                  color: themeColors.primary,
                  width: '150px',
                  mt: '24px',
                }}
              >
                שלח
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <img
              src={`${process.env.REACT_APP_MEDIA}/logo.png`}
              alt=""
              style={{ width: '120px' }}
            />
            <Box
              sx={{ maxWidth: isMobile ? '100%' : '70%', paddingTop: '40px' }}
            >
              <Typography
                variant="body2"
                color={'#FFFFFF99'}
                sx={{ paddingTop: '10px' }}
              >
                {settings?.footerDescription1}
              </Typography>
              <Typography
                variant="body2"
                color={'#FFFFFF99'}
                sx={{ paddingTop: '10px' }}
              >
                {settings?.footerDescription2}
              </Typography>
              <Typography
                variant="body2"
                color={'#FFFFFF99'}
                sx={{ paddingTop: '10px' }}
              >
                {settings?.footerDescription3}
              </Typography>
            </Box>
            <Grid
              container
              sx={{ maxWidth: '70%', paddingTop: '24px' }}
              spacing={'8px'}
            >
              <Grid item xs={isMobile ? 2 : 1}>
                <Typography variant="body2" color={'#FFFFFF99'}>
                  כתובת
                </Typography>
              </Grid>
              <Grid item xs={isMobile ? 10 : 11}>
                <Typography variant="body2" color={'white'}>
                  {settings?.location}
                </Typography>
              </Grid>
              <Grid item xs={isMobile ? 2 : 1}>
                <Typography variant="body2" color={'#FFFFFF99'}>
                  טלפון
                </Typography>
              </Grid>
              <Grid item xs={isMobile ? 10 : 11}>
                <Typography variant="body2" color={'white'}>
                  {settings?.phone}
                </Typography>
              </Grid>
              <Grid item xs={isMobile ? 2 : 1}>
                <Typography variant="body2" color={'#FFFFFF99'}>
                  מייל
                </Typography>
              </Grid>
              <Grid item xs={isMobile ? 10 : 11}>
                <Typography variant="body2" color={'white'}>
                  {settings?.email}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          color: 'white',
          paddingTop: '40px',
          marginBottom: isMobile ? '100px' : '0px',
        }}
      >
        <Box sx={{ display: 'flex', gap: '36px' }}>
          <Typography sx={{ textDecoration: 'underline' }}>
            הצהרת נגישות
          </Typography>
          <Typography sx={{ textDecoration: 'underline' }}>תקנון</Typography>
        </Box>
        <Box>
          <Typography>Digitrade</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Footer
