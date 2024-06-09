import React from 'react'
import { useAuth } from '../store/auth.store'
import { Box, Container } from '@mui/material'
import Home from '../components/Home'
import hooks from '../hooks'

const HomePage = () => {
  const { user } = useAuth()

  const { data: specialCatalog, isLoading: specialLoading } =
    hooks.useDataCatalog('', 'special')
  const { data: newCatalog, isLoading: newLoading } = hooks.useDataCatalog(
    '',
    'new'
  )
  return (
    <Box>
      <Box>
        <Home.Video />
      </Box>
      <Container maxWidth="xl" sx={{ marginBottom: '200px' }}>
        <Box sx={{ marginTop: '50px' }}>
          <Home.Categories />
        </Box>
        <Box sx={{ marginTop: '120px' }}>
          {specialCatalog?.['hydra:member'] && (
            <Home.Products
              title={'מוצרים חדשים'}
              array={specialCatalog?.['hydra:member']}
              toShow={5}
              column={1}
              link="/client/new/1/0/0?page=1"
              loading={specialLoading}
            />
          )}
        </Box>
        <Box sx={{ marginTop: '120px' }}>
          {newCatalog?.['hydra:member'] && (
            <Home.Products
              title={'מוצרים מיוחדים'}
              array={newCatalog?.['hydra:member']}
              toShow={5}
              column={1}
              link="/client/special/1/0/0?page=1"
              loading={newLoading}
            />
          )}
        </Box>
      </Container>
    </Box>
  )
}

export default HomePage
