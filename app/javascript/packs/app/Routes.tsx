import { Card, CardContent, Container } from '@mui/material';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Index from './pages/index';
import NewRequest from './pages/new-request/NewRequest';
import RequestPartnersDetails from './pages/request-partners-details/RequestPartnersDetails';
import ShowPartner from './pages/show-partner/ShowPartner';

const Routes = () => {
  return (
    <Container fixed>
      <Card>
        <CardContent>
          <Router>
            <Switch>
              <Route exact path="/requests/new">
                <NewRequest />
              </Route>
              <Route exact path="/requests/:request_id/partners">
                <RequestPartnersDetails />
              </Route>
              <Route exact path="/partners/:partner_id">
                <ShowPartner />
              </Route>
              <Route exact path="/">
                <Index />
              </Route>
            </Switch>
          </Router>
        </CardContent>
      </Card>
    </Container>
  )
}

export default Routes;