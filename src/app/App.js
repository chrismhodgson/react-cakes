import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import store from'./store'

import Wrapper from './Wrapper';
import CakeItem from '../features/cakes/CakeItem';
import CakeList from '../features/cakes/CakeList';
import CakeAdd from '../features/cakes/CakeAdd';

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Wrapper>
            <Route exact path="/add" component={CakeAdd} />
            <Route path="/view/:id" component={CakeItem} />
            <Route exact path="/" component={CakeList} />
          </Wrapper>
        </Switch>
      </Router>
    </Provider>
  );
}