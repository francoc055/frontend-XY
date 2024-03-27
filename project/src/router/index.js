import { createRouter, createWebHistory } from 'vue-router'
import MyTasks from '@/views/MyTasks.vue'
import Tasks from '@/views/Tasks.vue'
import Login from '@/views/Login.vue'
import ResetPass from '@/views/ResetPass.vue'
import Register from '@/views/Register.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/myTasks',
      name: 'myTasks',
      component: MyTasks
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: Tasks
    },
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/resetPass',
      name: 'resetPass',
      component: ResetPass
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
