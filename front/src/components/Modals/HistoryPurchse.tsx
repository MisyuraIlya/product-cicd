import React, { FC } from 'react'
import ModalWrapper from './ModalWrapper'
import { useSelectedProduct } from '../../store/selecterdProduct.store'
import moment from 'moment'
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { themeColors } from '../../styles/mui'
import hooks from '../../hooks'
import ArticleIcon from '@mui/icons-material/Article'
import { ExcelGeneratorIHistoryPurchse } from '../../helpers/ExcelGenerator'
import { useMobile } from '../../provider/MobileProvider'

type TablePopUpProps = {
  active: boolean
  setActive: (bool: boolean) => void
}

const HistoryPurchse: FC<TablePopUpProps> = ({ active, setActive }) => {
  const { selectedProd } = useSelectedProduct()
  const { data, isLoading } = hooks.useDataPurchesHistory(selectedProd.sku)
  const { isMobile } = useMobile()
  return (
    <ModalWrapper
      width={50}
      height={'80%'}
      active={active}
      setActive={setActive}
      component={
        <Box sx={{ display: isMobile ? 'block' : 'flex', gap: '20px' }}>
          <Box>
            <img
              src={`${process.env.REACT_APP_MEDIA}/product/${selectedProd.defaultImagePath}`}
              style={{ width: '90px', height: '90px' }}
            />
          </Box>
          <Box>
            <Typography variant="h5" fontWeight={800}>
              {'פירוט היסטוריית רכישה'}
            </Typography>
            <Typography variant="h6">{selectedProd?.title}</Typography>
            <Typography variant="h6">מק"ט {selectedProd?.sku}</Typography>
          </Box>
        </Box>
      }
    >
      <Box>
        <>
          {data && (
            <Button
              sx={{ height: '40px', margin: '10px 0' }}
              variant="outlined"
              startIcon={<ArticleIcon sx={{ fontSize: '30px' }} />}
              onClick={() => ExcelGeneratorIHistoryPurchse(data)}
            >
              XL
            </Button>
          )}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={themeColors.primary}
                      fontWeight={800}
                    >
                      {'מסמך'}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ minWidth: '150px' }}>
                    <Typography
                      variant="body2"
                      color={themeColors.primary}
                      fontWeight={800}
                    >
                      {'תאריך'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={themeColors.primary}
                      fontWeight={800}
                    >
                      {'כמות'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={themeColors.primary}
                      fontWeight={800}
                    >
                      {'מחיר'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={themeColors.primary}
                      fontWeight={800}
                    >
                      {'מחיר אחרי מע"מ'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={themeColors.primary}
                      fontWeight={800}
                    >
                      {'הנחה'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={themeColors.primary}
                      fontWeight={800}
                    >
                      {'סה"כ בתנועה'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={themeColors.primary}
                      fontWeight={800}
                    >
                      {'סה"כ בתנועה אחרי מע"מ'}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!isLoading &&
                  data?.['hydra:member']?.map((element, index) => (
                    <TableRow
                      key={index}
                      // onClick={() => selectProduct(element?.product)}
                    >
                      <TableCell>
                        <Typography>{element?.documentNumber}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>
                          {moment(element?.date).format('DD-MM-YYYY')}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{element?.quantity}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{element?.price}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{element?.vatPrice}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{element?.discount}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{element?.totalPrice}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{element?.vatTotal}</Typography>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          {isLoading && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '200px',
              }}
            >
              <CircularProgress />
            </Box>
          )}
          {data?.['hydra:member'].length === 0 && !isLoading && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: '50px',
              }}
            >
              <img src={`${process.env.REACT_APP_MEDIA}/empyDocument.svg`} />
            </Box>
          )}
        </>
      </Box>
    </ModalWrapper>
  )
}

export default HistoryPurchse
