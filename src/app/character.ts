interface ApiCharacterData {
  belong: string
  distance: number
  id: number
  image: string
  image_full: string
  latitude: number
  location: string
  longitude: number
  name: string
  official: boolean
  profile: string
  review: number
  review_count: number
  source: string
}

export interface Character extends ApiCharacterData {
  percentage: number
}
