<template>
  <div class="profile-card">
    <div class="card-header">
      <div class="header-pattern"></div>

      <div class="avatar-circle">
        <span v-if="user?.name">{{ user.name.charAt(0).toUpperCase() }}</span>
        <span v-else>U</span>
      </div>
    </div>

    <div class="card-body">
      <div class="user-identity">
        <h2 class="username">
          {{ user?.name || 'Guest User' }}
        </h2>
        <p class="email">
          {{ user?.email || 'No email provided' }}
        </p>
        <div class="role-badge">{{ user?.role || 'Customer' }}</div>
      </div>

      <div class="info-grid">
        <div class="info-item">
          <span class="label">Member ID</span>
          <span class="value">#{{ user?.id || '---' }}</span>
        </div>
        <div class="info-item">
          <span class="label">Status</span>
          <span class="value active">Active</span>
        </div>
      </div>

      <div class="action-buttons">
        <button class="btn btn-outline" @click="handleEdit">
          Edit Profile
        </button>
        <button class="btn btn-primary" @click="handleLogout">
          Log Out
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const { user } = storeToRefs(authStore);

const handleEdit = () => {
  console.log('Edit profile clicked');
  // router.push('/profile/edit');
};

const handleLogout = async () => {
  // Assuming your authStore has a logout action
  if (authStore.logout) {
    await authStore.logout();
  }
  // Redirect to login or home
  router.push('/login');
};
</script>

<style scoped>
.profile-card {
  background: white;
  border-radius: 12px;
  /* Soft shadow for depth */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  text-align: center;
  height: 100%;
  border: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
}

/* --- Header Section --- */
.card-header {
  background-color: #1a1a1a;
  /* Black */
  height: 110px;
  position: relative;
  margin-bottom: 50px;
}

/* Optional: Adds a subtle texture or line to the header */
.header-pattern {
  width: 100%;
  height: 100%;
  opacity: 0.1;
  background-image: repeating-linear-gradient(45deg,
      transparent,
      transparent 10px,
      #fff 10px,
      #fff 11px);
}

.avatar-circle {
  width: 86px;
  height: 86px;
  background: #c62828;
  /* Restaurant Red */
  color: #fff;
  border-radius: 50%;
  border: 4px solid white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  position: absolute;
  bottom: -43px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
  font-family: serif;
  /* Elegant serif for initial */
  font-weight: bold;
}

/* --- Body Section --- */
.card-body {
  padding: 0 24px 30px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.user-identity {
  margin-bottom: 25px;
}

.username {
  margin: 0;
  color: #1a1a1a;
  font-family: 'Playfair Display', serif;
  /* Or standard serif */
  font-size: 1.75rem;
  letter-spacing: -0.5px;
}

.email {
  color: #666;
  margin-top: 4px;
  font-size: 0.9rem;
}

.role-badge {
  display: inline-block;
  margin-top: 10px;
  background: #FFF7E0;
  /* Using your cream color */
  color: #c62828;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: 20px;
  letter-spacing: 1px;
}

/* --- Stats Grid --- */
.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: auto;
  /* Pushes buttons to bottom if height is fixed */
  padding: 20px 0;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
}

.info-item {
  display: flex;
  flex-direction: column;
}

.info-item .label {
  font-size: 0.7rem;
  text-transform: uppercase;
  color: #999;
  letter-spacing: 1px;
  margin-bottom: 4px;
}

.info-item .value {
  font-weight: 600;
  color: #333;
  font-size: 1rem;
}

.info-item .value.active {
  color: #2e7d32;
  /* Green for status */
}

/* --- Buttons --- */
.action-buttons {
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.btn {
  width: 100%;
  padding: 12px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  letter-spacing: 0.5px;
}

/* Edit Button (Outlined Black) */
.btn-outline {
  background: transparent;
  border: 1px solid #e0e0e0;
  color: #1a1a1a;
}

.btn-outline:hover {
  border-color: #1a1a1a;
  background: #f9f9f9;
}

/* Logout Button (Red) */
.btn-primary {
  background: #c62828;
  /* Red */
  border: 1px solid #c62828;
  color: white;
}

.btn-primary:hover {
  background: #b71c1c;
  /* Darker Red */
  box-shadow: 0 4px 12px rgba(198, 40, 40, 0.2);
}
</style>
