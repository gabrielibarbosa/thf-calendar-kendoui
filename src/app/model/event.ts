export class Event {
    constructor() {

    }
    
    public id?: number;
    public title?: string;
    public description?: string;
    public start: Date;
    public end: Date;
    public isAllDay?: boolean;
    public roomId?: string | number;
    public initialHour?: string;
    public finalHour?: string;
}