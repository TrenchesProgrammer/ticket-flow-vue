<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getSession } from '../utils/auth'
import { useRouter } from 'vue-router'
import { v4 as uuidv4 } from 'uuid'
import TicketModal from '../components/TicketModal.vue'
import TicketDetailsModal from '../components/TicketDetailsModal.vue'
import ConfirmationModal from '../components/ConfirmationModal.vue'
import type { Session, Ticket } from '../types'

const router = useRouter()
const session = ref<Session | null>(null)
const tickets = ref<Ticket[]>([])
const isModalOpen = ref(false)
const selectedTicket = ref<Ticket | null>(null)
const isConfirmModalOpen = ref(false)
const ticketToDelete = ref<string | null>(null)

onMounted(() => {
  const sessionData = getSession()
  if (!sessionData) {
    router.push('/login')
  } else {
    session.value = sessionData
    const saved = localStorage.getItem('ticketapp_tickets')
    if (saved) {
      tickets.value = JSON.parse(saved)
    }
  }
})

const handleAddTicket = (title: string, description: string) => {
  if (!title.trim() || !description.trim()) return

  const newTicket: Ticket = {
    id: uuidv4(),
    user: session.value!.email,
    title,
    description,
    status: 'open',
    date: new Date().toISOString().split('T')[0]
  }

  const updated = [...tickets.value, newTicket]
  tickets.value = updated
  localStorage.setItem('ticketapp_tickets', JSON.stringify(updated))
}

const handleUpdateTicket = (updatedTicket: Ticket) => {
  const updatedTickets = tickets.value.map((ticket) =>
    ticket.id === updatedTicket.id ? updatedTicket : ticket
  )
  tickets.value = updatedTickets
  localStorage.setItem('ticketapp_tickets', JSON.stringify(updatedTickets))
  selectedTicket.value = null
}

const handleDeleteTicket = (ticketId: string) => {
  ticketToDelete.value = ticketId
  isConfirmModalOpen.value = true
}

const confirmDelete = () => {
  if (ticketToDelete.value) {
    const updatedTickets = tickets.value.filter((ticket) => ticket.id !== ticketToDelete.value)
    tickets.value = updatedTickets
    localStorage.setItem('ticketapp_tickets', JSON.stringify(updatedTickets))
    selectedTicket.value = null // Close the details modal
    isConfirmModalOpen.value = false // Close the confirm modal
    ticketToDelete.value = null
  }
}

const statusColors: { [key: string]: string } = {
  open: 'bg-green-200 text-green-800',
  in_progress: 'bg-amber-200 text-amber-800',
  closed: 'bg-gray-200 text-gray-800'
}
</script>

<template>
  <div v-if="session" class="padding-container py-10">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-semibold">Your Tickets</h2>
      <button @click="isModalOpen = true" class="bg-green-400 text-white px-4 py-2 rounded">
        Add Ticket
      </button>
    </div>

    <TicketModal
      v-if="isModalOpen"
      @close="isModalOpen = false"
      @add-ticket="handleAddTicket"
    />

    <TicketDetailsModal
      v-if="selectedTicket"
      :ticket="selectedTicket"
      @close="selectedTicket = null"
      @delete="handleDeleteTicket"
      @update="handleUpdateTicket"
    />

    <ConfirmationModal
      v-if="isConfirmModalOpen"
      message="Are you sure you want to delete this ticket?"
      @confirm="confirmDelete"
      @cancel="isConfirmModalOpen = false"
    />

    <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div
        v-for="ticket in tickets.filter((t) => t.user === session?.email)"
        :key="ticket.id"
        @click="selectedTicket = ticket"
        class="border p-4 rounded-lg shadow-md bg-white flex flex-col justify-between cursor-pointer hover:shadow-lg transition-shadow"
      >
        <div>
          <h3 class="font-bold text-lg mb-2">{{ ticket.title }}</h3>
          <p class="text-sm text-gray-600 mb-2 line-clamp-2">{{ ticket.description }}</p>
        </div>
        <div class="text-sm text-gray-500 mt-2">
          <span
            :class="`px-2 py-1 rounded-full text-xs ${statusColors[ticket.status] || statusColors.closed}`"
          >
            {{ ticket.status }}
          </span>
          <p class="mt-2">{{ ticket.date }}</p>
        </div>
      </div>
    </div>
  </div>
</template>