import { Button, Typography } from "@mui/material";
import React from "react";
import RequestsTable from "./components/requests-table";
import { useHistory } from 'react-router';

const Index = () => {
  const history = useHistory();

  return (
    <>
      <div className="mb-4">
        <Typography variant="h5">
          My Requests
        </Typography>
      </div>
      <div className="mb-4 flex row-reverse">
        <Button variant="contained" size="small" onClick={() => history.push('/requests/new')}>
          Create
        </Button>
      </div>
      <RequestsTable />
    </>
  )
}

export default Index;