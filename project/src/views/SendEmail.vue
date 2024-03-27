<template>
    <div class="max-w-md mx-auto mt-8">
      <form @submit.prevent="sendEmail" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
          <input v-model="email" type="email" id="email" placeholder="Enter your email" 
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <div class="flex items-center justify-between">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Send Email
          </button>
        </div>
      </form>
    </div>
  </template>
  
<script>
import {userService} from './../services/userService.js';
  export default {
    data() {
      return {
        email: '',
      };
    },
    methods: {
      async sendEmail() {
        await userService.sendEmail({email: this.email});
      }
    },
  };
</script>
  
