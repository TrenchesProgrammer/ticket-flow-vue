<script setup lang="ts">
defineProps<{ message: string }>()
defineEmits<{ (e: 'confirm'): void; (e: 'cancel'): void }>()
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
      <p class="text-lg mb-4">{{ message }}</p>
      <div class="flex justify-end space-x-4">
        <button
          @click="$emit('cancel')"
          class="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          @click="$emit('confirm')"
          class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>
