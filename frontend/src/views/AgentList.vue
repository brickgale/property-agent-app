<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <div class="flex justify-between align-center">
          <h1>Property Agents</h1>
          <router-link to="/agents/new">
            <button class="btn btn-primary">+ Add New Agent</button>
          </router-link>
        </div>
      </div>

      <div v-if="loading && agents.length === 0" class="loading">Loading agents...</div>

      <div v-else-if="error" class="error-message">
        {{ error }}
      </div>

      <div v-else-if="agents.length === 0" class="empty-state">
        <h3>No agents found</h3>
        <p>Start by adding your first property agent.</p>
      </div>

      <div v-else class="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile Number</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="agent in agents" :key="agent.id">
              <td>{{ agent.firstName }} {{ agent.lastName }}</td>
              <td>{{ agent.email }}</td>
              <td>{{ agent.mobileNumber }}</td>
              <td>{{ formatDate(agent.createdAt) }}</td>
              <td>
                <div class="flex flex-gap">
                  <router-link :to="`/agents/${agent.id}/edit`">
                    <button class="btn btn-secondary btn-small">Edit</button>
                  </router-link>
                  <button
                    class="btn btn-danger btn-small"
                    @click="handleDelete(agent.id)"
                    :disabled="loading"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useAgentStore } from '../stores/agent.store'

const agentStore = useAgentStore()
const agents = computed(() => agentStore.agents)
const loading = computed(() => agentStore.loading)
const error = computed(() => agentStore.error)

onMounted(async () => {
  try {
    await agentStore.fetchAgents()
  } catch (err) {
    console.error('Failed to fetch agents:', err)
  }
})

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

async function handleDelete(id: string) {
  if (!confirm('Are you sure you want to delete this agent?')) {
    return
  }

  try {
    await agentStore.deleteAgent(id)
  } catch (err) {
    console.error('Failed to delete agent:', err)
  }
}
</script>
