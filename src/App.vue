<script setup lang="ts">
import Navbar from './components/Navbar.vue';
</script>

<template>
  <div class="max-w-[1440px] mx-auto">
    <Navbar />
    <main class="">
      <router-view />
    </main>
  </div>
</template>