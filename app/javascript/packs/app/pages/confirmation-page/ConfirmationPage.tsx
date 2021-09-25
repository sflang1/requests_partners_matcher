import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Request } from "../../models/request";
import { fetchRequest } from "../../shared/actions/actions";
import Loader from "../../shared/components/Loader";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Button, Typography } from "@mui/material";
import MapComponent from "../new-request/components/my-map-component";
import { round } from "lodash";

const ConfirmationPage = () => {
  const [ loading, setLoading ] = useState(true);
  const [ request, setRequest ] = useState<Request>();
  const { request_id } = useParams();
  const history = useHistory();

  useEffect(() => {
    fetchRequest({ request_id }, (success: boolean, data: Request) => {
      if (success) {
        setRequest(data);
      } else {
        // should show message
      }

      setLoading(false);
    })
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <>
      <div className="flex row items-center justify-center mb-4">
        <CheckCircleIcon color="success" fontSize="large" />
      </div>
      <div className="mb-4">
        <Typography variant="h6" align="center">
          Your reservation has been confirmed!
        </Typography>
      </div>
      <div className="mb-4">
        <Typography variant="h6">
          Provider
        </Typography>
        <Typography variant="body1">
          {request.assigned_partner.name}
        </Typography>
      </div>
      <div className="mb-4">
        <Typography variant="h6">
          Material
        </Typography>
        <Typography variant="body1">
          {request.material.name}
        </Typography>
      </div>
      <div className="mb-4">
        <Typography variant="h6">
          Phone
        </Typography>
        <Typography variant="body1">
          {request.phone_number}
        </Typography>
      </div>
      <div className="mb-4">
        <Typography variant="h6">
          Address
        </Typography>
        <MapComponent
          respondToOnClick={false}
          markerLat={request.lat}
          markerLng={request.lng}
          center={{
            lat: Number(request.lat),
            lng: Number(request.lng)
          }}
          defaultZoom={15} />
      </div>
      <div className="mb-4">
        <Typography variant="h6">
          Area
        </Typography>
        <Typography variant="body1">
          { request.area }
        </Typography>
      </div>
      <div className="mb-4">
        <Typography variant="h6">
          Total Price
        </Typography>
        <Typography variant="body1">
          { `€${round(request.area * request.assigned_partner.price, 2)}` }
        </Typography>
      </div>
      <div className="flex row-reverse">
        <Button variant="contained" onClick={() => history.push('/')}>
          Go to My Requests
        </Button>
      </div>
    </>
  )
}

export default ConfirmationPage;