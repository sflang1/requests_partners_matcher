import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Index from './pages/index';
import NewRequest from './pages/new-request/NewRequest';
import RequestPartnersDetails from './pages/request-partners-details/RequestPartnersDetails';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/request/new">
          <NewRequest />
        </Route>
        <Route exact path="/request/:request_id/partners">
          <RequestPartnersDetails />
        </Route>
        <Route exact path="/">
          <Index />
        </Route>
      </Switch>
    </Router>
  )
}

export default Routes;