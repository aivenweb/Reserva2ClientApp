import React, { useState, useRef } from 'react';

import { IonToolbar, IonContent, IonPage, IonButtons, IonTitle, IonMenuButton, IonButton, IonIcon, IonSearchbar, IonRefresher, IonRefresherContent, IonToast, IonModal, IonHeader, getConfig } from '@ionic/react';
import { options, search } from 'ionicons/icons';

import SessionList from '../components/SessionList';
import SessionListFilter from '../components/SessionListFilter';
import './HomePage.scss'

import ShareSocialFab from '../components/ShareSocialFab';

import * as selectors from '../data/selectors';
import { connect } from '../data/connect';
import { setSearchText } from '../data/sessions/sessions.actions';
import { Business } from '../models/Business';

import { GeolocationProvider } from '../providers/geolocation.provider';

interface OwnProps { }

interface StateProps {
  businesses: Business[];
  mode: 'ios' | 'md'
}

interface DispatchProps {
  setSearchText: typeof setSearchText;
}

type HomePageProps = OwnProps & StateProps & DispatchProps;

const HomePage: React.FC<HomePageProps> = ({ businesses, setSearchText, mode }) => {

  // const [segment, setSegment] = useState<'all' | 'favorites'>('all');
  const segment = 'all';
  const [showSearchbar, setShowSearchbar] = useState<boolean>(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const ionRefresherRef = useRef<HTMLIonRefresherElement>(null);
  const [showCompleteToast, setShowCompleteToast] = useState(false);

  const pageRef = useRef<HTMLElement>(null);

  const ios = mode === 'ios';

  const doRefresh = () => {
    setTimeout(() => {
      ionRefresherRef.current!.complete();
      setShowCompleteToast(true);
    }, 2500)
  };

  new GeolocationProvider().checkGeolationByPlatform(coordinate => {
    console.log(coordinate)
  })

  return (
    <IonPage ref={pageRef} id="home-page">
      <IonHeader translucent={true}>
        <IonToolbar color="primary">
          {!showSearchbar &&
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
          }
          {/* {ios &&
            <IonSegment value={segment} onIonChange={(e) => setSegment(e.detail.value as any)}>
              <IonSegmentButton value="all">
                All
              </IonSegmentButton>
              <IonSegmentButton value="favorites">
                Favorites
              </IonSegmentButton>
            </IonSegment>
          } */}
          {!ios && !showSearchbar &&
            <IonTitle>Reserva2</IonTitle>
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

        {/* {!ios &&
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
        } */}
      </IonHeader>

      <IonContent fullscreen={true}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Reserva2</IonTitle>
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

        <SessionList
          businesses={businesses}
          listType={segment}
          hide={false}
        />

        {/* <SessionList
          businesses={favoritesBusinesses}
          listType={segment}
          hide={segment === 'all'}
        /> */}
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
    mode: getConfig()!.get('mode')
  }),
  mapDispatchToProps: {
    setSearchText
  },
  component: React.memo(HomePage)
});