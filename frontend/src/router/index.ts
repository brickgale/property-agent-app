import { createRouter, createWebHistory } from 'vue-router'
import AgentList from '@/views/AgentList.vue'
import AgentForm from '@/views/AgentForm.vue'
import PropertyList from '@/views/PropertyList.vue'
import PropertyForm from '@/views/PropertyForm.vue'
import TenantList from '@/views/TenantList.vue'
import TenantForm from '@/views/TenantForm.vue'

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
      path: '/properties/new',
      name: 'CreateProperty',
      component: PropertyForm,
    },
    {
      path: '/properties/:id/edit',
      name: 'EditProperty',
      component: PropertyForm,
      props: true,
    },
    {
      path: '/tenants',
      name: 'TenantList',
      component: TenantList,
    },
    {
      path: '/tenants/new',
      name: 'CreateTenant',
      component: TenantForm,
    },
    {
      path: '/tenants/:id/edit',
      name: 'EditTenant',
      component: TenantForm,
      props: true,
    },
  ],
})

export default router
