<template>
  <div>
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-lg shadow-lg p-4 w-full md:max-w-3xl">
        <!-- <h2 class="text-xl font-bold mb-2">{{ taskTitle }}</h2> -->
        <input class="mb-3 border-b border-gray-300 focus:outline-none focus:border-indigo-500 w-2/4" type="text" v-model="newDescription" required>
        <button @click="changeTitle"class="p-2 ml-3 bg-blue-300 rounded-md duration-300 hover:bg-blue-400">Change</button>
        <p class="text-gray-500">Estado: {{ taskStatus }}</p>

        <ListComments :id="id" />

        <button @click="close" class="mt-4 w-40 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md focus:outline-none">
          Cerrar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ListComments from './ListComments.vue';
import { taskService } from './../services/taskService.js';

export default {
  data() {
    return {
      showModal: false,
      comments: [],
      newDescription: ''
    };
  },
  props: {
    taskTitle: {
      type: String,
      required: true
    },
    taskStatus: {
      type: String,
      required: true
    },
    popUp: {
      type: Boolean,
      required: true
    },
    id: Number
  },
  watch: {
    popUp(value) {
      if (value) {
        this.showModal = true;
      } else {
        this.showModal = false;
      }
    }
  },
  methods: {
    close() {
      this.showModal = false;
      this.$emit('close');
    },
    async changeTitle(){
      await taskService.updateDescription({description: this.newDescription},this.id);
    },
  },
  components: { ListComments },
  mounted(){
    this.newDescription = this.taskTitle;
  }
};
</script>
