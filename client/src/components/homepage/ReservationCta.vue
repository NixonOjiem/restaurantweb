<script setup lang="ts">


defineOptions({
  name: 'ReservationCta'
});
</script>

<template>
  <section class="relative py-32 lg:py-40 flex items-center justify-center overflow-hidden">

    <div class="absolute inset-0 z-0 bg-cover bg-center bg-fixed transform scale-105"
      style="background-image: url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80');">
    </div>

    <div class="absolute inset-0 z-10 bg-linear-to-b from-stone-950/80 via-stone-900/60 to-stone-950"></div>

    <div class="relative z-20 mx-auto px-4">
      <div class="max-w-4xl mx-auto text-center">

        <div
          class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/30 bg-red-900/20 backdrop-blur-md mb-8 animate-fade-in-up">
          <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          <span class="text-red-200 text-xs font-bold tracking-[0.2em] uppercase">Reservations Open</span>
        </div>

        <h2 class="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-2xl">
          Taste the <span class="italic text-red-500">Experience</span>
        </h2>

        <div class="flex items-center justify-center gap-4 mb-8 opacity-50">
          <div class="h-px w-12 bg-white"></div>
          <div class="w-2 h-2 rotate-45 border border-white"></div>
          <div class="h-px w-12 bg-white"></div>
        </div>

        <p class="text-lg md:text-xl text-stone-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          From intimate candlelit dinners to grand celebrations. Secure your table today and let us
          orchestrate an unforgettable evening for you.
        </p>

        <div class="flex flex-col sm:flex-row justify-center gap-6">

          <button
            class="group relative px-10 py-5 bg-red-700 text-white rounded-full font-bold text-lg tracking-wide shadow-[0_0_20px_rgba(185,28,28,0.4)] overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] hover:-translate-y-1 hover:bg-red-600">
            <span class="relative z-10 flex items-center gap-2">
              Book a Table
              <svg xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </span>
            <div
              class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/20 to-transparent">
            </div>
          </button>

          <button
            class="group px-10 py-5 bg-transparent border border-white/30 backdrop-blur-sm text-white rounded-full font-bold text-lg tracking-wide transition-all duration-300 hover:bg-white hover:text-stone-950 hover:border-white hover:-translate-y-1">
            <span class="flex items-center gap-2">
              Order Online
              <svg xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </span>
          </button>

        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Optional: Only if you want extra smooth entrance animations */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 1s ease-out forwards;
}
</style>
