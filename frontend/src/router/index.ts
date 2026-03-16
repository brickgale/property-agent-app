import { createRouter, createWebHistory } from 'vue-router'
import AgentList from '@/views/AgentList.vue'
import AgentForm from '@/views/AgentForm.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'AgentList',
      component: AgentList,
    },
    {
      path: '/agents/new',
      name: 'CreateAgent',
      component: AgentForm,
    },
    {
      path: '/agents/:id/edit',
      name: 'EditAgent',
      component: AgentForm,
      props: true,
    },
  ],
})

export default router
