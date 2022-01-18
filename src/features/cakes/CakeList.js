import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import { Box, ImageList, ImageListItem, Typography, Button } from '@mui/material';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import { fetchCakes } from './cakesSlice';

export default function CakeList() {
  const cakes = useSelector(state => state.cakes)
  const [page, setPage] = useState(0);
  const dispatch = useDispatch()

  const handlePrevious = () => {
    setPage(Math.max(0, page-1))
    dispatch(fetchCakes(page))
  }
  const handleNext = () => {
    const next = page+1
    setPage(next)
    dispatch(fetchCakes(next))
  }

  if (cakes.status === 'loading') return <Loading />

  if (cakes.status === 'failed') {
    return <Error error={`Oops, there was a problem retrieving the list of cakes - "${cakes.error}"`} />
  }
  if (!cakes?.items || cakes?.items.length === 0) {
    return <Box>No cakes found. <Link to={`/add`}>Add a cake</Link></Box>
  }

  return (
    <>
      <Typography gutterBottom variant="h5">Cakes List</Typography>

      <Link to={`/add`}>New Cake</Link>

      <ImageList variant="masonry" cols={3} gap={8}>
        {cakes.items.map(item => (
          <Link key={item._id} to={`/view/${item._id}`}>
            <ImageListItem><img
              src={`${item.imageUrl}?w=248&fit=crop&auto=format`}
              srcSet={`${item.imageUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.name}
              loading="lazy"
            /></ImageListItem>
          </Link>
        ))}
      </ImageList>

      <Box sx={{ mb: 2 }}>
        <Button onClick={handlePrevious} variant="outlined" disabled={page <= 0} sx={{ mr: 1 }}>Previous</Button>
        <Button onClick={handleNext} variant="outlined" disabled={page+1 >= cakes.pages} sx={{ mr: 2 }}>Next</Button>
      </Box>
      <Typography>{page+1} of {cakes.pages} pages</Typography>
  </>
  );
}