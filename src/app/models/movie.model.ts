export interface Movie {
  id?: number; // the ? means this attribute is optional
  title: string;
  overview?: string;
  releaseDate?: string;
  status: string;
  rating?: string;
  platform: string;
  coverUrl?: string; // the ? means this is optional
}
