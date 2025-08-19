export type Cliente = {
  id: number;
  name: usuario;
  address: Address;
};

interface usuario {
  firstname: string;
  lastname: string;
}

interface Address {
  geolocation: Geolocation;
  city: string;
  street: string;
  number: number;
  zipcode: string;
}

interface Geolocation {
  lat: string;
  long: string;
}
