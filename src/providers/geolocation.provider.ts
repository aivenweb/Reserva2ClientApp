
import { Geolocation } from '@ionic-native/geolocation';

import { AndroidPermissions } from '@ionic-native/android-permissions';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Capacitor } from '@capacitor/core';
import { Coordinate } from '../models/Coordinate';

export class GeolocationProvider {
    checkGPSPermission = (getCoordinateCallback: getCoordinateCallbackType) => {
        AndroidPermissions.checkPermission(AndroidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
            result => {
                if (result.hasPermission) {

                    //If having permission show 'Turn On GPS' dialogue
                    this.askToTurnOnGPS(getCoordinateCallback);
                } else {

                    //If not having permission ask for permission
                    this.requestGPSPermission(getCoordinateCallback);
                }
            },
            err => {
                alert(err);
            }
        );
    }

    requestGPSPermission = (getCoordinateCallback: getCoordinateCallbackType) => {
        LocationAccuracy.canRequest().then((canRequest: boolean) => {
            if (canRequest) {
                console.log("4");
            } else {
                //Show 'GPS Permission Request' dialogue
                AndroidPermissions.requestPermission(AndroidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
                    .then(
                        () => {
                            // call method to turn on GPS
                            this.askToTurnOnGPS(getCoordinateCallback);
                        },
                        error => {
                            //Show alert if user click on 'No Thanks'
                            alert('requestPermission Error requesting location permissions ' + error)
                        }
                    );
            }
        });
    }

    askToTurnOnGPS = (getCoordinateCallback: getCoordinateCallbackType) => {
        LocationAccuracy.request(LocationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
            () => {
                // When GPS Turned ON call method to get Accurate location coordinates
                this.getLocationCoordinates(getCoordinateCallback)
            },
            error => alert('Error requesting location permissions ' + JSON.stringify(error))
        );
    }

    getLocationCoordinates = (getCoordinateCallback: getCoordinateCallbackType) => {
        Geolocation.getCurrentPosition().then((resp) => {
            let coordinate = new Coordinate(resp.coords.latitude,
                resp.coords.longitude,
                resp.coords.accuracy,
                resp.timestamp);

                getCoordinateCallback(coordinate)

        }).catch((error) => {
            alert('Error getting location' + error);
        });
    }

    checkGeolationByPlatform = (getCoordinateCallback: getCoordinateCallbackType) => {
        if (Capacitor.getPlatform() === 'web') {
            this.getLocationCoordinates(getCoordinateCallback);
        }
        else {
            this.checkGPSPermission(getCoordinateCallback);
        }
    }


}

interface getCoordinateCallbackType { (coordinate: Coordinate): void }
