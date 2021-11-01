import * as React from 'react';
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import { Box, ImageList, ImageListItem } from '@mui/material';
import { selectCakes } from './cakesSlice'

export default function CakeList() {
  const cakes = useSelector(selectCakes)

  if (cakes.length === 0) return (
    <Box>No cakes found. <Link to={`/add`}>Add a cake</Link></Box>
  )

  return (
    <>
      <Link to={`/add`}>New Cake</Link>

      <ImageList variant="masonry" cols={3} gap={8}>
        {cakes.map(item => (
          <Link key={item.id} to={`/${item.id}`}>
            <ImageListItem><img
              src={`${item.imageUrl}?w=248&fit=crop&auto=format`}
              srcSet={`${item.imageUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.name}
              loading="lazy"
            /></ImageListItem>
          </Link>
        ))}
      </ImageList>
  </>
  );
}