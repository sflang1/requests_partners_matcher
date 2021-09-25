import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { fetchRequests } from "../../../shared/actions/actions";
import { Link } from "react-router-dom";
import Loader from "../../../shared/components/Loader";
import { RequestsResponse } from "../../../models/requests-response";
import { RequestStatus } from "../../../models/request";

const RequestsTable = () => {
  const [loading, setLoading] = useState(true);
  const [requestsResponse, setRequestsResponse] = useState<RequestsResponse>();
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    fetchRequests({ page: page + 1, perPage }, (success: boolean, data: RequestsResponse) => {
      if (success) {
        setRequestsResponse(data)
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
    return <Loader />;
  }

  return (
    <>
      <TableContainer>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Material</TableCell>
              <TableCell align="right">Area</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Assigned Partner</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              requestsResponse.items.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6}>No results found.</TableCell>
                </TableRow>
              )
            }
            {
              requestsResponse.items.map(request => (
                <TableRow key={request.id}>
                  <TableCell>{request.id}</TableCell>
                  <TableCell align="right">{request.material.name}</TableCell>
                  <TableCell align="right">{request.area}</TableCell>
                  <TableCell align="right">{request.status}</TableCell>
                  <TableCell align="right">
                    {
                      request.assigned_partner && (
                        <Link to={`/partners/${request.assigned_partner.id}`}>
                          {request.assigned_partner.name}
                        </Link>
                      )
                    }
                  </TableCell>
                  <TableCell align="right">
                    {
                      request.status === "created" && (
                        <Link to={`/requests/${request.id}/partners`}>
                          See partners
                        </Link>
                      )
                    }
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 30]}
        component="div"
        count={requestsResponse.total_items_count}
        rowsPerPage={perPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage} />
    </>
  )
};

export default RequestsTable;