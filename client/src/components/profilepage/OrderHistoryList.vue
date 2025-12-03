<template>
  <div class="orders-container">
    <div class="section-header">
      <h3>Recent Orders</h3>
      <button class="view-all">View All</button>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="loading-state">
      Loading orders...
    </div>

    <!-- Empty State -->
    <div v-else-if="orders.length === 0" class="empty-state">
      No orders found. Time to eat!
    </div>

    <!-- Orders List -->
    <div v-else class="orders-list">
      <div v-for="order in orders" :key="order.id" class="order-item">

        <div class="order-icon">
          🍽️
        </div>

        <div class="order-details">
          <h4>{{ order.itemName }}</h4>
          <span class="order-date">{{ formatDate(order.date) }}</span>
        </div>

        <div class="order-meta">
          <span class="price">${{ order.price.toFixed(2) }}</span>
          <span :class="['status-badge', order.status.toLowerCase()]">
            {{ order.status }}
          </span>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// interface for type safety
interface Order {
  id: string;
  itemName: string;
  date: string;
  status: 'Delivered' | 'Cooking' | 'Cancelled' | 'En Route';
  price: number;
}

const orders = ref<Order[]>([]);
const isLoading = ref(true);

// Mock API Call
const fetchOrders = async () => {
  try {
    isLoading.value = true;

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock Data
    orders.value = [
      { id: '101', itemName: 'Spicy Ramen Bowl', date: '2023-10-24T14:30:00', status: 'Cooking', price: 14.50 },
      { id: '102', itemName: 'Truffle Burger', date: '2023-10-22T19:00:00', status: 'Delivered', price: 18.00 },
      { id: '103', itemName: 'Caesar Salad', date: '2023-10-20T12:15:00', status: 'Delivered', price: 10.50 },
      { id: '104', itemName: 'Iced Latte', date: '2023-10-18T09:00:00', status: 'Cancelled', price: 5.00 },
    ];
  } catch (error) {
    console.error("Failed to fetch orders", error);
  } finally {
    isLoading.value = false;
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });
};

onMounted(() => {
  fetchOrders();
});
</script>

<style scoped>
.orders-container {
  background: white;
  padding: 25px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  height: 100%;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-header h3 {
  margin: 0;
  font-size: 1.25rem;
  color: #333;
}

.view-all {
  background: none;
  border: none;
  color: #FF8C00;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.9rem;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.order-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 12px;
  background: #f9f9f9;
  transition: transform 0.2s;
}

.order-item:hover {
  transform: translateY(-2px);
  background: #f0f0f0;
}

.order-icon {
  font-size: 1.5rem;
  margin-right: 15px;
  background: white;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.order-details {
  flex: 1;
}

.order-details h4 {
  margin: 0 0 4px 0;
  font-size: 1rem;
  color: #333;
}

.order-date {
  font-size: 0.8rem;
  color: #888;
}

.order-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
}

.price {
  font-weight: 700;
  color: #333;
}

.status-badge {
  font-size: 0.75rem;
  padding: 4px 10px;
  border-radius: 20px;
  font-weight: 600;
  text-transform: capitalize;
}

/* Status Colors */
.status-badge.delivered {
  background: #e6fffa;
  color: #047857;
}

.status-badge.cooking {
  background: #fff7ed;
  color: #c2410c;
}

.status-badge.cancelled {
  background: #fef2f2;
  color: #b91c1c;
}

.status-badge.en.route {
  background: #eff6ff;
  color: #1d4ed8;
}

.loading-state,
.empty-state {
  text-align: center;
  color: #888;
  padding: 40px 0;
}
</style>
