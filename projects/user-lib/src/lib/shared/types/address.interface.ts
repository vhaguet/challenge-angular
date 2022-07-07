export interface GeoInterface {
  lat: string;
  lng: string;
}

export interface AddressInterface {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeoInterface;
}
