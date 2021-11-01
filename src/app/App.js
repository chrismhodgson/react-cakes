import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import store from'./store'

import { Typography, Container } from '@mui/material';
import CakeItem from '../features/cakes/CakeItem';
import CakeList from '../features/cakes/CakeList';
import CakeAdd from '../features/cakes/CakeAdd';

export default function App() {
  return (
    <Provider store={store}>
      <Container maxWidth="lg">

        <Typography variant="h5" component="h1" sx={{ mb: 1 }}>
          Cakes App
        </Typography>

        <Router>
          <Switch>
            <Route exact path="/add" component={CakeAdd} />
            <Route path="/:id" component={CakeItem} />
            <Route exact path="/" component={CakeList} />
          </Switch>
        </Router>

     </Container>
    </Provider>
  );
}