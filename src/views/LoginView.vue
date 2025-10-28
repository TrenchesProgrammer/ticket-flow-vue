<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../utils/auth';
import { useToast } from 'vue-toastification';

const router = useRouter();
const toast = useToast();

const email = ref('');
const password = ref('');
const errors = ref({ email: '', password: '', general: '' });

const validate = () => {
  const newErrors = { email: '', password: '', general: '' };
  let isValid = true;
  if (!email.value) {
    newErrors.email = 'Email is required';
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(email.value)) {
    newErrors.email = 'Invalid email format';
    isValid = false;
  }
  if (!password.value) {
    newErrors.password = 'Password is required';
    isValid = false;
  }

  errors.value = newErrors;
  return isValid;
};

const handleSubmit = () => {
  if (!validate()) return;

  const result = login(email.value, password.value);

  if (!result.success) {
    toast.error(result.message);
    return;
  }

  toast.success(result.message);
  router.push('/dashboard');
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Welcome Back!</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Sign in to continue to TicketFlow
        </p>
      </div>
      <form @submit.prevent="handleSubmit" class="mt-8 space-y-6 bg-white p-8 shadow-md rounded-lg">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              v-model="email"
              @input="errors.email = ''"
            />
            <p v-if="errors.email" class="text-red-600 text-xs pt-1">{{ errors.email }}</p>
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              v-model="password"
              @input="errors.password = ''"
            />
            <p v-if="errors.password" class="text-red-600 text-xs pt-1">{{ errors.password }}</p>
          </div>
        </div>

        <p v-if="errors.general" class="text-red-600 text-sm text-center">{{ errors.general }}</p>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Sign in
          </button>
        </div>
        <p class="text-center text-sm">
          <router-link to="/signup" class="font-medium text-green-600 hover:text-green-500">
            Don't have an account? Sign up
          </router-link>
        </p>
      </form>
    </div>
  </div>
</template>