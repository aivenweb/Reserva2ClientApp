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
                    <p>Hoteles</p>
                </IonCol>
            </IonSlide>
            <IonSlide className="slide-category">
                <IonCol>
                    <IonIcon size="large" icon={cafeSharp} />
                    <p>Bar</p>
                </IonCol>
            </IonSlide>
            <IonSlide className="slide-category">
                <IonCol>
                    <IonIcon size="large" icon={medkitSharp} />
                    <p>Doctores</p>
                </IonCol>
            </IonSlide>
            <IonSlide className="slide-category">
                <IonCol>
                    <IonIcon size="large" icon={pawSharp} />
                    <p>Veterinarias</p>
                </IonCol>
            </IonSlide>
            <IonSlide className="slide-category">
                <IonCol>
                    <IonIcon size="large" icon={fastFoodSharp} />
                    <p>Comidas</p>
                </IonCol>
            </IonSlide>
            <IonSlide className="slide-category">
                <IonCol>
                    <IonIcon size="large" icon={cutSharp} />
                    <p>Peluquerias</p>
                </IonCol>
            </IonSlide>
            <IonSlide className="slide-category">
                <IonCol>
                    <IonIcon size="large" icon={carSportSharp} />
                    <p>Chofer</p>
                </IonCol>
            </IonSlide>

        </IonSlides>
    )

}

export default CategorySlideList;