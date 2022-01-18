import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Card, CardMedia, CardContent, CardActions, Typography } from '@mui/material';
import { selectCakeById, deleteCake } from './cakesSlice';
import Error from '../../components/Error';
import Loading from '../../components/Loading';

export default function CakeItem(props) {
  const id = props.match.params.id
  const [deleted, setDeleted] = useState(false);
  const dispatch = useDispatch()
  const del = () => {
    dispatch(deleteCake(id))
    setDeleted(true)
  }
  const cake = useSelector(selectCakeById(id))
  const cakes = useSelector(state => state.cakes)

  if (cakes.status === 'loading') return <Loading />

  if (cakes.status === 'failed') {
    return <Error error={`Oops, there was a problem deleting the cake - "${cakes.error}"`} />
  }
  if (!cake) {
    return <Box>Cake {deleted ? 'deleted' : 'not found'}. <Link to="/">Please return to list of cakes!</Link></Box>
  }

  return (
    <Card >
      <Typography gutterBottom variant="h5">Cake Details</Typography>

      <CardMedia
        component="img"
        image={cake.imageUrl}
        alt={cake.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {cake.name}
        </Typography>
        <Typography gutterBottom variant="body1" color="text.secondary">
          Yum factor: {cake.yumFactor}
        </Typography>
        <Typography gutterBottom variant="body2" color="text.secondary">
          {cake.comments}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={del} size="small">Delete Cake</Button>
      </CardActions>
    </Card>
  );
}
