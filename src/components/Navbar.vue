<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

const isMenuOpen = ref(false);
const session = ref(getSession());
const route = useRoute();

function getSession() {
  if (typeof window !== 'undefined') {
    const sessionData = localStorage.getItem('ticketapp_session');
    return sessionData ? JSON.parse(sessionData) : null;
  }
  return null;
}

function logout() {
  localStorage.removeItem('ticketapp_session');
  session.value = null;
  // Assuming you have a router instance, you would navigate like this:
  // router.push('/login');
  // For now, we'll just reload the page to simulate the effect
  location.href = '/login';
}

const updateSession = () => {
  session.value = getSession();
};

onMounted(() => {
  window.addEventListener('storage', updateSession);
});

onUnmounted(() => {
  window.removeEventListener('storage', updateSession);
});

const navLinks = computed(() => {
  if (!session.value) {
    return [
      { href: '/', text: 'Home' },
      { href: '/login', text: 'Sign In' },
    ];
  } else {
    return [
      { href: '/', text: 'Home' },
      { href: '/dashboard', text: 'Dashboard' },
      { href: '/tickets', text: 'Tickets' },
    ];
  }
});
</script>

<template>
  <nav class="padding-container w-full py-5 relative">
    <div class="flex justify-between items-center">
      <router-link to="/">
        <h2 class="text-lg font-bold">
          Ticket<span class="text-green-400">Flow</span>
        </h2>
      </router-link>

      <!-- Hamburger Menu Button -->
      <div class="md:hidden">
        <button @click="isMenuOpen = !isMenuOpen">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path v-if="isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      <!-- Desktop Menu -->
      <ul class="hidden md:flex items-center gap-5 text-lg">
        <li v-for="link in navLinks" :key="link.href">
          <router-link :to="link.href" :class="{ 'text-black': route.path === link.href, 'text-gray-500': route.path !== link.href }" class="hover:text-black block py-2 md:py-0">{{ link.text }}</router-link>
        </li>
        <li v-if="session">
          <button @click="logout" class="cursor-pointer text-red-500 w-full text-left block py-2 md:py-0">
            Logout
          </button>
        </li>
      </ul>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isMenuOpen" class="md:hidden mt-4 bg-white shadow-lg rounded-lg p-4">
      <ul class="flex flex-col gap-4 text-lg">
        <li v-for="link in navLinks" :key="link.href">
          <router-link :to="link.href" :class="{ 'text-black': route.path === link.href, 'text-gray-500': route.path !== link.href }" class="hover:text-black block py-2 md:py-0">{{ link.text }}</router-link>
        </li>
        <li v-if="session">
          <button @click="logout" class="cursor-pointer text-red-500 w-full text-left block py-2 md:py-0">
            Logout
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>
