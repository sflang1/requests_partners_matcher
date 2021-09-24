import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useFormikContext } from 'formik';

const Marker = () => {
  return (<LocationOnIcon />)
};

const MapComponent = () => {
  const { setFieldValue, validateForm } = useFormikContext();
  const [ markerLat, setMarkerLat ] = useState(null);
  const [ markerLng, setMarkerLng ] = useState(null);

  const onClickMap = (event) => {
    const { lat, lng } = event;
    console.log("event ", event);
    setMarkerLat(lat);
    setMarkerLng(lng);
    setFieldValue('lat', lat);
    setFieldValue('lng', lng);
    validateForm()
  }

  return (
    <div style={{ height: 400, width: '50%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBOjl4v9w6SUialG0eTncNc7KAjI_2sfNk' }}
        defaultCenter={{
          lat: 52.51626007592769,
          lng: 13.377783422966164,
        }}
        defaultZoom={12}
        onClick={onClickMap}>
        {
          markerLat && markerLng && (
            <Marker lat={markerLat} lng={markerLng} />
          )
        }
      </GoogleMapReact>
    </div>
  )
}

export default MapComponent;