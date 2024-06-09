import React from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Typography,
} from '@mui/material'
import 'react-loading-skeleton/dist/skeleton.css'
import Loader from '../../../utils/Loader'
import { useParams } from 'react-router-dom'
import Card from './Card'
import hooks from '../../../hooks'
type RouteParams = {
  userRole: ROLE_TYPES
}

const List = () => {
  const { userRole } = useParams<RouteParams>()
  const { data, isLoading } = hooks.admin.useDataUsers()
  const isUser = userRole === 'ROLE_USER'
  const isAgent = userRole === 'ROLE_AGENT'

  return (
    <TableContainer component={Paper}>
      {isLoading && <Loader />}
      <Table>
        <TableHead>
          <TableCell></TableCell>
          <TableCell>
            <Typography variant="subtitle2">מס'</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="subtitle2">
              {isUser ? 'לקוח' : 'סוכן'}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="subtitle2">סטאטוס</Typography>
          </TableCell>
          <TableCell></TableCell>
          {isAgent && (
            <TableCell>
              <Typography variant="subtitle2">מאסטר</Typography>
            </TableCell>
          )}
        </TableHead>
        {data?.['hydra:member']?.map((element, index) => {
          return (
            <TableBody key={index}>
              <Card element={element} index={index} />
            </TableBody>
          )
        })}
      </Table>
    </TableContainer>
  )
}

export default List
