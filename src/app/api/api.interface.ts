export interface DataFormat {
  name: string,
  value: number
}

export interface Location {
  id: number,
  country: string,
  country_code: string,
  province: string,
  coordinates: Coordinates,
  latest: Latest
}

export interface Latest {
  confirmed: number,
  deaths: number,
  recovered: number
}

export interface Coordinates {
  latitude: number,
  longitude: number
}
