<template>
    <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Reset Password</h2>
        </div>
        <form class="mt-8 space-y-6" @submit.prevent="resetPassword">
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="email" class="sr-only">Email</label>
              <input id="email" v-model="email" name="email" type="email" autocomplete="email" required
                     class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 
                            placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 
                            focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email">
            </div>
            <div>
              <label for="password" class="sr-only">Contraseña</label>
              <input id="password" v-model="password" name="password" type="password" autocomplete="new-password" required
                     class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 
                            placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 
                            focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Contraseña">
            </div>
            <div>
              <label for="confirmPassword" class="sr-only">Confirmar Contraseña</label>
              <input id="confirmPassword" v-model="confirmPassword" name="confirmPassword" type="password" autocomplete="new-password" required
                     class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 
                            placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 
                            focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Confirmar Contraseña">
            </div>
          </div>
  
          <div>
            <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent 
                                        text-sm font-medium rounded-md text-white bg-indigo-600 
                                        hover:bg-indigo-700 focus:outline-none focus:ring-2 
                                        focus:ring-offset-2 focus:ring-indigo-500">
              Reset password
            </button>
          </div>
        </form>
      </div>
    </div>
</template>
  
<script>
import {userService} from './../services/userService.js';
import Swal from 'sweetalert2';

    export default {
    data() {
        return {
            email: '',
            password: '',
            confirmPassword: ''
        };
    },
    methods: {
    async resetPassword() {
        const status = await userService.resetPass({email: this.email, password: this.password, confirm_password: this.confirmPassword})
        console.log(status)
        if(status === 204){
          this.redirect();
        }
        else{
          Swal.fire("Error en las credenciales");
        }
    },
    redirect(){
        this.$router.push('/');
    }
  }
};
</script>
  