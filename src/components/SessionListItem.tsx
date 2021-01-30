import React, { useRef } from 'react';
import { IonItemSliding, IonItem, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCard, IonLabel, IonItemOptions, IonItemOption, AlertButton } from '@ionic/react';
import { Session } from '../models/Schedule';
import { pin, wifi, wine, warning, walk } from 'ionicons/icons';
import { Business } from '../models/Business';


interface SessionListItemProps {
  business: Business;
  listType: "all" | "favorites";
  onAddFavorite: (id: number) => void;
  onRemoveFavorite: (id: number) => void;
  onShowAlert: (header: string, buttons: AlertButton[]) => void;
  isFavorite: boolean;
}

const SessionListItem: React.FC<SessionListItemProps> = ({ isFavorite, onAddFavorite, onRemoveFavorite, onShowAlert, business, listType }) => {
  const ionItemSlidingRef = useRef<HTMLIonItemSlidingElement>(null)

  const dismissAlert = () => {
    ionItemSlidingRef.current && ionItemSlidingRef.current.close();
  }

  const removeFavoriteSession = () => {
    onAddFavorite(business.id);
    onShowAlert('Favorite already added', [
      {
        text: 'Cancel',
        handler: dismissAlert
      },
      {
        text: 'Remove',
        handler: () => {
          onRemoveFavorite(business.id);
          dismissAlert();
        }
      }
    ]);
  }

  const addFavoriteSession = () => {
    if (isFavorite) {
      // woops, they already favorited it! What shall we do!?
      // prompt them to remove it
      removeFavoriteSession();
    } else {
      // remember this session as a user favorite
      onAddFavorite(business.id);
      onShowAlert('Favorite Added', [
        {
          text: 'OK',
          handler: dismissAlert
        }
      ]);
    }
  };

  return (
    <>
      <IonCard>
        <img src={business.image} />
        <IonCardHeader>
          <IonCardSubtitle>{business.categories[0]}</IonCardSubtitle>
          <IonCardTitle>{business.name}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          {business.description}
        </IonCardContent>
      </IonCard>
      {/* <IonItemSliding ref={ionItemSlidingRef} class={'track-' + business.categories[0].toLowerCase()}>
        <IonItem routerLink={`/tabs/schedule/${business.id}`}>
          <IonLabel>
            <h3>{business.name}</h3>
            <p>
              {business.description}&mdash;&nbsp;
            {business.categories}&mdash;&nbsp;
            {business.id}
            </p>
          </IonLabel>
        </IonItem>
        <IonItemOptions>
          {listType === "favorites" ?
            <IonItemOption color="danger" onClick={() => removeFavoriteSession()}>
              Remove
          </IonItemOption>
            :
            <IonItemOption color="favorite" onClick={addFavoriteSession}>
              Favorite
          </IonItemOption>
          }
        </IonItemOptions>
      </IonItemSliding> */}
    </>
  );
};

export default React.memo(SessionListItem);