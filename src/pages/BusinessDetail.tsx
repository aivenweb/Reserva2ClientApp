import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonContent, IonPage, IonButtons, IonButton, IonIcon, IonList, IonItem, IonLabel, IonDatetime, IonMenuButton, IonPopover, IonSelect, IonSelectOption, IonSlide, IonSlides } from '@ionic/react';
import { connect } from '../data/connect';
import { withRouter, RouteComponentProps } from 'react-router';
import * as selectors from '../data/selectors';
import { ellipsisHorizontal, ellipsisVertical } from 'ionicons/icons';
import './BusinessDetail.scss';
import { addFavorite, removeFavorite } from '../data/sessions/sessions.actions';
import { Business } from '../models/Business';
import AboutPopover from '../components/AboutPopover';
import { SuperTab, SuperTabButton, SuperTabs, SuperTabsContainer, SuperTabsToolbar } from '@ionic-super-tabs/react';

interface OwnProps extends RouteComponentProps { };

interface StateProps {
  business?: Business;
  favoriteSessions: number[],
};

interface DispatchProps {
  addFavorite: typeof addFavorite;
  removeFavorite: typeof removeFavorite;
}

type BusinessDetailProps = OwnProps & StateProps & DispatchProps;

const BusinessDetail: React.FC<BusinessDetailProps> = ({ business, favoriteSessions }) => {



  const [showPopover, setShowPopover] = useState(false);
  const [popoverEvent, setPopoverEvent] = useState();
  const [location, setLocation] = useState<'madison' | 'austin' | 'chicago' | 'seattle'>('madison');
  const [conferenceDate, setConferenceDate] = useState('2047-05-17T00:00:00-05:00');

  if (!business) {
    return <div>Business not found</div>
  }

  const selectOptions = {
    header: 'Select a Location'
  };

  const presentPopover = (e: React.MouseEvent) => {
    setPopoverEvent(e.nativeEvent);
    setShowPopover(true);
  };

  const slideOpts = {
    slidesPerView: 'auto',
    speed: 400,
    loop: true
  };

  // momentjs would be a better way to do this https://momentjs.com/
  function displayDate(date: string, format: string) {
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    const d = new Date(date);
    const year = d.getFullYear();

    if (format === 'y') {
      return year;
    } else {
      const month = monthNames[d.getMonth()];
      const day = d.getDate();

      return month + ' ' + day + ', ' + year;
    }
  }

  return (
    <IonPage id="business-detail-page">
      <IonContent>
        <IonHeader className="ion-no-border">
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonButtons slot="end">
              <IonButton onClick={presentPopover}>
                <IonIcon slot="icon-only" ios={ellipsisHorizontal} md={ellipsisVertical}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonSlides pager={true} className="business-detail-header" options={slideOpts}>
          <IonSlide>

            <img src={business.image} className="business-detail-image" alt={`Portada de ${business.name}`} />

          </IonSlide>
          <IonSlide>

            <img src={business.image} className="business-detail-image" alt={`Portada de ${business.name}`} />

          </IonSlide>
          <IonSlide >

            <img src={business.image} className="business-detail-image" alt={`Portada de ${business.name}`} />

          </IonSlide>
        </IonSlides >

        <div className="business-detail-title">
          <h3 className="ion-padding-top ion-padding-start">{business.name}</h3>
          <p className="ion-padding-start">
            {business.address}
          </p>
        </div>

        <SuperTabs>
          <SuperTabsToolbar color="white">
            <SuperTabButton>
              <IonLabel>Servicios</IonLabel>
            </SuperTabButton>
            <SuperTabButton>
              <IonLabel>Opiniones</IonLabel>
            </SuperTabButton>
            <SuperTabButton>
              <IonLabel>Detalles</IonLabel>
            </SuperTabButton>
          </SuperTabsToolbar>
          <SuperTabsContainer>
            <SuperTab noScroll={false}>
              Im a custom page
    </SuperTab>
            <SuperTab noScroll={false}>
              Im a other page
            </SuperTab>
            <SuperTab noScroll={false}>
              <div className="business-detail-info">
                <h3 className="ion-padding-top ion-padding-start">Descripción</h3>
                <p className="ion-padding-start ion-padding-end">
                  The Ionic Conference is a one-day conference on {displayDate(conferenceDate, 'mediumDate')} featuring talks from the Ionic team. It is focused on Ionic applications being built with Ionic Framework. This includes migrating apps to the latest version of the framework, Angular concepts, Webpack, Sass, and many other technologies used in Ionic 2. Tickets are completely sold out, and we’re expecting more than 1000 developers – making this the largest Ionic conference ever!
          </p>

                <h3 className="ion-padding-top ion-padding-start">Details</h3>

                <IonList lines="none">
                  <IonItem>
                    <IonLabel>
                      Location
              </IonLabel>
                    <IonSelect value={location} interfaceOptions={selectOptions} onIonChange={(e) => setLocation(e.detail.value as any)}>
                      <IonSelectOption value="madison">Madison, WI</IonSelectOption>
                      <IonSelectOption value="austin">Austin, TX</IonSelectOption>
                      <IonSelectOption value="chicago">Chicago, IL</IonSelectOption>
                      <IonSelectOption value="seattle">Seattle, WA</IonSelectOption>
                    </IonSelect>
                  </IonItem>
                  <IonItem>
                    <IonLabel>
                      Date
              </IonLabel>
                    <IonDatetime
                      displayFormat="MMM DD, YYYY"
                      max="2056"
                      value={conferenceDate}
                      onIonChange={(e) => setConferenceDate(e.detail.value as any)}>
                    </IonDatetime>
                  </IonItem>
                </IonList>

                <h3 className="ion-padding-top ion-padding-start">Internet</h3>

                <IonList lines="none">
                  <IonItem>
                    <IonLabel>
                      Wifi network
              </IonLabel>
                    <IonLabel className="ion-text-end">
                      ica{displayDate(conferenceDate, 'y')}
                    </IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonLabel>
                      Password
              </IonLabel>
                    <IonLabel className="ion-text-end">
                      makegoodthings
              </IonLabel>
                  </IonItem>
                </IonList>

              </div>
            </SuperTab>
          </SuperTabsContainer>
        </SuperTabs>

      </IonContent>

      <IonPopover
        isOpen={showPopover}
        event={popoverEvent}
        onDidDismiss={() => setShowPopover(false)}
      >
        <AboutPopover dismiss={() => setShowPopover(false)} />
      </IonPopover>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state, OwnProps) => ({
    business: selectors.getBusiness(state, OwnProps),
    favoriteSessions: state.data.favorites
  }),
  mapDispatchToProps: {
    addFavorite,
    removeFavorite
  },
  component: withRouter(BusinessDetail)
})