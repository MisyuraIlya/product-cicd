import React from 'react'
import { useSelectedProduct } from '../../../store/selecterdProduct.store'
import AdditionalImages from './AdditionalImages'
import { useModals } from '../../../provider/ModalProvider'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined'
import { Box, IconButton } from '@mui/material'
import { useMobile } from '../../../provider/MobileProvider'

const ProductRightSide = () => {
  const { selectedProd } = useSelectedProduct()
  const { handleImageModal } = useModals()
  const { isMobile } = useMobile()
  const shareImage = () => {
    let message = 'שיתוף לינק לתמונה \n'
    message += 'מק״ט: ' + selectedProd.sku + '\n'
    message += 'מוצר: ' + selectedProd.title + '\n'
    message += 'לינק: '
    message += 'products/' + selectedProd.defaultImagePath
    window.open(
      'https://api.whatsapp.com/send?text=' + encodeURIComponent(message)
    )
  }

  const openLink = () => {
    let imageURL =
      'https://digitrade.com.ua/src/img3' +
      '/product/' +
      selectedProd.defaultImagePath
    window.open(imageURL, '_blank')
  }

  return (
    <>
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {selectedProd.defaultImagePath ? (
          <img
            style={{
              width: isMobile ? 'auto' : '100%',
              maxHeight: isMobile ? '100px' : '400px',
              objectFit: 'cover',
            }}
            src={`${process.env.REACT_APP_MEDIA}/product/${selectedProd.defaultImagePath}`}
            onClick={() =>
              handleImageModal(
                `${process.env.REACT_APP_MEDIA}/product/${selectedProd.defaultImagePath}`
              )
            }
          />
        ) : (
          <img src={`${process.env.REACT_APP_MEDIA}/placeholder.jpg`} />
        )}
      </Box>
      <Box>{selectedProd?.imagePath?.length > 1 && <AdditionalImages />}</Box>
    </>
  )
}

export default ProductRightSide
