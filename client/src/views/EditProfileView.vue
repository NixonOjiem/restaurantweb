<template>
    <div class="flex flex-col min-h-screen bg-[#FFFAEB]">
        <NavbarComponent />

        <main class="grow">
            <EditProfile />
        </main>
        <FooterComponent />
    </div>
</template>

<script setup lang="ts">
import FooterComponent from '@/components/layouts/FooterComponent.vue';
import NavbarComponent from '@/components/layouts/NavbarComponent.vue';
import EditProfile from '@/components/profilepage/EditProfile.vue';
</script>