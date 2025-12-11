<template>
  <div class="space-y-6 pt-6 pr-4">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold text-slate-900">Dashboard</h1>
      <p class="text-slate-500">Welcome back! Here's what's happening with your restaurant.</p>
    </div>

    <!-- Stats Grid -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div v-for="stat in stats" :key="stat.label"
        class="border border-slate-300 bg-white/50 backdrop-blur-sm p-6 rounded-lg">
        <div class="flex items-start justify-between">

          <!-- Labels & Numbers -->
          <div class="space-y-2">
            <p class="text-sm text-slate-500 font-medium">{{ stat.label }}</p>
            <p class="text-3xl font-bold text-slate-800">{{ stat.value }}</p>

            <!-- Change -->
            <p v-if="stat.change">
              <span :class="{
                'text-indigo-600': stat.changeType === 'positive',
                'text-red-500': stat.changeType === 'negative',
                'text-slate-500': stat.changeType === 'neutral'
              }" class="font-medium text-sm flex items-center gap-1">


                {{ stat.change }}
              </span>
            </p>
          </div>

          <!-- Icon -->
          <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600/20 text-indigo-600">
            <component :is="stat.icon" class="h-6 w-6" />
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DollarSign, ShoppingBag, TrendingUp, Users } from 'lucide-vue-next';

const stats = [
  {
    label: 'Total Orders',
    value: 1280,
    icon: ShoppingBag,
    change: '+8.2% from last month',
    changeType: 'positive'
  },
  {
    label: 'Total Revenue',
    value: '$45,600',
    icon: DollarSign,
    change: '+12.5% from last month',
    changeType: 'positive'
  },
  {
    label: 'Active Users',
    value: 320,
    icon: Users,
    change: '+45.4% from last month',
    changeType: 'positive'
  },
  {
    label: 'Avg. Order Value',
    value: 85,
    icon: TrendingUp,
    change: '-2.4% from last month',
    changeType: 'negative'
  }
];
</script>
