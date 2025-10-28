<template>
  <div class="scroll-wrapper overflow-hidden whitespace-nowrap">
    <div class="scroll-track flex items-center animate-scroll">
      <p
        v-for="(item, idx) in duplicatedItems"
        :key="idx"
        class="text-4xl px-6"
      >
        BRAND
      </p>
    </div>
  </div>
</template>

<script setup>
const items = [1, 2, 3, 4, 5, 6, 7, 8]
const duplicatedItems = [...items, ...items] 
</script>

<style scoped>
.scroll-wrapper {
  width: 100%;
}

.scroll-track {
  width: max-content;
}

/* Smooth infinite scroll animation */
@keyframes scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

.animate-scroll {
  animation: scroll 12s linear infinite;
}
</style>
