<script setup lang="ts">
import { ref } from 'vue';
// Assuming your previous component is saved as ProductCard.vue
import ProductCard from './ProductCard.vue';

// Data Interface
interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
    rating: number;
    reviewCount: number;
    isWishlisted: boolean;
    badge?: string; // Optional badge text
}

// 10 Gourmet Food Items
const products = ref<Product[]>([
    {
        id: 1,
        title: 'Wagyu Truffle Burger',
        description: 'A5 Wagyu beef patty, black truffle aioli, caramelized onions, and aged gruyère on a brioche bun.',
        price: 32.00,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800',
        rating: 5,
        reviewCount: 128,
        isWishlisted: false,
        badge: 'Bestseller'
    },
    {
        id: 2,
        title: 'Seared Hokkaido Scallops',
        description: 'Pan-seared scallops served atop a creamy saffron risotto with asparagus tips and lemon zest.',
        price: 38.50,
        image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&q=80&w=800',
        rating: 5,
        reviewCount: 84,
        isWishlisted: true
    },
    {
        id: 3,
        title: 'Lobster Thermidor',
        description: 'Whole Maine lobster stuffed with a rich, creamy cognac mixture, mustard, and melted parmesan.',
        price: 65.00,
        image: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&q=80&w=800',
        rating: 4,
        reviewCount: 42,
        isWishlisted: false
    },
    {
        id: 4,
        title: 'Smoked Duck Salad',
        description: 'Thinly sliced smoked duck breast, pomegranate seeds, walnuts, and mixed greens with orange vinaigrette.',
        price: 24.00,
        image: 'https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?auto=format&fit=crop&q=80&w=800',
        rating: 4,
        reviewCount: 36,
        isWishlisted: false
    },
    {
        id: 5,
        title: 'Filet Mignon 8oz',
        description: 'Tenderloin steak cooked to perfection, served with garlic mashed potatoes and red wine reduction.',
        price: 48.00,
        image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=800',
        rating: 5,
        reviewCount: 210,
        isWishlisted: false,
        badge: 'Chef Choice'
    },
    {
        id: 6,
        title: 'Squid Ink Linguine',
        description: 'Handmade black pasta with clams, mussels, shrimp, and cherry tomatoes in a white wine sauce.',
        price: 29.00,
        image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=800',
        rating: 4,
        reviewCount: 55,
        isWishlisted: false
    },
    {
        id: 7,
        title: 'Molten Lava Cake',
        description: 'Warm dark chocolate cake with a liquid fudge center, served with Madagascar vanilla bean ice cream.',
        price: 14.00,
        image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&q=80&w=800',
        rating: 5,
        reviewCount: 340,
        isWishlisted: true
    },
    {
        id: 8,
        title: 'Artisan Cheese Board',
        description: 'Curated selection of imported cheeses, honeycomb, marcona almonds, figs, and rustic crackers.',
        price: 26.00,
        image: 'https://images.unsplash.com/photo-1631379578550-7038263db699?auto=format&fit=crop&q=80&w=800',
        rating: 4,
        reviewCount: 22,
        isWishlisted: false
    },
    {
        id: 9,
        title: 'Matcha Tiramisu',
        description: 'A Japanese twist on the classic Italian dessert, featuring matcha-soaked ladyfingers and mascarpone.',
        price: 12.00,
        image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=800',
        rating: 4,
        reviewCount: 45,
        isWishlisted: false
    },
    {
        id: 10,
        title: 'Mediterranean Mezze',
        description: 'Hummus, baba ghanoush, falafel, stuffed grape leaves, and warm pita bread.',
        price: 22.00,
        image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&q=80&w=800',
        rating: 5,
        reviewCount: 67,
        isWishlisted: false
    }
]);

// Handlers
const handleAddToCart = (id: number | string) => {
    console.log(`Added product ${id} to cart`);
    // Add your cart logic here (e.g., Pinia store action)
};

const handleToggleWishlist = (id: number | string) => {
    const product = products.value.find(p => p.id === id);
    if (product) {
        product.isWishlisted = !product.isWishlisted;
    }
};
</script>

<template>
    <div class="min-h-screen bg-[#FFF7E0] px-4 py-12 md:px-8 font-sans">

        <div class="max-w-7xl mx-auto mb-12 text-center">
            <h2 class="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">Our Menu</h2>
            <p class="text-gray-600 max-w-2xl mx-auto">
                Experience a symphony of flavors with our carefully curated selection of dishes.
            </p>
        </div>

        <div class="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">

            <ProductCard v-for="product in products" :key="product.id" :id="product.id" :title="product.title"
                :description="product.description" :price="product.price" :image="product.image"
                :rating="product.rating" :review-count="product.reviewCount" :is-wishlisted="product.isWishlisted"
                @add-to-cart="handleAddToCart" @toggle-wishlist="handleToggleWishlist">
                <template #badge v-if="product.badge">
                    <div
                        class="absolute top-3 left-3 bg-black/80 backdrop-blur-sm text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full shadow-lg">
                        {{ product.badge }}
                    </div>
                </template>
            </ProductCard>

        </div>
    </div>
</template>