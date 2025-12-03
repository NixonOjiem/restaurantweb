export interface ProductProps {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
    rating: number;
    reviewCount: number;
    isWishlisted: boolean;
    badge?: string;
}