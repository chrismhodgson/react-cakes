// import React from 'react';
import { Box } from '@mui/material';

export default function Loading(props) {
  return <Box>{props.message || 'Please wait...'}</Box>
}