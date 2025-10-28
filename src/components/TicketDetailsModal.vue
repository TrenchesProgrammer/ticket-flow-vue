<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Ticket } from '../types'

const props = defineProps<{ ticket: Ticket }>()
const emit = defineEmits<{ (e: 'close'): void; (e: 'delete', id: string): void; (e: 'update', ticket: Ticket): void }>()

const editableTicket = ref<Ticket>({ ...props.ticket })

watch(
  () => props.ticket,
  (newTicket) => {
    editableTicket.value = { ...newTicket }
  }
)

const handleUpdate = () => {
  emit('update', editableTicket.value)
}

const handleDelete = () => {
  emit('delete', editableTicket.value.id)
}
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold">Ticket Details</h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-800">&times;</button>
      </div>
      <div>
        <h3 class="font-bold text-lg mb-2">{{ editableTicket.title }}</h3>
        <p class="text-sm text-gray-600 mb-4">{{ editableTicket.description }}</p>
        <div class="mb-4">
          <label for="status" class="block text-gray-700 font-semibold mb-2">Status</label>
          <select
            v-model="editableTicket.status"
            id="status"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        <div class="text-sm text-gray-500">
          <p>Date: {{ editableTicket.date }}</p>
        </div>
      </div>
      <div class="flex justify-end space-x-4 mt-6">
        <button
          @click="handleDelete"
          class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Delete
        </button>
        <button
          @click="handleUpdate"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Save & Close
        </button>
      </div>
    </div>
  </div>
</template>
