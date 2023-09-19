export interface IReviews {
  id: number;
  user: string;
  rating: number;
  comment: string;
}

export interface IBooks {
  id: number;
  title: string;
  author: string;
  genre?: string;
  publication_date?: string;
  description?: string;
  image?: string;
  reviews?: IReviews[];

  avatar?: string;
}
