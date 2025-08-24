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
  video_urls?: string[] | null;
  description?: string | null;
  training_basic_eur?: number | null;
  training_advanced_eur?: number | null;
  created_at?: string;
  // Additional detailed fields
  weight_grams?: number | null;
  color?: string | null;
  temperament?: string | null;
  health_status?: string | null;
  training_level?: string | null;
  can_talk?: boolean | null;
  is_hand_fed?: boolean | null;
  has_health_certificate?: boolean | null;
  has_breeding_certificate?: boolean | null;
  has_cites_permit?: boolean | null;
  has_microchip?: boolean | null;
}

export interface TrainingPlan {
  id: string;
  title: string;
  description?: string | null;
  price_eur: number;
  created_at?: string;
}

