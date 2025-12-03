<template>
  <div class="profile-card">
    <div class="card-header">
      <div class="avatar-circle">
        <!-- Initials generator -->
        <span v-if="user?.name">{{ user.name.charAt(0).toUpperCase() }}</span>
        <span v-else>U</span>
      </div>
    </div>

    <div class="card-body">
      <h2 class="username">
        {{ user?.name || 'Guest User' }}
      </h2>
      <p class="email">
        {{ user?.email || 'No email provided' }}
      </p>

      <div class="stats-row">
        <div class="stat">
          <span class="label">ID</span>
          <span class="value">#{{ user?.id || '---' }}</span>
        </div>
        <div class="stat">
          <span class="label">Role</span>
          <span class="value">{{ user?.role || 'Customer' }}</span>
        </div>
      </div>

      <button class="edit-btn">Edit Profile</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
// Extract reactive refs from the store
const { user } = storeToRefs(authStore);
</script>

<style scoped>
.profile-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  text-align: center;
  height: 100%;
}

.card-header {
  background: linear-gradient(135deg, #FFC400, #FF8C00);
  height: 100px;
  position: relative;
  margin-bottom: 50px;
}

.avatar-circle {
  width: 80px;
  height: 80px;
  background: #222;
  color: #fff;
  border-radius: 50%;
  border: 4px solid white;
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
}

.card-body {
  padding: 0 20px 30px;
}

.username {
  margin: 0;
  color: #333;
  font-size: 1.5rem;
}

.email {
  color: #666;
  margin-top: 5px;
  font-size: 0.95rem;
}

.stats-row {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin: 25px 0;
  padding: 15px 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}

.stat {
  display: flex;
  flex-direction: column;
}

.stat .label {
  font-size: 0.75rem;
  text-transform: uppercase;
  color: #888;
  letter-spacing: 1px;
}

.stat .value {
  font-weight: 600;
  color: #222;
  margin-top: 4px;
}

.edit-btn {
  background: transparent;
  border: 2px solid #222;
  color: #222;
  padding: 10px 24px;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.edit-btn:hover {
  background: #222;
  color: white;
}
</style>
