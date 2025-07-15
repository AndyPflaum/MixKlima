export class CustomerDate {
  name: string;
  vorname: string;
  email: string;
  telefonnummer: string;
  handynummer: string;
  postalCode: string;
  location: string;
  street: string;
  brand: string;
  model: string;
  createdAt: Date;
  read: boolean;
  guestLoggedIn: boolean;

  constructor(obj?: Partial<CustomerDate>) {
    this.name = obj?.name || '';
    this.vorname = obj?.vorname || '';
    this.email = obj?.email || '';
    this.telefonnummer = obj?.telefonnummer || '';
    this.handynummer = obj?.handynummer || '';
    this.postalCode = obj?.postalCode || '';
    this.location = obj?.location || '';
    this.street = obj?.street || '';
    this.brand = obj?.brand || '';
    this.model = obj?.model || '';
    this.createdAt = obj?.createdAt ? new Date(obj.createdAt) : new Date();
    this.read = obj?.read ?? false;
    this.guestLoggedIn = obj?.guestLoggedIn ?? false;
  }

  public toJSON() {
    return {
      name: this.name,
      vorname: this.vorname,
      email: this.email,
      telefonnummer: this.telefonnummer,
      handynummer: this.handynummer,
      postalCode: this.postalCode,
      location: this.location,
      street: this.street,
      brand: this.brand,
      model: this.model,
      createdAt: this.createdAt,
      read: this.read,
      guestLoggedIn: this.guestLoggedIn
    };
  }
}
