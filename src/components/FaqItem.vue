<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ title: string }>()

const isOpen = ref(false)
</script>

<template>
  <div class="border-b border-gray-200 py-4">
    <button @click="isOpen = !isOpen" class="w-full flex justify-between items-center">
      <h3 class="font-semibold">{{ title }}</h3>
      <span>{{ isOpen ? '-' : '+' }}</span>
    </button>
    <div v-if="isOpen" class="mt-2 text-gray-600">
      <slot />
    </div>
  </div>
</template>

