import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Index from './pages/index';
import NewRequest from './pages/new-request/NewRequest';
import RequestPartnersDetails from './pages/request-partners-details/RequestPartnersDetails';
import ShowPartner from './pages/show-partner/ShowPartner';
import MenuIcon from '@mui/icons-material/Menu';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import { useHistory } from "react-router";

const Routes = () => {
  const history = useHistory();
  const onClickMyRequest = () => {
    console.log("clicked my requests")
    window.location = '/'
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              AroundHome
            </Typography>
            <Button color="inherit" endIcon={<RequestQuoteIcon />} onClick={onClickMyRequest}>
              My Requests
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Container fixed className="mt-8">
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

    </>
  )
}

export default Routes;