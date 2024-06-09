import React, { useState } from 'react'
import { useCart } from '../../../store/cart.store'
import { useModals } from '../../../provider/ModalProvider'
import { useAuth } from '../../../store/auth.store'
import { Box, Button, Paper, Typography } from '@mui/material'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import ArticleIcon from '@mui/icons-material/Article'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'
import { ExcelGeneratorIDocuments } from '../../../helpers/ExcelGenerator'
import hooks from '../../../hooks'
import { useMobile } from '../../../provider/MobileProvider'
import Utils from '../../../utils'
import { useDocumentStore } from '../../../store/document.store'
import { onErrorAlert, onSuccessAlert } from '../../../utils/MySweetAlert'
import { useNavigate, useParams } from 'react-router-dom'
import { DocumentsService } from '../../../services/document.service'
import Loader from '../../../utils/Loader'
import DoneAllIcon from '@mui/icons-material/DoneAll'

const Filter = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { user, agent } = useAuth()
  const { searchProducts, setSearchProducts } = useDocumentStore()
  const { isMobile } = useMobile()
  const { isAdmin, isAgent, isSuperAgent } = useAuth()
  const { cart, setCart } = useCart()
  const { handlePdfViwer } = useModals()
  const { data } = hooks.useDataDocumentsItem()
  const { documentItemType, id } = useParams()

  const handleResoreCart = async () => {
    try {
      setLoading(true)
      const res = await DocumentsService.RestoreCart(
        documentItemType!,
        user?.id!,
        id!
      )
      if (res) {
        setCart(res)
        navigate('/cart')
      }
      onSuccessAlert('שחזור בוצע בהצלחה', 'עודכן מחיר עדכני')
    } catch (e) {
      onErrorAlert('תקלה בשחזור נתונים', 'נסה שנית מאוחר יותר')
    } finally {
      setLoading(false)
    }
  }

  const handleApproveOrder = async () => {
    try {
      setLoading(true)
      if (agent?.id && id) {
        const response = await DocumentsService.ApproveOrder(+id, agent?.id)
        if (response.status === 'success') {
          onSuccessAlert('הזמנה אושרה בהצלחה', '')
        } else {
          onErrorAlert('שגיאה בשידור', '')
        }
      }
    } catch (e) {
      console.log('[ERROR]', e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {loading && <Loader />}
      <Paper
        elevation={isMobile ? 1 : 0}
        sx={{
          display: { sm: 'flex', xs: 'block' },
          justifyContent: 'space-between',
          padding: isMobile ? '12px' : '20px',
          margin: isMobile ? '0 16px' : '0px',
        }}
      >
        {!isMobile && (
          <Typography variant="h5" fontWeight={600}>
            מוצרי מסמכים
          </Typography>
        )}

        <Box sx={{ display: isMobile ? 'block' : 'flex', gap: '10px' }}>
          <Utils.SearchInput
            placeholder="חיפוש..."
            value={searchProducts}
            setValue={setSearchProducts}
            sx={{ margin: '10px 0', '& input': { padding: '0px 15px' } }}
          />

          <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {data && (
              <Button
                sx={{ height: '40px' }}
                variant="outlined"
                startIcon={<ArticleIcon sx={{ fontSize: '30px' }} />}
                onClick={() => ExcelGeneratorIDocuments(data)}
              >
                XL
              </Button>
            )}
            <Button
              sx={{ height: '40px', whiteSpace: 'nowrap' }}
              variant="contained"
              startIcon={<ShoppingCartCheckoutIcon sx={{ fontSize: '30px' }} />}
              onClick={() => handleResoreCart()}
            >
              שחזר הזמנה
            </Button>
            {(isAgent || isAdmin || isSuperAgent) &&
              data?.documentType === 'approve' && (
                <Button
                  sx={{ height: '40px', whiteSpace: 'nowrap' }}
                  variant="outlined"
                  startIcon={<DoneAllIcon sx={{ fontSize: '30px' }} />}
                  onClick={() => handleApproveOrder()}
                >
                  אשר הזמנה
                </Button>
              )}
          </Box>
        </Box>
      </Paper>
      <Box sx={{ padding: '10px 20px' }}>
        {data?.files['hydra:member']?.map((file, index) => (
          <Button
            key={index}
            onClick={() => handlePdfViwer(file.base64)}
            sx={{ height: '40px' }}
            variant="outlined"
            startIcon={<PictureAsPdfIcon sx={{ fontSize: '30px' }} />}
          >
            {file.name}
          </Button>
        ))}
      </Box>
    </>
  )
}

export default Filter
