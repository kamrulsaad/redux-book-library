export interface IBook {
  completed?: boolean;
  _id?: string;
  title: string;
  author: string;
  genre: string;
  publication_date: Date | undefined;
  image?: string;
}
