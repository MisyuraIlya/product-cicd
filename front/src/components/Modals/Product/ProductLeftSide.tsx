import React from 'react'
import { useSelectedProduct } from '../../../store/selecterdProduct.store'
import { Box, Divider, Grid, IconButton, Typography, Link } from '@mui/material'
import PriceBlockPopUp from './PriceBlockPopUp'
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined'
import { useCart } from '../../../store/cart.store'
import { useMobile } from '../../../provider/MobileProvider'

const ProductLeftSide = () => {
  const { selectedProd } = useSelectedProduct()
  const { isMobile } = useMobile()
  const { getCartItem } = useCart()
  const inCart = getCartItem(selectedProd)
  return (
    <Box>
      <Typography variant="h5">{selectedProd?.title}</Typography>
      {selectedProd?.sku && (
        <Grid container sx={{ margin: '20px 0px' }}>
          <Grid item xs={4}>
            <Typography variant="body1">{'מספר קטלוגי'}</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1">{selectedProd?.sku}</Typography>
          </Grid>
        </Grid>
      )}
      {selectedProd?.link && (
        <Grid container sx={{ margin: '20px 0px' }}>
          <Grid item xs={4}>
            <Typography variant="body1">{selectedProd?.linkTitle}</Typography>
          </Grid>
          <Grid item xs={8}>
            <Link
              href={selectedProd?.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconButton>
                <InsertLinkOutlinedIcon />
              </IconButton>
            </Link>
          </Grid>
        </Grid>
      )}
      {selectedProd?.packQuantity && (
        <Grid container sx={{ margin: '20px 0px' }}>
          <Grid item xs={4}>
            <Typography variant="body1">{'יחידות במארז'}</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1">
              {selectedProd?.packQuantity}
            </Typography>
          </Grid>
        </Grid>
      )}
      <Divider />
      <Grid container sx={{ margin: '20px 0px' }}>
        <Grid item xs={4}>
          <Typography variant="body1">{"מחיר יח'"}</Typography>
        </Grid>
        <Grid
          item
          xs={8}
          sx={{ display: 'flex', gap: '10px', alignItems: 'end' }}
        >
          <Typography variant="h5" lineHeight={'25px'}>
            ₪{selectedProd?.finalPrice}
          </Typography>
          {selectedProd?.finalPrice < selectedProd?.basePrice && (
            <Typography variant="body2" sx={{ textDecoration: 'line-through' }}>
              ₪{selectedProd?.basePrice}
            </Typography>
          )}
        </Grid>
      </Grid>
      <Divider />
      <Box
        sx={{
          display: isMobile ? 'block' : 'flex',
          justifyContent: 'space-between',
          marginTop: '50px',
        }}
      >
        <Box sx={{ display: 'flex', gap: '100px', alignItems: 'center' }}>
          {inCart?.total > 0 && (
            <>
              <Typography variant="subtitle1" sx={{ color: '#2196F3' }}>
                סה״כ להזמנה
              </Typography>
              <Typography variant="h5">₪{inCart?.total}</Typography>
            </>
          )}
        </Box>
        <Box
          sx={{
            width: { sm: '50%', xs: '100%' },
            paddingTop: { sm: '0px', xs: '30px' },
          }}
        >
          <PriceBlockPopUp product={selectedProd} />
        </Box>
      </Box>
    </Box>
  )
}

export default ProductLeftSide
