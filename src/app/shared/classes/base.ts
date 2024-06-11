export class Base {
    id:number;
    date: Date;
    createdAt: string;
    updatedAt: string;

    constructor() {
        this.date = new Date();
    }
}
