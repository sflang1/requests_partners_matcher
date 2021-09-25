import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { useHistory, useParams } from "react-router";
import { fetchPartner } from "../../shared/actions/actions";
import { Partner } from "../../models/partner";
import MapComponent from "../new-request/components/my-map-component";
import Loader from "../../shared/components/Loader";

const ShowPartner = () => {
  const { partner_id } = useParams();
  const [ loading, setLoading ] = useState(true);
  const [ partner, setPartner ] = useState<Partner>();
  const history = useHistory();

  useEffect(() => {
    fetchPartner({ partner_id }, (success: boolean, data: Partner) => {
      if (success) {
        setPartner(data)
      }

      setLoading(false);
    })
  }, []);

  return (
    <>
      <Typography gutterBottom variant="h5" component="div">
        Partner Detail
      </Typography>
      {
        loading ? (
          <Loader />
        ) : (
          <>
            <div className="mb-4">
              <Typography variant="h6">
                Name
              </Typography>
              <Typography variant="body1">
                { partner.name }
              </Typography>
            </div>
            <div className="mb-4">
              <Typography variant="h6">
                Rating
              </Typography>
              <Typography variant="body1">
                { partner.rating }
              </Typography>
            </div>
            <div className="mb-4">
              <Typography variant="h6">
                Operating radius
              </Typography>
              <Typography variant="body1">
                { `${partner.operating_radius} km.` }
              </Typography>
            </div>
            <div className="mb-4">
              <Typography variant="h6">
                Price by m²
              </Typography>
              <Typography variant="body1">
                { `€${partner.price}` }
              </Typography>
            </div>
            <div className="mb-4">
              <Typography variant="h6">
                Address
              </Typography>
              <MapComponent
                respondToOnClick={false}
                markerLat={partner.lat}
                markerLng={partner.lng}
                center={{
                  lat: Number(partner.lat),
                  lng: Number(partner.lng)
                }}
                defaultZoom={15} />
            </div>
          </>
        )
      }
      <div className="mt-4 flex row-reverse">
        <Button variant="contained" onClick={() => history.goBack()}>
          Back
        </Button>
      </div>
    </>
  )
}

export default ShowPartner;