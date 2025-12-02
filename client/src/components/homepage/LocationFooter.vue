<template>
    <footer class="bg-stone-950 text-stone-400 pt-20 pb-10">
        <div class="container mx-auto px-6">

            <div
                class="bg-orange-600 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-white mb-20 relative overflow-hidden">
                <div class="relative z-10">
                    <h3 class="text-2xl font-bold mb-2">Join the Inner Circle</h3>
                    <p class="opacity-90">Get exclusive offers and birthday treats.</p>
                </div>
                <div class="relative z-10 w-full md:w-auto flex gap-2">
                    <input type="email" placeholder="Your email address"
                        class="w-full md:w-80 px-4 py-3 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-orange-800">
                    <button
                        class="bg-stone-900 px-6 py-3 rounded-lg font-bold hover:bg-stone-800 transition-colors">Subscribe</button>
                </div>
                <div class="absolute -right-10 -bottom-20 w-64 h-64 bg-orange-500 rounded-full opacity-50"></div>
            </div>

            <div class="grid md:grid-cols-3 gap-12 mb-12">
                <div>
                    <h4 class="text-white font-bold text-lg mb-6">Contact Us</h4>
                    <p class="mb-2">123 Culinary Avenue, Food City</p>
                    <p class="mb-2">+1 (555) 123-4567</p>
                    <p>hello@therusticspoon.com</p>
                    <div class="flex gap-4 mt-6">
                        <div
                            class="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center hover:bg-orange-600 cursor-pointer transition-colors">
                            IG</div>
                        <div
                            class="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center hover:bg-orange-600 cursor-pointer transition-colors">
                            FB</div>
                    </div>
                </div>

                <div>
                    <h4 class="text-white font-bold text-lg mb-6">Opening Hours</h4>
                    <div class="flex justify-between border-b border-stone-800 py-2">
                        <span>Mon - Thu</span>
                        <span>11:00 AM - 10:00 PM</span>
                    </div>
                    <div class="flex justify-between border-b border-stone-800 py-2 text-orange-500">
                        <span>Fri - Sat</span>
                        <span>11:00 AM - 11:00 PM</span>
                    </div>
                    <div class="flex justify-between border-b border-stone-800 py-2">
                        <span>Sunday</span>
                        <span>10:00 AM - 9:00 PM</span>
                    </div>
                </div>

                <div class="h-64 bg-stone-800 rounded-xl overflow-hidden relative group">
                    <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80"
                        class="w-full h-full object-cover opacity-50 group-hover:opacity-75 transition-opacity"
                        alt="Map">
                    <div class="absolute inset-0 flex items-center justify-center">
                        <button class="bg-white text-stone-900 px-4 py-2 rounded-lg text-sm font-bold shadow-lg">Get
                            Directions</button>
                    </div>
                </div>
            </div>

            <div class="border-t border-stone-900 pt-8 text-center text-sm">
                &copy; 2023 The Rustic Spoon. All rights reserved.
            </div>
        </div>
    </footer>
</template>