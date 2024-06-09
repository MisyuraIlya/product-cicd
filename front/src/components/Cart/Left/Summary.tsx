import React, { useEffect, useState } from 'react'
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Container,
  Box,
  Button,
  TextField,
  CircularProgress,
} from '@mui/material'
import { useCart } from '../../../store/cart.store'
import { themeColors } from '../../../styles/mui'
import { useModals } from '../../../provider/ModalProvider'
import { useAuth } from '../../../store/auth.store'
import CartServices from '../../../services/cart.services'
import PriceCalculator from '../../../helpers/PriceClass'
import hooks from '../../../hooks'

const Summary = () => {
  const { user, agent } = useAuth()
  const [loading, setLoading] = useState(false)
  const [tax, setTax] = useState(0)
  const { mutate } = hooks.useDataNotificationUser()
  const { selectedMode, cart, comment, setComment, sendOrder } = useCart()

  const { openPopUpPay, setOpenPopUpPay } = useModals()

  const handlePay = () => {
    setOpenPopUpPay(true)
  }

  const handleSendOrder = () => {
    try {
      setLoading(true)
      if (user) {
        sendOrder(user, agent, user.discount ?? 0)
        setTimeout(() => {
          mutate()
        }, 1000)
      }
    } catch (e) {
      console.log('[ERROR]', e)
    } finally {
      setLoading(false)
    }
  }

  const checkCart = async () => {
    if (user && cart.length > 0) {
      try {
        setLoading(true)
        const response = await CartServices.CheckCart(user, cart)
        setTax(response.data.maam)
      } catch (e) {
        console.log('error', e)
      } finally {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    checkCart()
  }, [])

  const priceCalculator = new PriceCalculator(
    tax,
    user,
    cart,
    settings.deliveryPrice,
    settings.minimumPrice
  )

  return (
    <Container sx={{ position: 'relative', height: '100%' }}>
      {loading ? (
        <Box sx={{ position: 'absolute', top: '35%', left: '50%' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" fontWeight={400} fontSize={24}>
              {'פרטי מסמך'}
            </Typography>
          </Box>
          <List>
            <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body1" color={themeColors.primary}>
                כמות שורות
              </Typography>
              <Typography variant="body1" color={themeColors.primary}>
                {cart.length}
              </Typography>
            </ListItem>
            <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography
                variant="body1"
                color={themeColors.primary}
              >{`סה"כ לפני מע"מ`}</Typography>
              <Typography variant="body1" color={themeColors.primary}>
                {priceCalculator.getTotalPriceBeforeTax()?.toFixed(2)} ₪
              </Typography>
            </ListItem>
            <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography
                variant="body1"
                color={themeColors.primary}
              >{`דמי משלוח`}</Typography>
              <Typography variant="body1" color={themeColors.primary}>
                {settings?.deliveryPrice} ₪
              </Typography>
            </ListItem>
            <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography
                variant="body1"
                color={themeColors.primary}
              >{`חייב במע״מ`}</Typography>
              <Typography variant="body1" color={themeColors.primary}>
                {priceCalculator.getTaxedPrice()?.toFixed(2)} ₪
              </Typography>
            </ListItem>
            <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography
                variant="body1"
                color={themeColors.primary}
              >{`מחיר אחרי מע״מ`}</Typography>
              <Typography variant="body1" color={themeColors.primary}>
                {priceCalculator.getTotalPriceAfterTax()?.toFixed(2)} ₪
              </Typography>
            </ListItem>
            <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body1" color={themeColors.primary}>
                {'מחיר לתשלום'}
              </Typography>
              <Typography
                variant="h6"
                fontWeight={900}
                color={themeColors.primary}
              >
                {priceCalculator.getFinalPrice()?.toFixed(2)} ₪
              </Typography>
            </ListItem>
          </List>

          {selectedMode.value === 'quote' && (
            <List>
              <ListItem>
                <ListItemText primary={`ללא אישור מנהל`} />
              </ListItem>
            </List>
          )}

          {settings?.minimumPrice > 0 &&
          selectedMode.value === 'order' &&
          priceCalculator.getCountFromMinimumPirce() > 0 ? (
            <Typography
              color={themeColors.primary}
              sx={{ textAlign: 'center', padding: '10px 0px' }}
            >
              {'עליך לצבור עוד ' +
                priceCalculator.getCountFromMinimumPirce()?.toFixed(2) +
                ' ש"ח עד למינימום הזמנה'}
            </Typography>
          ) : null}

          <Box sx={{ margin: '0px', padding: '0 30px' }}>
            <TextField
              label="הערה למשלוח"
              placeholder="הערה למשלוח"
              rows={4}
              fullWidth
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Box>
          <Box sx={{ justifyContent: 'center', display: 'flex' }}>
            <Button
              onClick={handleSendOrder}
              variant="contained"
              sx={{
                borderRadius: '20px',
                fontSize: '18px',
                marginTop: '20px',
                minWidth: '150px',
                padding: '12px 24px',
              }}
            >
              {'שלח'}
            </Button>
          </Box>
          <Box sx={{ justifyContent: 'center', display: 'flex' }}>
            <Button
              onClick={handlePay}
              variant="contained"
              sx={{
                borderRadius: '20px',
                fontSize: '18px',
                marginTop: '20px',
                minWidth: '150px',
                padding: '12px 24px',
              }}
            >
              {'שלם'}
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  )
}

export default Summary
