<script setup lang="ts">
import FaqItem from './FaqItem.vue'
</script>

<template>
  <div class="w-full">
    <h2 class="text-2xl text-center mb-6">Frequently Asked Questions</h2>
    <FaqItem title="How do I create a new ticket?">
      <p>To create a new ticket, simply click the "Add Ticket" button on your dashboard and fill out the required fields.</p>
    </FaqItem>
    <FaqItem title="Can I customize the ticket statuses?">
      <p>Yes, you can customize the ticket statuses to fit your team's workflow in the settings panel.</p>
    </FaqItem>
    <FaqItem title="Is there a mobile app?">
      <p>Currently, we have a responsive web application that works great on all devices. A native mobile app is on our roadmap.</p>
    </FaqItem>
    <FaqItem title="How can I track the progress of my tickets?">
      <p>You can track the progress of your tickets on the main dashboard, which provides real-time updates and status indicators for every ticket.</p>
    </FaqItem>
  </div>
</template>
