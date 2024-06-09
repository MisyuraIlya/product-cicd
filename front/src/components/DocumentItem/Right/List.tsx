import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Skeleton,
} from '@mui/material'
import { numberWithCommas } from '../../../helpers/numberWithCommas'
import { useModals } from '../../../provider/ModalProvider'
import { themeColors } from '../../../styles/mui'
import hooks from '../../../hooks'
import { useDocumentStore } from '../../../store/document.store'

const List = () => {
  const { selectProduct } = useModals()
  const { searchProducts } = useDocumentStore()
  const { data, isLoading } = hooks.useDataDocumentsItem()

  const filteredProducts = data?.products['hydra:member']?.filter(
    (element) =>
      element?.title?.toLowerCase().includes(searchProducts.toLowerCase()) ||
      element?.sku?.toLowerCase().includes(searchProducts.toLowerCase())
  )

  return (
    <Box sx={{ marginTop: '30px' }}>
      {isLoading &&
        Array.from({ length: 24 }).map((_, index) => (
          <Skeleton
            variant="rounded"
            key={index}
            height={70}
            sx={{ margin: '5px 20px' }}
          />
        ))}
      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography
                  variant="body2"
                  color={themeColors.primary}
                  fontWeight={800}
                >
                  מוצר
                </Typography>
              </TableCell>
              <TableCell sx={{ minWidth: '150px' }}></TableCell>
              <TableCell>
                <Typography
                  variant="body2"
                  color={themeColors.primary}
                  fontWeight={800}
                >
                  כמות
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body2"
                  color={themeColors.primary}
                  fontWeight={800}
                >
                  מחיר יח'
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body2"
                  color={themeColors.primary}
                  fontWeight={800}
                >
                  הנחה
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body2"
                  color={themeColors.primary}
                  fontWeight={800}
                >
                  סה״כ
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts?.map((element, index) => (
              <TableRow
                key={index}
                onClick={() => selectProduct(element?.product)}
              >
                <TableCell>
                  <img
                    width={100}
                    src={
                      element?.product?.defaultImagePath
                        ? process.env.REACT_APP_MEDIA +
                          '/product/' +
                          element?.product?.defaultImagePath
                        : process.env.REACT_APP_MEDIA + '/placeholder.jpg'
                    }
                    alt=""
                  />
                </TableCell>
                <TableCell>
                  <Typography>{'#' + element?.sku}</Typography>
                  <Typography>{element?.title}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{element?.quantity}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{element?.priceByOne}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{element?.discount?.toFixed(1) + '%'}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {numberWithCommas(element?.total?.toFixed(1))}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box className="centered">
        {filteredProducts?.length === 0 && !isLoading && (
          <Typography variant="h6">לא נמצאו פריטים למסמך זה</Typography>
        )}
      </Box>
    </Box>
  )
}

export default List
