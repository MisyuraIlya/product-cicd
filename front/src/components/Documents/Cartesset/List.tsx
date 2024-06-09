import React from 'react'
import { themeColors } from '../../../styles/mui'
import {
  Box,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import moment from 'moment'
import hooks from '../../../hooks'

const List = () => {
  const { data, isLoading } = hooks.useDataCartesset()
  return (
    <Box sx={{ margin: '50px 0px' }}>
      {data?.lines?.['hydra:member'].length === 0 && !isLoading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img src={`${process.env.REACT_APP_MEDIA}/empyDocument.svg`} />
        </Box>
      ) : null}
      {isLoading &&
        Array.from({ length: 12 }).map((_, index) => (
          <Skeleton
            variant="rounded"
            key={index}
            height={50}
            sx={{ margin: '5px 0' }}
          />
        ))}
      {(data?.lines?.['hydra:member'] ?? []).length > 0 ? (
        <TableContainer component={Paper}>
          <Table className="lines-sub-cont">
            <TableHead>
              <TableRow className="heading">
                <TableCell className="col-cont sticky-col">
                  <Typography
                    variant="body2"
                    color={themeColors.primary}
                    fontWeight={800}
                    sx={{ minWidth: '80px' }}
                  >
                    ת. למאזן
                  </Typography>
                </TableCell>
                <TableCell className="col-cont sticky-col">
                  <Typography
                    variant="body2"
                    color={themeColors.primary}
                    fontWeight={800}
                  >
                    תנועה
                  </Typography>
                </TableCell>
                <TableCell className="col-cont">
                  <Typography
                    variant="body2"
                    color={themeColors.primary}
                    fontWeight={800}
                  >
                    ת.אסמכתא
                  </Typography>
                </TableCell>
                <TableCell className="col-cont">
                  <Typography
                    variant="body2"
                    color={themeColors.primary}
                    fontWeight={800}
                    sx={{ minWidth: '80px' }}
                  >
                    ת.ערך
                  </Typography>
                </TableCell>
                <TableCell className="col-cont">
                  <Typography
                    variant="body2"
                    color={themeColors.primary}
                    fontWeight={800}
                  >
                    אסמכתא
                  </Typography>
                </TableCell>
                <TableCell className="col-cont">
                  <Typography
                    variant="body2"
                    color={themeColors.primary}
                    fontWeight={800}
                  >
                    פרטים
                  </Typography>
                </TableCell>
                <TableCell className="col-cont">
                  <Typography
                    variant="body2"
                    color={themeColors.primary}
                    fontWeight={800}
                  >
                    חובה/זכות
                  </Typography>
                </TableCell>
                <TableCell className="col-cont">
                  <Typography
                    variant="body2"
                    color={themeColors.primary}
                    fontWeight={800}
                  >
                    יתרה
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!isLoading &&
                data?.lines?.['hydra:member']?.map((element, index) => {
                  return (
                    <TableRow key={index} className={'item'}>
                      <TableCell>
                        <Typography variant="body2">
                          {moment(element?.createdAt).format('DD-MM-YYYY')}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{element?.tnua}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {element?.asmahta1}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {moment(element?.dateEreh).format('DD-MM-YYYY')}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {element?.description}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{element?.hova}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{element?.zhut}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {element?.yetra ? element.yetra : ''}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
    </Box>
  )
}

export default List
