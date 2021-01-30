import { IonItemDivider, IonItemGroup, IonGrid, IonLabel, IonCol, IonRow, IonItem, IonList, IonListHeader, IonAlert, AlertButton } from '@ionic/react';
import React, { useState, useCallback } from 'react';
import { Schedule, Session } from '../models/Schedule';
import SessionListItem from './SessionListItem';
import { connect } from '../data/connect';
import { addFavorite, removeFavorite } from '../data/sessions/sessions.actions';
import { Business } from '../models/Business';

interface OwnProps {
  schedule: Schedule;
  business: Business[];
  listType: 'all' | 'favorites';
  hide: boolean;
}

interface StateProps {
  favoriteSessions: number[];
}

interface DispatchProps {
  addFavorite: typeof addFavorite;
  removeFavorite: typeof removeFavorite;
}

interface SessionListProps extends OwnProps, StateProps, DispatchProps { };

const SessionList: React.FC<SessionListProps> = ({ addFavorite, removeFavorite, favoriteSessions, hide, schedule, business, listType }) => {

  const [showAlert, setShowAlert] = useState(false);
  const [alertHeader, setAlertHeader] = useState('');
  const [alertButtons, setAlertButtons] = useState<(AlertButton | string)[]>([]);

  const handleShowAlert = useCallback((header: string, buttons: AlertButton[]) => {
    setAlertHeader(header);
    setAlertButtons(buttons);
    setShowAlert(true);
  }, []);

  if (schedule.groups.length === 0 && !hide) {
    return (
      <IonList>
        <IonListHeader>
          No Sessions Found
        </IonListHeader>
      </IonList>
    );
  }

  return (
    <>
      <IonList style={hide ? { display: 'none' } : {}}>
        {/* {schedule.groups.map((group, index: number) => (
          <IonItemGroup key={`group-${index}`}>
            <IonItemDivider sticky>
              <IonLabel>
                {group.time}
              </IonLabel>
            </IonItemDivider>
            {group.sessions.map((session: Session, sessionIndex: number) => (
              <SessionListItem
                onShowAlert={handleShowAlert}
                isFavorite={favoriteSessions.indexOf(session.id) > -1}
                onAddFavorite={addFavorite}
                onRemoveFavorite={removeFavorite}
                key={`group-${index}-${sessionIndex}`}
                session={session}
                listType={listType}
              />
            ))}
          </IonItemGroup>
        ))} */}
        <IonGrid>
          <IonRow>
            {business.map(b => (
              <IonCol
                size={"6"}
                className="new-track"
                key={b.name}>
                <SessionListItem
                  onShowAlert={handleShowAlert}
                  isFavorite={favoriteSessions.indexOf(b.id) > -1}
                  onAddFavorite={addFavorite}
                  onRemoveFavorite={removeFavorite}
                  key={b.id}
                  business={b}
                  listType={listType}
                />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonList>
      <IonAlert
        isOpen={showAlert}
        header={alertHeader}
        buttons={alertButtons}
        onDidDismiss={() => setShowAlert(false)}
      ></IonAlert>
    </>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    favoriteSessions: state.data.favorites
  }),
  mapDispatchToProps: ({
    addFavorite,
    removeFavorite
  }),
  component: SessionList
});