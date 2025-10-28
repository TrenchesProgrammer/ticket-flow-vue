<script setup lang="ts">
import Navbar from './components/Navbar.vue';
</script>

<template>
  <div >
    <Navbar />
    <main class="">
      <router-view />
    </main>
  </div>
</template>