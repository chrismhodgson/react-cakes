import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCakes } from '../features/cakes/cakesSlice';
import { Link } from "react-router-dom";
import { Typography, Container} from '@mui/material';

export default function Wrapper(props) {
  const dispatch = useDispatch()

  useEffect(() => dispatch(fetchCakes()), []);

  return (
    <Container maxWidth="lg">
      <Link to={`/`}>
        <Typography variant="subtitle1" sx={{ mb: 2, mt: 1 }}>
          Cakes App
        </Typography>
      </Link>
      {props.children}
    </Container>
  );
}