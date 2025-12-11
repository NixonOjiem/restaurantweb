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

interface OrderLocation {
  lat: number
  lng: number
}

interface DeliveryAddress {
  location: OrderLocation
  building: string
  doorNumber: string
  instructions: string
}

interface PaymentInfo {
  method: string
  mpesaNumber: string
  contactNumber: string
  status: string
}

interface OrderItem {
  _id: string
  // product can be a string ID OR an object with a title now
  product: string | { title: string }
  quantity: number
  price: number
  image: string
  name?: string
}

// The raw object from the database
interface BackendOrder {
  _id: string
  user: string
  items: OrderItem[]
  totalAmount: number
  orderStatus: string
  deliveryAddress: DeliveryAddress
  paymentInfo: PaymentInfo
  createdAt: string
  updatedAt: string
  __v: number
}

// The API Response wrapper
interface OrdersApiResponse {
  success: boolean
  count: number
  orders: BackendOrder[]
}

// --- Type for Frontend State (The 'orders' ref) ---

interface FrontendOrder {
  id: string
  date: string
  total: number
  status: string
  items: OrderItem[]
  isFeatured: boolean
}

export interface PopularItem {
  _id: string // Dish Name
  count: number
  revenue: number
}
export interface DailyRevenueItem {
  _id: string // Date string "YYYY-MM-DD"
  dailyTotal: number
}

export interface DashboardTotals {
  users: number
  menuItems: number
  revenue: number
  orders: number
}

export interface DashboardData {
  totals: DashboardTotals
  orderStatus: Record<string, number>
  paymentStatus: Record<string, number>
  popularItems: PopularItem[]
  dailyRevenue: DailyRevenueItem[]
}

export interface ApiResponse {
  success: boolean
  data: DashboardData
}
