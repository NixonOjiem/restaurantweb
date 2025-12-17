<script setup lang="ts">
const dishes = [
  { id: 1, name: "Truffle Risotto", price: "$28", desc: "Wild mushrooms, parmesan crisp, white truffle oil.", img: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80" },
  { id: 2, name: "Pan-Seared Scallops", price: "$34", desc: "Cauliflower purée, crispy pancetta, lemon butter.", img: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&q=80" },
  { id: 3, name: "Wagyu Burger", price: "$24", desc: "Brioche bun, aged cheddar, caramelized onions.", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80" }
];
</script>

<template>
  <section class="py-20 bg-stone-100" id="menu">
    <div class=" mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-stone-900 mb-4">Chef's Selection</h2>
        <p class="text-stone-500 max-w-xl mx-auto">Hand-picked dishes that define our culinary identity for this
          season.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="dish in dishes" :key="dish.id"
          class="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300">
          <div class="h-64 overflow-hidden relative">
            <img :src="dish.img" :alt="dish.name"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
            <div
              class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-stone-900 font-bold shadow-sm">
              {{ dish.price }}
            </div>
          </div>
          <div class="p-8">
            <h3 class="text-2xl font-bold mb-2 group-hover:text-orange-600 transition-colors">{{ dish.name
            }}</h3>
            <p class="text-stone-500 mb-4">{{ dish.desc }}</p>
            <button
              class="text-sm font-bold uppercase tracking-wide text-stone-400 group-hover:text-stone-900 transition-colors">
              Add to Order &rarr;
            </button>
          </div>
        </div>
      </div>

      <div class="text-center mt-12">
        <button
          class="bg-stone-900 text-white px-8 py-3 rounded-full hover:bg-orange-600 transition-colors duration-300">
          View Full Menu
        </button>
      </div>
    </div>
  </section>
</template>
