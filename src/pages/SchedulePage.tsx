import React, { useState, useRef } from 'react';

import { IonToolbar, IonContent, IonPage, IonButtons, IonTitle, IonMenuButton, IonSegment, IonSegmentButton, IonButton, IonIcon, IonSearchbar, IonRefresher, IonRefresherContent, IonToast, IonModal, IonHeader, getConfig } from '@ionic/react';
import { options, search } from 'ionicons/icons';

import SessionList from '../components/SessionList';
import SessionListFilter from '../components/SessionListFilter';
import './SchedulePage.scss'

import ShareSocialFab from '../components/ShareSocialFab';

import * as selectors from '../data/selectors';
import { connect } from '../data/connect';
import { setSearchText } from '../data/sessions/sessions.actions';
import { Business } from '../models/Business';

import { Geolocation } from '@ionic-native/geolocation';

import { AndroidPermissions } from '@ionic-native/android-permissions';
import { LocationAccuracy } from '@ionic-native/location-accuracy';

interface OwnProps { }

interface StateProps {
  businesses: Business[];
  favoritesBusinesses: Business[];
  mode: 'ios' | 'md'
}

interface DispatchProps {
  setSearchText: typeof setSearchText;
}

type SchedulePageProps = OwnProps & StateProps & DispatchProps;

const SchedulePage: React.FC<SchedulePageProps> = ({ favoritesBusinesses, businesses, setSearchText, mode }) => {

  const [segment, setSegment] = useState<'all' | 'favorites'>('all');
  const [showSearchbar, setShowSearchbar] = useState<boolean>(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const ionRefresherRef = useRef<HTMLIonRefresherElement>(null);
  const [showCompleteToast, setShowCompleteToast] = useState(false);
  const [locationCoords, setLocationCoords] = useState({
    latitude: 0,
    longitude: 0,
    accuracy: 0,
    timestamp: 0
  });

  const pageRef = useRef<HTMLElement>(null);

  const ios = mode === 'ios';

  const doRefresh = () => {
    setTimeout(() => {
      ionRefresherRef.current!.complete();
      setShowCompleteToast(true);
    }, 2500)
  };

  const checkGPSPermission = () => {
    AndroidPermissions.checkPermission(AndroidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => {
        if (result.hasPermission) {

          //If having permission show 'Turn On GPS' dialogue
          askToTurnOnGPS();
        } else {

          //If not having permission ask for permission
          requestGPSPermission();
        }
      },
      err => {
        alert(err);
      }
    );
  }

  const requestGPSPermission = () => {
    LocationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        console.log("4");
      } else {
        //Show 'GPS Permission Request' dialogue
        AndroidPermissions.requestPermission(AndroidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            () => {
              // call method to turn on GPS
              askToTurnOnGPS();
            },
            error => {
              //Show alert if user click on 'No Thanks'
              alert('requestPermission Error requesting location permissions ' + error)
            }
          );
      }
    });
  }

  const askToTurnOnGPS = () => {
    LocationAccuracy.request(LocationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        // When GPS Turned ON call method to get Accurate location coordinates
        getLocationCoordinates()
      },
      error => alert('Error requesting location permissions ' + JSON.stringify(error))
    );
  }

  const getLocationCoordinates = () => {
    Geolocation.getCurrentPosition().then((resp) => {
      let coords = {
        latitude: resp.coords.latitude,
        longitude: resp.coords.longitude,
        accuracy: resp.coords.accuracy,
        timestamp: resp.timestamp
      };

      setLocationCoords(coords)
      console.log(locationCoords)


    }).catch((error) => {
      alert('Error getting location' + error);
    });
  }
  checkGPSPermission();
  return (
    <IonPage ref={pageRef} id="home-page">
      <IonHeader translucent={true}>
        <IonToolbar>
          {!showSearchbar &&
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
          }
          {ios &&
            <IonSegment value={segment} onIonChange={(e) => setSegment(e.detail.value as any)}>
              <IonSegmentButton value="all">
                All
              </IonSegmentButton>
              <IonSegmentButton value="favorites">
                Favorites
              </IonSegmentButton>
            </IonSegment>
          }
          {!ios && !showSearchbar &&
            <IonTitle>Home</IonTitle>
          }
          {showSearchbar &&
            <IonSearchbar showCancelButton="always" placeholder="Search" onIonChange={(e: CustomEvent) => setSearchText(e.detail.value)} onIonCancel={() => setShowSearchbar(false)}></IonSearchbar>
          }

          <IonButtons slot="end">
            {!ios && !showSearchbar &&
              <IonButton onClick={() => setShowSearchbar(true)}>
                <IonIcon slot="icon-only" icon={search}></IonIcon>
              </IonButton>
            }
            {!showSearchbar &&
              <IonButton onClick={() => setShowFilterModal(true)}>
                {mode === 'ios' ? 'Filter' : <IonIcon icon={options} slot="icon-only" />}
              </IonButton>
            }
          </IonButtons>
        </IonToolbar>

        {!ios &&
          <IonToolbar>
            <IonSegment value={segment} onIonChange={(e) => setSegment(e.detail.value as any)}>
              <IonSegmentButton value="all">
                All
              </IonSegmentButton>
              <IonSegmentButton value="favorites">
                Favorites
              </IonSegmentButton>
            </IonSegment>
          </IonToolbar>
        }
      </IonHeader>

      <IonContent fullscreen={true}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
          <IonToolbar>
            <IonSearchbar placeholder="Search" onIonChange={(e: CustomEvent) => setSearchText(e.detail.value)}></IonSearchbar>
          </IonToolbar>
        </IonHeader>

        <IonRefresher slot="fixed" ref={ionRefresherRef} onIonRefresh={doRefresh}>
          <IonRefresherContent />
        </IonRefresher>

        <IonToast
          isOpen={showCompleteToast}
          message="Refresh complete"
          duration={2000}
          onDidDismiss={() => setShowCompleteToast(false)}
        />
        <IonTitle size="large">{`${locationCoords.latitude} - ${locationCoords.longitude} - ${locationCoords.accuracy} - ${locationCoords.timestamp} `}</IonTitle>
        <SessionList
          businesses={businesses}
          listType={segment}
          hide={segment === 'favorites'}
        />
        <SessionList
          businesses={favoritesBusinesses}
          listType={segment}
          hide={segment === 'all'}
        />
      </IonContent>

      <IonModal
        isOpen={showFilterModal}
        onDidDismiss={() => setShowFilterModal(false)}
        swipeToClose={true}
        presentingElement={pageRef.current!}
        cssClass="session-list-filter"
      >
        <SessionListFilter
          onDismissModal={() => setShowFilterModal(false)}
        />
      </IonModal>

      <ShareSocialFab />

    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    businesses: selectors.getSearchedBusiness(state),
    favoritesBusinesses: selectors.getFavoritesBusiness(state),
    mode: getConfig()!.get('mode')
  }),
  mapDispatchToProps: {
    setSearchText
  },
  component: React.memo(SchedulePage)
});