import React, { useCallback } from "react"; 
import { IonSlides, IonSlide, AlertButton } from "@ionic/react";
import { Business } from "../models/Business";
import SessionListItem from "./SessionListItem";
import { addFavorite, removeFavorite } from '../data/sessions/sessions.actions';
import { connect } from '../data/connect';
import "./BusinessSlideList.scss"

interface OwnProps {
    businesses: Business[];
}

interface DispatchProps {
    addFavorite: typeof addFavorite;
    removeFavorite: typeof removeFavorite;
}

type BusinessSlideListProps = OwnProps & DispatchProps;

const BusinessSlideList: React.FC<BusinessSlideListProps> = ({ addFavorite, removeFavorite, businesses }) => {
    const slideOpts = {
        slidesPerView: 'auto',
        speed: 400,
        pagination: false,
        loop: true
    };

    const handleShowAlert = useCallback((header: string, buttons: AlertButton[]) => {
        console.log(header);
        console.log(buttons);
    }, []);

    return (

        <IonSlides pager={true} options={slideOpts}>
            {
                businesses.map(business => {
                    return (
                        <IonSlide key={business.id} className="swiper-slide-business">
                        
                                <SessionListItem
                                    onShowAlert={handleShowAlert}
                                    business={business}
                                    listType="all"
                                    isFavorite={false}
                                    onAddFavorite={addFavorite}
                                    onRemoveFavorite={removeFavorite}
                                />
                        
                        </IonSlide>

                    )
                })
            }
        </IonSlides >
    )
}

export default connect<OwnProps, DispatchProps>({

    mapDispatchToProps: ({
        addFavorite,
        removeFavorite
    }),
    component: BusinessSlideList
});