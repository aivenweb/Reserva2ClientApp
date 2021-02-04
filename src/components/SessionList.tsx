import { IonList, IonListHeader, IonTitle } from '@ionic/react';
import React from 'react';

import { connect } from '../data/connect';
import { addFavorite, removeFavorite } from '../data/sessions/sessions.actions';
import { Business } from '../models/Business';
import CategorySlideList from './CategorySlideList';
import BusinessSlideList from './BusinessSlideList';
import "./SessionList.scss"

interface OwnProps {
  businesses: Business[];
  listType: 'all' | 'favorites';
  hide: boolean;
}

interface StateProps {
  favoriteBusinesses: number[];
}

interface DispatchProps {
  addFavorite: typeof addFavorite;
  removeFavorite: typeof removeFavorite;
}

interface SessionListProps extends OwnProps, StateProps, DispatchProps { };

const SessionList: React.FC<SessionListProps> = ({ hide, businesses }) => {

  // const [showAlert, setShowAlert] = useState(false);
  // const [alertHeader, setAlertHeader] = useState('');
  // const [alertButtons, setAlertButtons] = useState<(AlertButton | string)[]>([]);

  // const handleShowAlert = useCallback((header: string, buttons: AlertButton[]) => {
  //   setAlertHeader(header);
  //   setAlertButtons(buttons);
  //   setShowAlert(true);
  // }, []);

  if (businesses.length === 0 && !hide) {
    return (
      <IonList>
        <IonListHeader>
          No Sessions Found
        </IonListHeader>
      </IonList>
    );
  }

  return (
    <IonList style={hide ? { display: 'none' } : {}}>
      <CategorySlideList />
      <div className="business-section">
        <IonTitle size="large">Disponibles Cerca Tuyo</IonTitle>
        <BusinessSlideList businesses={businesses} />
      </div>
    </IonList>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    favoriteBusinesses: state.data.favorites
  }),
  mapDispatchToProps: ({
    addFavorite,
    removeFavorite
  }),
  component: SessionList
});