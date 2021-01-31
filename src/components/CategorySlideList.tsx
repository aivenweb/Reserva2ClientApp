import { IonSlides, IonSlide, IonCol, IonIcon } from "@ionic/react";
import { fastFoodSharp, cafeSharp, medkitSharp, pawSharp, cutSharp, carSportSharp, businessSharp } from 'ionicons/icons';
import React from "react";
import './CategorySlideList.scss';

const CategorySlideList: React.FC = () => {
    const slideOpts = {
        slidesPerView: 'auto',
        speed: 400,
        pagination: false
    };

    return (

        <IonSlides pager={true} options={slideOpts}>

            <IonSlide className="slide-category">
                <IonCol>
                    <IonIcon size="large" icon={businessSharp} />
                </IonCol>
            </IonSlide>
            <IonSlide className="slide-category">
                <IonCol>
                    <IonIcon size="large" icon={cafeSharp} />
                </IonCol>
            </IonSlide>
            <IonSlide className="slide-category">
                <IonCol>
                    <IonIcon size="large" icon={medkitSharp} />
                </IonCol>
            </IonSlide>
            <IonSlide className="slide-category">
                <IonCol>
                    <IonIcon size="large" icon={pawSharp} />
                </IonCol>
            </IonSlide>
            <IonSlide className="slide-category">
                <IonCol>
                    <IonIcon size="large" icon={fastFoodSharp} />
                </IonCol>
            </IonSlide>
            <IonSlide className="slide-category">
                <IonCol>
                    <IonIcon size="large" icon={cutSharp} />
                </IonCol>
            </IonSlide>
            <IonSlide className="slide-category">
                <IonCol>
                    <IonIcon size="large" icon={carSportSharp} />
                </IonCol>
            </IonSlide>

        </IonSlides>
    )

}

export default CategorySlideList;