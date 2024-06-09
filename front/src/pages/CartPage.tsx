import React from 'react'
import { Box, Container, Grid } from '@mui/material'
import Cart from '../components/Cart'
import Utils from '../utils'

const CartPage = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={9}>
        <Box sx={{ mt: '20px', padding: '0 20px' }}>
          <Utils.BreadCrumbsUtil
            array={[
              {
                title: 'עגלה',
                link: '',
              },
            ]}
          />
        </Box>
        <Cart.Right.Options />
        <Cart.Right.List />
      </Grid>
      <Grid
        item
        xs={12}
        sm={3}
        sx={{
          position: {
            xs: { position: 'fixed' },
            sm: { position: 'relative' },
          },
          right: '0px',
          top: '0px',
          width: '100%',
          height: 'auto',
          minHeight: '100vh',
          boxShadow: '2px 3px 9px 2px #e0e0e0;',
        }}
      >
        <Box sx={{ position: 'sticky', top: '150px' }}>
          <Cart.Left.Summary />
        </Box>
      </Grid>
    </Grid>
  )
}

export default CartPage
