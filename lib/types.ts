export interface IComment {
  name: string;
  comment: string;
  stars: number;
}

export interface IRating {
  rate: number;
  count: number;
}

export interface IProduct {
  id: number;
  category: string;
  description: string;
  image: string;
  title: string;
  price: number;
  rating?: IRating;
}

export interface ICartObject {
  userId: number;
  date: Date;
  products: { productId: IProduct["id"]; quantity: number }[];
}
