import React from 'react';
import {
  Card,
  CardContent,
  Container,
  Typography
} from '@mui/material';
import PartnersTable from './components/partners-table';

const RequestPartnersDetails = () => {

  return (
    <Container fixed>
      <Card>
        <CardContent>
          <Typography variant="h5">
            {`Partners for Request`}
          </Typography>
          <div className="my-4">
            <Typography variant="body1">
              Your results are sorted by partner rating. If the partners have the same rating, they are sorted by the nearest one to you.
              Only partners with experience in the material of your request are shown. Click in a partner's name to see its details.
            </Typography>
          </div>
          <div className="mb-4">
            <PartnersTable />
          </div>
        </CardContent>
      </Card>
    </Container>
  )
}

export default RequestPartnersDetails;