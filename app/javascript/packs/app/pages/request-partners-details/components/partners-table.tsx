import React, { useEffect, useState } from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { useHistory, useParams } from "react-router";
import { fetchPartners, fetchRequest, makeAReservation } from "../../../shared/actions/actions";
import { PartnersResponse } from "../../../models/partners-response";
import { round } from "lodash";
import { Link } from "react-router-dom";
import Loader from "../../../shared/components/Loader";
import { Request } from "../../../models/request";

const PartnersTable = () => {
  const { request_id } = useParams();
  const [ loadingPartners, setLoadingPartners ] = useState(true);
  const [ loadingRequest, setLoadingRequest ] = useState(true);
  const [ partnerResponse, setPartnerResponse ] = useState<PartnersResponse>();
  const [ request, setRequest ] = useState<Request>();
  const [ page, setPage ] = useState(0);
  const [ perPage, setPerPage ] = useState(10);
  const history = useHistory();

  useEffect(() => {
    fetchPartners({ request_id, page: page + 1, perPage }, (success: boolean, data: PartnersResponse) => {
      if (success) {
        setPartnerResponse(data)
      }
      setLoadingPartners(false);
    });

    fetchRequest({ request_id }, (success: boolean, data: Request) => {
      if (success) {
        setRequest(data)
      }
      setLoadingRequest(false);
    })
  }, [page, perPage]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    setLoadingPartners(true);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setPerPage(parseInt(event.target.value, 10))
    setLoadingPartners(true);
  }

  const onClickMakeReservation = (partner_id: number) => {
    makeAReservation({ request_id, partner_id }, (success: boolean, _) => {
      if (success) {
        history.push('/')
      } else {

      }
    })
  }

  if (loadingPartners || loadingRequest) {
    return <Loader />;
  }

  return (
    <>
      <div className="my-4">
        <Typography variant="body1">
          <b>Area:&nbsp;</b>
          <span>{`${request.area} m²`}</span>
        </Typography>
      </div>
      <TableContainer>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Rating</TableCell>
              <TableCell align="right">Distance to your address (km)</TableCell>
              <TableCell align="right">Operating Radius (km)</TableCell>
              <TableCell align="right">Price per m²</TableCell>
              <TableCell align="right">Total price</TableCell>
              <TableCell/>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              partnerResponse.items.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7}>No results found.</TableCell>
                </TableRow>
              )
            }
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
                  <TableCell align="right">€{partner.price}</TableCell>
                  <TableCell align="right">€{request.area * partner.price}</TableCell>
                  <TableCell>
                    <Button variant="outlined" size="small" onClick={() => onClickMakeReservation(partner.id)}>
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