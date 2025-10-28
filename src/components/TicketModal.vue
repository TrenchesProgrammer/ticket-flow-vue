<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{ (e: 'close'): void; (e: 'add-ticket', title: string, description: string): void }>()

const title = ref('')
const description = ref('')

const handleAddTicket = () => {
  if (title.value.trim() && description.value.trim()) {
    emit('add-ticket', title.value, description.value)
    emit('close')
  }
}

const handleCancel = () => {
  emit('close')
}
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold mb-4">Add New Ticket</h2>
      <form @submit.prevent="handleAddTicket">
        <div class="mb-4">
          <label for="title" class="block text-gray-700 font-semibold mb-2">Title</label>
          <input
            v-model="title"
            type="text"
            id="title"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div class="mb-4">
          <label for="description" class="block text-gray-700 font-semibold mb-2">Description</label>
          <textarea
            v-model="description"
            id="description"
            rows="4"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>
        <div class="flex justify-end space-x-4">
          <button
            type="button"
            @click="handleCancel"
            class="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Add Ticket
          </button>
        </div>
      </form>
    </div>
  </div>
</template>