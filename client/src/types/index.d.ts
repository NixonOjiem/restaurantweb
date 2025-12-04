export interface ProductProps {
  _id: string
  id?: string
  title: string
  slug: string
  price: number
  discountPrice?: number
  description: string
  image: string
  ingredients: string[]
  dietaryInfo: string[]
  isAvailable: boolean
  category: string
  badge: string[]
  rating?: number
  reviewCount?: number
  isWishlisted?: boolean
  // Fields added specifically for the Modal transformation
  sku?: string
  images?: string[] // The array of images for the gallery
}

export type ModalProduct = ProductProps & {
  id: string
  sku: string
  images: string[]
}
