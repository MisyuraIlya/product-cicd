import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material'
import BreadCrumbsUtil from '../utils/BreadCrumbsUtil'
import hooks from '../hooks'

const CatalogView = () => {
  const { data } = hooks.useDataCategories()
  const { lvl1 } = useParams()
  const navigate = useNavigate()
  return (
    <Container maxWidth="lg" sx={{ marginBottom: '200px' }}>
      <BreadCrumbsUtil array={[{ title: 'קטגוריות', link: '' }]} />
      <Grid container spacing={2}>
        {data?.['hydra:member']?.map((element: ICategory, index) => {
          if (element?.parent?.id == lvl1) {
            return (
              <Grid item sm={3} xs={6} key={index}>
                <Card
                  elevation={0}
                  sx={{ cursor: 'pointer', height: '200px' }}
                  onClick={() =>
                    navigate(`/client/catalog/${element.id}/0/0?page=1`)
                  }
                >
                  <CardMedia
                    component="img"
                    sx={{
                      width: '200px',
                      objectFit: 'contain',
                      transition: 'transform 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.1)',
                      },
                    }}
                    src={
                      element?.MediaObject?.filePath
                        ? `${process.env.REACT_APP_MEDIA}/category/${element?.MediaObject?.filePath}`
                        : `${process.env.REACT_APP_MEDIA}/placeholder.jpg`
                    }
                  />
                  <CardContent>
                    <Typography variant="h5">{element?.title}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            )
          }
        })}
      </Grid>
    </Container>
  )
}

export default CatalogView
