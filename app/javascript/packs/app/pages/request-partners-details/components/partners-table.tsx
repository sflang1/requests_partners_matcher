import React, { useEffect, useState } from "react";
import { Button, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { useParams } from "react-router";
import { fetchPartners } from "../../../actions/actions";
import { PartnersResponse } from "../../../models/partners-response";
import { round } from "lodash";
import { Link } from "react-router-dom";

const PartnersTable = () => {
  const { request_id } = useParams();
  const [ loading, setLoading ] = useState(true);
  const [ partnerResponse, setPartnerResponse ] = useState<PartnersResponse>();
  const [ page, setPage ] = useState(0);
  const [ perPage, setPerPage ] = useState(10);
  console.log("request ", request_id);

  useEffect(() => {
    fetchPartners({ request_id, page: page + 1, perPage }, (success: boolean, data: PartnersResponse) => {
      if (success) {
        setPartnerResponse(data)
      }

      setLoading(false);
    });
  }, [page, perPage]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    setLoading(true);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setPerPage(parseInt(event.target.value, 10))
    setLoading(true);
  }

  if (loading) {
    return (
      <div className="flex row justify-center items-center">
        <CircularProgress size={60} />
      </div>
    );
  }

  return (
    <>
      <TableContainer>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Rating</TableCell>
              <TableCell align="right">Distance to your address (km)</TableCell>
              <TableCell align="right">Operating Radius (km)</TableCell>
              <TableCell/>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              partnerResponse.items.map(partner => (
                <TableRow key={partner.id}>
                  <TableCell>
                    <Link to={`/partners/${partner.id}`}>
                      {partner.name}
                    </Link>
                  </TableCell>
                  <TableCell align="right">{partner.rating}</TableCell>
                  <TableCell align="right">{round(partner.distance, 2)}</TableCell>
                  <TableCell align="right">{partner.operating_radius}</TableCell>
                  <TableCell>
                    <Button variant="outlined" size="small">
                      Make a reservation
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[ 10, 20, 30 ]}
        component="div"
        count={partnerResponse.total_items_count}
        rowsPerPage={perPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage} />
    </>
  )
};

export default PartnersTable;