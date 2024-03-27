<template>
    <div class="flex justify-center items-center flex-wrap space-x-4 p-10">
      <h2 v-if="cargando">Cargando...</h2>
      <div v-for="task in tasks" :key="task.id">
        <Card
          :taskMessage="task.description"
          :status="task.status"
          :id="task.id"
          @taskDeleted="handleTaskDeleted"
          @taskDescriptionChange= "handleChangeDescription" 
          @taskStatusChange="handleChangeStatus"
        />
      </div>
    </div>
    <div class="flex justify-center p-5">
      <button @click="addTask" class="px-5 py-3 bg-green-400 rounded-full duration-300 hover:bg-green-600">+</button>
    </div>
    <div v-if="addUser" class="flex flex-col flex-wrap">
      <div class="flex items-center justify-center flex-wrap">
        <textarea
        v-model="description"
        placeholder="Descripción"
        class="border border-gray-300 rounded-md px-3 py-2 mr-2 focus:outline-none focus:border-indigo-500 resize-none"
        ></textarea>
        <select name="users" v-model="selectedUserId" class="border border-gray-300 rounded-md px-3 py-2 mr-2 focus:outline-none focus:border-indigo-500">
          <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
        </select>
        <button @click="closeTask" class="px-3 py-1 bg-red-400 rounded-full duration-300 hover:bg-red-600 text-white">-</button>
        </div>
        <div class="flex items-center justify-center flex-wrap">
          <button @click="createTask" class="py-1 px-5 m-2 bg-cyan-200 rounded-md">Create</button>
        </div>
    </div>
  
  </template>
  
<script>
  import Card from './../components/Card.vue';
  import { taskService } from './../services/taskService.js';
  import { userService } from './../services/userService.js';
  
  export default {
    data() {
      return {
        tasks: [],
        cargando: true,
        addUser: false,
        users: [],
        selectedUserId: null,
        description: ''
      }
    },
    components: {
      Card
    },
    mounted() {
      this.getTasks();
    },
    methods: {
      async getTasks() {
        const fetchedTasks = await taskService.getAll();
        this.tasks = fetchedTasks;
        this.cargando = false;
      },
      async handleTaskDeleted(id) {
        await taskService.delete(id);
        await this.getTasks(); 
      },
      async handleChangeDescription(message, id){
        await taskService.updateDescription({description: message}, id);
        await this.getTasks(); 
      },
      async handleChangeStatus(status, id){
        const res = await taskService.updateStatus({status: status}, id);
        await this.getTasks(); 
      },
      async addTask(){
        this.addUser = true;
        const res = await userService.getAll();
        this.users = res;
      },
      closeTask(){
        this.addUser = false;
      },
      async createTask(){
        const res = await taskService.create({description: this.description, user_id: this.selectedUserId})
        this.addUser = false;
        await this.getTasks(); 
        this.description = '';
        this.selectedUserId = null;

      }
    },
  }
  </script>
  