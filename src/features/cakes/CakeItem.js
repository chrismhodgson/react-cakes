import * as React from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Card, CardMedia, CardContent, CardActions, Typography } from '@mui/material';
import { selectCakeById, deleteCake } from './cakesSlice';

export default function CakeItem(props) {
  const id = props.match.params.id
  const cake = useSelector(selectCakeById(id))
  const dispatch = useDispatch()
  const del = () => {
    dispatch(deleteCake(id))
    props.history.push("/")
  }

  if (!cake) {
    return <Box>Cake not found. <Link to="/">Please return to list of cakes!</Link></Box>
  }
  if (cake.deleted) {
    return <Box>Cake deleted. <Link to="/">Please return to list of cakes!</Link></Box>
  }

  return (
    <Card >
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
