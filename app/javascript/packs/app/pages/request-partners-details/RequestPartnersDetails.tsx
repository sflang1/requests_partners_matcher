import {
  Card,
  CardContent,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography
} from '@mui/material';
import { round } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Partner } from '../../models/partner';
import VisibilityIcon from '@mui/icons-material/Visibility';

const RequestPartnersDetails = () => {
  let { request_id } = useParams();
  const [ loading, setLoading ] = useState(true);
  const [ partners, setPartners ] = useState<Partner[]>([]);
  const [ page, setPage ] = useState(1);
  const [ perPage, setPerPage ] = useState(10);

  const fetchPartners = async () => {
    const response = await fetch(`/api/requests/${request_id}/partners.json?page=${page}&per_page=${perPage}`);
    const responseJson = await response.json();

    if (response.status === 200 && responseJson.success) {
      console.log("response json ", responseJson);
      setPartners(responseJson.data);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPartners();
  }, [])

  return (
    <Container fixed>
      <Card>
        <CardContent>
          <Typography variant="h5">
            {`Providers for Request ${request_id}`}
          </Typography>
          <TableContainer>
            <Table size="medium">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">Operating Radius (km)</TableCell>
                  <TableCell align="right">Rating</TableCell>
                  <TableCell align="right">Distance to your address (km)</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  partners.map(partner => (
                    <TableRow key={partner.id}>
                      <TableCell>{ partner.id }</TableCell>
                      <TableCell align="right">{ partner.operating_radius }</TableCell>
                      <TableCell align="right">{ partner.rating }</TableCell>
                      <TableCell align="right">{ round(partner.distance, 2) }</TableCell>
                      <TableCell>
                        <>
                          <Tooltip title="View Partner Details">
                            <IconButton>
                              <VisibilityIcon />
                            </IconButton>
                          </Tooltip>
                        </>
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Container>
  )
}

export default RequestPartnersDetails;