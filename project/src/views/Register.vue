<template>
    <div class="max-w-md mx-auto mt-10">
      <h2 class="text-2xl font-bold mb-4">Register</h2>
      <form @submit.prevent="submitForm" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-white">Nombre</label>
          <input
            v-model="name"
            type="text"
            id="name"
            name="name"
            autocomplete="name"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-white">Correo Electrónico</label>
          <input
            v-model="email"
            type="email"
            id="email"
            name="email"
            autocomplete="email"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <button type="submit" class="w-full bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
            Register
          </button>
        </div>
      </form>
    </div>
  </template>
  
<script>
import {userService} from './../services/userService.js';
import Swal from 'sweetalert2';

  export default {
    data() {
      return {
        name: '',
        email: ''
      };
    },
    methods: {
      async submitForm() {
        const status = await userService.create({name: this.name, email: this.email});
        status == 201 ? Swal.fire("email enviado") : Swal.fire("Error al enviar el email");
      }
    }
  };
</script>
  

  