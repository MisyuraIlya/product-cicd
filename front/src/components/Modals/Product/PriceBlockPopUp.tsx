import React, { FC } from 'react'
import { useAuth } from '../../../store/auth.store'
import { useCart } from '../../../store/cart.store'
import AddToCart from '../../AddToCart'
import { Typography, Grid, Box, TextField } from '@mui/material'

type PriceBlockProps = {
  product: IProduct
}

const PriceBlockPopUp: FC<PriceBlockProps> = ({ product }) => {
  const { user, isAgent } = useAuth()
  const {
    getCartItem,
    selectedMode,
    changePrice,
    changeDiscount,
    changeSum,
    addToCart,
  } = useCart()

  const inCart = getCartItem(product)

  const handleChangePrice = (value: number) => {
    if (!inCart) {
      addToCart(product)
    }
    const itemCart = getCartItem(product)
    changePrice(itemCart!, value)
  }

  const handleChangeDiscount = (value: number) => {
    if (!inCart) {
      addToCart(product)
    }
    const itemCart = getCartItem(product)
    changeDiscount(itemCart!, value)
  }

  const handleChangeSum = (value: number) => {
    if (!inCart) {
      addToCart(product)
    }
    const itemCart = getCartItem(product)
    changeSum(itemCart!, value)
  }
  return (
    <Box>
      {user && selectedMode ? (
        <Box sx={{ margin: '0 20px' }}>
          <Grid container spacing={4}>
            <Grid item xs={4} className="centered">
              <Box>
                <Typography variant="body1" sx={{ textAlign: 'center' }}>
                  {"מחיר יח'"}
                </Typography>
                {isAgent ? (
                  <Box sx={{ marginBottom: '10px' }}>
                    <TextField
                      value={inCart?.product.finalPrice ?? product.finalPrice}
                      onChange={(e) => handleChangePrice(+e.target.value)}
                      sx={{
                        '& input': {
                          textAlign: 'center',
                          padding: '5px 10px',
                          borderRadius: '5px',
                          backgroundColor: '#f3f5f9',
                        },
                      }}
                    />
                  </Box>
                ) : (
                  <Typography variant="body1" className="centered">
                    {inCart?.price}
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={4} className="centered">
              <Box>
                <Typography variant="body1" sx={{ textAlign: 'center' }}>
                  {'הנחה'}
                </Typography>
                {isAgent ? (
                  <Box sx={{ marginBottom: '10px' }}>
                    <TextField
                      value={
                        inCart?.discount?.toFixed(2) ??
                        product?.discount?.toFixed(2)
                      }
                      onChange={(e) => handleChangeDiscount(+e.target.value)}
                      sx={{
                        '& input': {
                          textAlign: 'center',
                          padding: '5px 10px',
                          borderRadius: '5px',
                          backgroundColor: '#f3f5f9',
                        },
                      }}
                    />
                  </Box>
                ) : (
                  <Typography variant="body1" className="centered">
                    {inCart?.discount}
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={4} className="centered">
              <Box>
                <Typography variant="body1" sx={{ textAlign: 'center' }}>
                  {'סה״כ'}
                </Typography>
                {isAgent ? (
                  <Box sx={{ marginBottom: '10px' }}>
                    <TextField
                      value={inCart?.price ?? product.finalPrice}
                      onChange={(e) => handleChangeSum(+e.target.value)}
                      sx={{
                        '& input': {
                          textAlign: 'center',
                          padding: '5px 10px',
                          borderRadius: '5px',
                          backgroundColor: '#f3f5f9',
                        },
                      }}
                    />
                  </Box>
                ) : (
                  <Typography variant="body1" className="centered">
                    {inCart?.price}₪
                  </Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      ) : null}

      {user && selectedMode ? <AddToCart item={product} /> : null}
      <Box sx={{ margin: '10px 20px' }}>
        <Grid container spacing={4}>
          <Grid item xs={6} className="centered">
            <Box>
              <Typography variant="body1" sx={{ textAlign: 'center' }}>
                {"יח' להזמנה"}
              </Typography>
              <Typography variant="body1" className="centered">
                {inCart?.quantity}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} className="centered">
            <Box>
              <Typography variant="body1" sx={{ textAlign: 'center' }}>
                {'סה״כ להזמנה'}
              </Typography>

              <Typography variant="body1" className="centered">
                ₪{inCart?.total}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default PriceBlockPopUp
