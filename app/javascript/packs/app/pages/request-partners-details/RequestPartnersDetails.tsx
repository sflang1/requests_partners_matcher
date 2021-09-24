import { Card, CardContent, Container, LinearProgress, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router';

const RequestPartnersDetails = () => {
  let { request_id } = useParams();
  const [loading, setLoading] = useState(true);

  return (
    <Container fixed>
      <Card>
        <CardContent>
          <Typography variant="h5">
            {`Providers for Request ${request_id}`}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  )
}

export default RequestPartnersDetails;