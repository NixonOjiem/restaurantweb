<template>
    <footer class="relative mt-auto w-full z-10">

        <div class="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-indigo-500/20 to-transparent">
        </div>

        <div class="bg-slate-900/40 backdrop-blur-md border-t border-white/5 py-6 px-8">
            <div class="flex flex-col md:flex-row items-center justify-between gap-4">

                <div class="text-slate-500 text-sm flex items-center gap-2">
                    <span>&copy; {{ currentYear }} <span class="text-slate-300 font-semibold tracking-wide">Nexus<span
                                class="text-indigo-400">Admin</span></span>.</span>
                    <span class="hidden md:inline text-slate-700">|</span>
                    <span class="hidden md:inline">Crafted with precision.</span>
                </div>

                <div class="flex items-center gap-6 text-sm">

                    <nav class="flex items-center gap-6">
                        <a href="#"
                            class="text-slate-400 hover:text-indigo-400 transition-colors duration-200">Support</a>
                        <a href="#"
                            class="text-slate-400 hover:text-indigo-400 transition-colors duration-200">License</a>
                    </nav>

                    <div class="w-px h-4 bg-white/10"></div>

                    <div
                        class="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                        <span class="relative flex h-2 w-2">
                            <span
                                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span class="text-xs font-medium text-emerald-400">System Normal</span>
                    </div>

                    <span class="text-xs font-mono text-slate-600">v2.4.0</span>
                </div>

            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped></style>