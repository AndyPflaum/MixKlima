export class User {
    name: string;
    vorname: string;
    email: string;
    id: number;

    constructor(obj?: any) {
        this.name = obj ? obj.name : "";
        this.vorname = obj ? obj.vorname : "";
        this.email = obj ? obj.email : "";
        this.id = obj ? obj.id : 0; // oder null, wenn du das zulassen willst

    }
}