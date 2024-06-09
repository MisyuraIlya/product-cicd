import React from 'react'
import StorefrontIcon from '@mui/icons-material/Storefront'
import { IconButton, Tooltip } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { URLS } from '../../../enums/urls'
import { useAuth } from '../../../store/auth.store'

const ClientsButton = () => {
  const navigate = useNavigate()
  const { agent } = useAuth()
  return (
    <IconButton
      onClick={() => navigate(`${URLS.AGENT_CLIENTS.LINK}/${agent?.id}?page=1`)}
      sx={{
        height: '50px',
        width: '50px',
        border: '1px solid #E0E0E0',
      }}
    >
      <Tooltip title={'לקוחות'}>
        <StorefrontIcon />
      </Tooltip>
    </IconButton>
  )
}

export default ClientsButton
