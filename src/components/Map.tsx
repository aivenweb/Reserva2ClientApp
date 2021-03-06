import React, { useRef, useEffect } from 'react';
import { Location } from '../models/Location';

interface MapProps {
  locations: Location[]
  mapCenter: Location
}

const Map: React.FC<MapProps> = ({ mapCenter, locations }) => {
  const mapEle = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map>();

  useEffect(() => {
    if (mapEle && mapEle.current) {
      map.current = new google.maps.Map(mapEle.current, {
        center: {
          lat: mapCenter.lat,
          lng: mapCenter.lng
        },
        zoom: 16
      });



      addMarkers();

      google.maps.event.addListenerOnce(map.current, 'idle', () => {
        if (mapEle.current) {
          mapEle.current.classList.add('show-map');
        }
      });
    }

    function addMarkers() {
      locations.forEach((markerData) => {
        let infoWindow = new google.maps.InfoWindow({
          content: `<h5>${markerData.name}</h5>`
        });

        let marker = new google.maps.Marker({
          position: new google.maps.LatLng(markerData.lat, markerData.lng),
          map: map.current!,
          title: markerData.name,
          icon: {
            url: 'assets/img/googlemapmarker.png', // image url
            scaledSize: new google.maps.Size(50, 50), // scaled size
          }
        });

        marker.addListener('click', () => {
          infoWindow.open(map.current!, marker);
        });
      });

      new google.maps.Marker({
        position: new google.maps.LatLng(mapCenter.lat, mapCenter.lng),
        map: map.current!,
        title: mapCenter.name,
        icon: {
          url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png' // image url
        }
      });

    }

  }, [mapCenter, locations]);

  return (
    <div ref={mapEle} className="map-canvas"></div>
  );
}

export default Map;