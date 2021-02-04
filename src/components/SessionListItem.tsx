import React from 'react';
import { IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCard, AlertButton, IonGrid, IonRow } from '@ionic/react';

import { Business } from '../models/Business';
import "./SessionListItem.scss"

interface SessionListItemProps {
  business: Business;
  listType: "all" | "favorites";
  onAddFavorite: (id: number) => void;
  onRemoveFavorite: (id: number) => void;
  onShowAlert: (header: string, buttons: AlertButton[]) => void;
  isFavorite: boolean;
}

const SessionListItem: React.FC<SessionListItemProps> = ({ business }) => {
  // const ionItemSlidingRef = useRef<HTMLIonItemSlidingElement>(null)

  // const dismissAlert = () => {
  //   ionItemSlidingRef.current && ionItemSlidingRef.current.close();
  // }

  // const removeFavoriteSession = () => {
  //   onAddFavorite(business.id);
  //   onShowAlert('Favorite already added', [
  //     {
  //       text: 'Cancel',
  //       handler: dismissAlert
  //     },
  //     {
  //       text: 'Remove',
  //       handler: () => {
  //         onRemoveFavorite(business.id);
  //         dismissAlert();
  //       }
  //     }
  //   ]);
  // }

  // const addFavoriteSession = () => {
  //   if (isFavorite) {
  //     // woops, they already favorited it! What shall we do!?
  //     // prompt them to remove it
  //     removeFavoriteSession();
  //   } else {
  //     // remember this session as a user favorite
  //     onAddFavorite(business.id);
  //     onShowAlert('Favorite Added', [
  //       {
  //         text: 'OK',
  //         handler: dismissAlert
  //       }
  //     ]);
  //   }
  // };

  return (
    <>
      <IonCard href={`/tabs/business/${business.id}`}>
        <img className="card-img" src={business.image} alt={`business-${business.id}`} />
        <IonCardHeader className="text-left">
          <IonCardSubtitle >{business.categories[0]}</IonCardSubtitle>
          <IonCardTitle>{business.name}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonGrid>
            <IonRow className="text-left">
              {business.description}
            </IonRow>
            {/* <IonRow className="right">
              {listType === "favorites" ?
                <IonIcon size="large" icon={isFavorite ? heartSharp : heartOutline} onClick={() => removeFavoriteSession()} />
                :
                <IonIcon size="large" icon={isFavorite ? heartSharp : heartOutline} onClick={() => addFavoriteSession()} />
              }
            </IonRow> */}
          </IonGrid>
        </IonCardContent>
      </IonCard>

    </>
  );
};

export default React.memo(SessionListItem);