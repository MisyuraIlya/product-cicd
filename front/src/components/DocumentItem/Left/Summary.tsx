import React from 'react'
import { Typography, List, ListItem, Paper, Box } from '@mui/material'
import { themeColors } from '../../../styles/mui'
import hooks from '../../../hooks'
import { useMobile } from '../../../provider/MobileProvider'

const Summary = () => {
  const { isMobile } = useMobile()
  const { data } = hooks.useDataDocumentsItem()
  const totalTax = data?.totalTax ?? 0
  const totalPriceAfterTax = data?.totalPriceAfterTax ?? 0
  const totalAfterDiscount = data?.totalAfterDiscount ?? 0
  const totalPrecent = data?.totalPrecent ?? 0
  const itemsLength = data?.products['hydra:totalItems'] ?? 0
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'end',
        margin: isMobile ? '20px 20px 100px 20px' : '0 20px 100px 0',
      }}
    >
      <Paper
        elevation={isMobile ? 1 : 0}
        sx={{
          width: '100%',
          padding: '0 40px',
        }}
      >
        <Typography
          sx={{ paddingTop: '20px', paddingLeft: '15px', textAlign: 'center' }}
          fontWeight={800}
          variant="h5"
        >
          סיכום
        </Typography>
        <List>
          <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography color={themeColors.primary}>כמות שורות</Typography>
            <Typography color={themeColors.primary}>{itemsLength}</Typography>
          </ListItem>
          <ListItem
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography color={themeColors.primary}>סה״כ</Typography>
            <Typography color={themeColors.primary}>
              {totalPriceAfterTax?.toFixed(2) ?? '0'} ₪
            </Typography>
          </ListItem>
          <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography color={themeColors.primary}>הנחה כללית</Typography>
            <Typography color={themeColors.primary}>
              {totalPrecent !== undefined ? totalPrecent + '%' : ''}
            </Typography>
          </ListItem>
          <ListItem
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography color={themeColors.primary}>אחרי הנחה</Typography>
            <Typography color={themeColors.primary}>
              {totalAfterDiscount?.toFixed(2) ?? '0'} ₪
            </Typography>
          </ListItem>
          <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography color={themeColors.primary}>מע״מ</Typography>
            <Typography color={themeColors.primary}>
              {totalTax?.toFixed(2) ?? '0'} ₪
            </Typography>
          </ListItem>
          <ListItem
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography color={themeColors.primary}>לתשלום</Typography>
            <Typography color={themeColors.primary}>
              {(totalPriceAfterTax + totalTax)?.toFixed(2) ?? '0'} ₪
            </Typography>
          </ListItem>
        </List>
      </Paper>
    </Box>
  )
}

export default Summary
