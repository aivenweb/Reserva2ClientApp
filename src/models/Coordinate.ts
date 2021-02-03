export class Coordinate {

    constructor(latitude: number, longitude: number, accuracy: number, timestamp: number) {
        this.latitude= latitude;
        this.longitude= longitude;
        this.accuracy= accuracy;
        this.timestamp= timestamp;
    }

    public latitude: number
    public longitude: number
    public accuracy: number
    public timestamp: number
}