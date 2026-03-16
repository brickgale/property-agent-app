import { createRouter, createWebHistory } from 'vue-router'
import AgentList from '@/views/AgentList.vue'
import AgentForm from '@/views/AgentForm.vue'
import PropertyList from '@/views/PropertyList.vue'
import TenantList from '@/views/TenantList.vue'

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
    {
      path: '/properties',
      name: 'PropertyList',
      component: PropertyList,
    },
    {
      path: '/tenants',
      name: 'TenantList',
      component: TenantList,
    },
  ],
})

export default router
