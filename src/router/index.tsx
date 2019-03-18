'use strict';

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Coupon } from '../containers';

export default class MainRouter extends Component<any> {
  render() {
    return (
      <Router {...this.props}>
        <Switch>
          <Route component={Coupon} />
        </Switch>
      </Router>
    );
  }
}
