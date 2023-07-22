export interface Province {
  id: string;
  name: string;
}

export interface ProvinceResponse {
  data: Province[];
}

export interface City {
  id: string;
  name: string;
}

export interface CityResponse {
  data: City[];
}

export interface Tag {
  id: string;
  name: string;
}

export interface TagListResponse {
  data: Tag[];
}
