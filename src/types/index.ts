
export interface Cheat {
  id: string;
  title: string;
  game: string;
  description: string;
  features: string[];
  price: number;
  discountPercentage?: number;
  imageUrl: string;
  videoUrl?: string;
  compatibility: string[];
  releaseDate: string;
  lastUpdate: string;
  tags: string[];
  rating: number;
  totalReviews: number;
}

export interface CartItem {
  cheat: Cheat;
  quantity: number;
}
