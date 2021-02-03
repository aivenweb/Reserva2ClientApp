import React, { useState } from 'react';
import Map from '../components/Map';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonPage } from '@ionic/react';
import { Location } from '../models/Location';
import { connect } from '../data/connect';
import * as selectors from '../data/selectors';
import { GeolocationProvider } from '../providers/geolocation.provider';
import './MapView.scss';

interface OwnProps { }

interface StateProps {
  locations: Location[];
  mapCenter: Location;
}

interface DispatchProps { }

interface MapViewProps extends OwnProps, StateProps, DispatchProps { };

const MapView: React.FC<MapViewProps> = ({ locations }) => {

  const [mapCenter, setMapCenter] = useState<Location>({
    id: 0,
    name: "",
    lat: 0,
    lng: 0
  })

  new GeolocationProvider().checkGeolationByPlatform(coordinate => {
    let location: Location = {
      id: 5,
      name: "position",
      lat: coordinate.latitude,
      lng: coordinate.longitude
    }
    if (mapCenter.id === 0)
      setMapCenter(location)
  })

  return (
    <IonPage id="map-view">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Map</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent class="map-page">
        {
          mapCenter.id !== 0 && <Map locations={locations} mapCenter={mapCenter} />
        }
      </IonContent>
    </IonPage>
  )
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    locations: state.data.locations,
    mapCenter: selectors.mapCenter(state)
  }),
  component: MapView
});
