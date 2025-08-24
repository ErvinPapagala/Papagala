export type Availability = 'available' | 'sold';

export interface Parrot {
  id: string;
  name: string;
  species: string;
  age_months: number;
  price_eur: number;
  availability: Availability;
  cover_image_url?: string | null;
  image_urls?: string[] | null;
  description?: string | null;
  training_basic_eur?: number | null;
  training_advanced_eur?: number | null;
  created_at?: string;
}

export interface TrainingPlan {
  id: string;
  title: string;
  description?: string | null;
  price_eur: number;
  created_at?: string;
}

