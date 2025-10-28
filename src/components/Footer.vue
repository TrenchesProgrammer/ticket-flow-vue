<style>
.footer-bg {
  background: radial-gradient(circle at center, #81c784, #66bb6a, #4caf50, #43a047, #388e3c);
}
</style>

<template>
  <div class="footer-bg mx-auto py-16 text-center rounded-2xl text-white">
    <h2 className="text-3xl font-semibold mb-3">Looking for a smarter way to manage tickets?</h2>
    <p className="text-blue-100 mb-6">
      TicketFlow lets you stay on top of every request, from start to finish.
    </p>
    <button
      className="bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition"
    >
      Get Started →
    </button>
  </div>

  <div class="flex flex-col md:flex-row justify-between items-center gap-6">
    <div>
      <h3 class="font-bold text-2xl">TICKET<span class="text-green-400">FLOW</span></h3>
      <p class="text-gray-500">Connecting people who help each other, no matter the distance.</p>
    </div>
    <div class="flex gap-8">
      <router-link to="/" class="hover:text-green-500">Home</router-link>
      <router-link to="/tickets" class="hover:text-green-500">Tickets</router-link>
      <router-link to="/dashboard" class="hover:text-green-500">Dashboard</router-link>
    </div>
    <div>
      <h4 className="font-semibold text-gray-800 mb-3">Join our newsletter</h4>
      <p className="text-sm text-gray-500 mb-4">
        Be the first to know when new features, stories, and updates drop.
      </p>
      <form className="flex gap-2">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full text-black bg-green-100  rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          type="submit"
          className="bg-green-400 text-white px-4 py-2 rounded-lg hover:bg-green-500 text-sm"
        >
          Subscribe
        </button>
      </form>
    </div>
  </div>
  <div class="border-t border-gray-200 py-8 mt-10">
      <div class="text-gray-500 flex justify-between">
        <p>&copy; {{ new Date().getFullYear() }} TicketFlow. All rights reserved.</p>
        <div class="flex gap-5">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>          
        </div>

      </div>
  </div>
</template>
