<template>
   <div class="pt-6 pr-4">
     <section class="flex items-center justify-between">
       <div>
         <h1 class="text-2xl font-bold text-foreground">Menu Items</h1>
         <p class="text-muted-foreground">Manage your restaurant&apos;s menu</p>
        </div>
        <AddMenuItemDialog/>
    </section>
   </div>
</template>



<script setup lang="ts" >
import  AddMenuItemDialog from '@/components/admin/AddMenuItemDialog.vue';


</script>
