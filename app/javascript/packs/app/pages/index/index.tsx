import { Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import RequestsTable from "./components/requests-table";

const Index = () => {
  return (
    <>
      <div className="mb-4">
        <Typography variant="h5">
          My Requests
        </Typography>
      </div>
      <div className="mb-4 flex row-reverse">
        <Button variant="contained" size="small">
          Create
        </Button>
      </div>
      <RequestsTable />
    </>
  )
}

export default Index;