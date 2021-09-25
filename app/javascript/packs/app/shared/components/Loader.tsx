import { CircularProgress } from "@mui/material";
import React from "react"

const Loader = () => (
  <div className="flex row justify-center items-center">
    <CircularProgress size={60} />
  </div>
);

export default Loader;