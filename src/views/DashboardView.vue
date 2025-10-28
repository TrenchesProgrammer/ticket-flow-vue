<script setup lang="ts">
import { getSession } from '../utils/auth'
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import type { Session, Ticket } from '../types'

const router = useRouter()
const session = ref<Session | null>(null)
const tickets = ref<Ticket[]>([])

onMounted(() => {
  const sessionData = getSession()
  if (!sessionData) {
    router.push('/login')
  } else {
    session.value = sessionData
    const allTickets: Ticket[] = JSON.parse(localStorage.getItem('ticketapp_tickets') || '[]')
    const userTickets = allTickets.filter((ticket) => ticket.user === sessionData.email)
    tickets.value = userTickets
  }
})

const ticketCounts = computed(() => ({
  total: tickets.value.length,
  open: tickets.value.filter((t) => t.status === 'open').length,
  in_progress: tickets.value.filter((t) => t.status === 'in_progress').length,
  closed: tickets.value.filter((t) => t.status === 'closed').length
}))

const recentTickets = computed(() =>
  [...tickets.value]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)
)

const statusColors: { [key: string]: string } = {
  open: 'bg-green-200 text-green-800',
  in_progress: 'bg-amber-200 text-amber-800',
  closed: 'bg-gray-200 text-gray-800'
}
</script>

<template>
  <div v-if="session" class="padding-container py-8">
    <header class="mb-8">
      <h1 class="text-3xl font-bold">Welcome, {{ session.fullname }}</h1>
      <p class="text-gray-500">Here’s a summary of your activity.</p>
    </header>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-gray-500">Total Tickets</h3>
        <p class="text-3xl font-bold">{{ ticketCounts.total }}</p>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-gray-500">Open</h3>
        <p class="text-3xl font-bold">{{ ticketCounts.open }}</p>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-gray-500">In Progress</h3>
        <p class="text-3xl font-bold">{{ ticketCounts.in_progress }}</p>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-gray-500">Closed</h3>
        <p class="text-3xl font-bold">{{ ticketCounts.closed }}</p>
      </div>
    </div>

    <!-- Recent Tickets -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-semibold">Recent Tickets</h2>
        <router-link
          to="/tickets"
          class="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          View All Tickets
        </router-link>
      </div>
      <ul class="space-y-4">
        <template v-if="recentTickets.length > 0">
          <li
            v-for="ticket in recentTickets"
            :key="ticket.id"
            class="border-b pb-2 flex justify-between items-center"
          >
            <div>
              <p class="font-semibold">{{ ticket.title }}</p>
              <p class="text-sm text-gray-500">{{ ticket.date }}</p>
            </div>
            <span
              :class="`px-3 py-1 rounded-full text-sm ${
                statusColors[ticket.status] || statusColors.closed
              }`"
            >
              {{ ticket.status.replace('_', ' ') }}
            </span>
          </li>
        </template>
        <template v-else>
          <p class="text-gray-500">You have no recent tickets.</p>
        </template>
      </ul>
    </div>
  </div>
</template>