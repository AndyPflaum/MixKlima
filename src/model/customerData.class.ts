// src/app/model/customerData.class.ts
export class CustomerDate {
  name: string;
  vorname: string;
  email: string;
  brand: string;
  createdAt: Date;
  read: boolean;
  guestLoggedIn: boolean;

  constructor(obj?: Partial<CustomerDate>) {
    this.name = obj?.name || '';
    this.vorname = obj?.vorname || '';
    this.email = obj?.email || '';
    this.brand = obj?.brand || '';
    this.createdAt = obj?.createdAt ? new Date(obj.createdAt) : new Date();
    this.read = obj?.read ?? false;
    this.guestLoggedIn = obj?.guestLoggedIn ?? false;
  }

  public toJSON() {
    return {
      name: this.name,
      vorname: this.vorname,
      email: this.email,
      brand: this.brand,
      createdAt: this.createdAt,
      read: this.read,
      guestLoggedIn: this.guestLoggedIn
    };
  }
}
