import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Props } from 'google-map-react';

const Marker = () => {
  return (<LocationOnIcon />)
};

interface MapComponentProps extends Props {
  markerLat?: number
  markerLng?: number
  respondToOnClick?: boolean,
  center?: { lat: number, lng: number }
  onClickMap?: (lat: number, lng: number) => void
}

const MapComponent: React.FC<MapComponentProps> = (props) => {
  let { markerLat: propsMarkerLat, markerLng: propsMarketLng, respondToOnClick, onClickMap: callback, center, ...rest } = props;
  respondToOnClick = respondToOnClick || true;
  const [ markerLat, setMarkerLat ] = useState(propsMarkerLat);
  const [ markerLng, setMarkerLng ] = useState(propsMarketLng);

  const onClickMap = (event) => {
    if (!respondToOnClick) {
      return;
    }
    const { lat, lng } = event;
    setMarkerLat(lat);
    setMarkerLng(lng);
    if (callback) {
      callback(lat, lng)
    }
  }

  return (
    <div style={{ height: 400, width: '50%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBOjl4v9w6SUialG0eTncNc7KAjI_2sfNk' }}
        defaultCenter={center || {
          lat: 52.51626007592769,
          lng: 13.377783422966164,
        }}
        defaultZoom={12}
        {...rest}
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