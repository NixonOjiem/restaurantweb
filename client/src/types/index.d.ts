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

export interface MenuItem {
  _id: string
  title: string
  slug: string
  price: number
  category: string
  image: string
  id: string
}

export interface CartItem {
  _id: string
  menuItem: MenuItem
  quantity: number
  price: number
  instructions: string
  total: number
}

export interface CartData {
  _id: string
  user: string
  items: CartItem[]
  totalQuantity: number
  totalPrice: number
  status: string
  createdAt: Date | string
  updatedAt: Date | string
  __v: number
  id: string
}
