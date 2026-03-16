<template>
  <div class="space-y-6">
    <Card>
      <CardHeader>
        <div class="flex items-center justify-between">
          <CardTitle>Property Agents</CardTitle>
          <router-link to="/agents/new">
            <Button>
              <Plus class="mr-2 h-4 w-4" />
              Add New Agent
            </Button>
          </router-link>
        </div>
      </CardHeader>

      <CardContent>
        <div v-if="loading && agents.length === 0" class="flex items-center justify-center py-8">
          <Loader2 class="h-6 w-6 animate-spin text-muted-foreground" />
          <span class="ml-2 text-muted-foreground">Loading agents...</span>
        </div>

        <div v-else-if="error" class="rounded-lg bg-destructive/15 p-4 text-destructive">
          {{ error }}
        </div>

        <div v-else-if="agents.length === 0" class="flex flex-col items-center justify-center py-12">
          <Users class="h-12 w-12 text-muted-foreground mb-4" />
          <h3 class="text-lg font-semibold mb-2">No agents found</h3>
          <p class="text-sm text-muted-foreground mb-4">Start by adding your first property agent.</p>
          <router-link to="/agents/new">
            <Button>Add Agent</Button>
          </router-link>
        </div>

        <div v-else class="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Mobile Number</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead class="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="agent in agents" :key="agent.id">
                <TableCell class="font-medium">
                  {{ agent.firstName }} {{ agent.lastName }}
                </TableCell>
                <TableCell>{{ agent.email }}</TableCell>
                <TableCell>{{ agent.mobileNumber }}</TableCell>
                <TableCell>{{ formatDate(agent.createdAt) }}</TableCell>
                <TableCell class="text-right">
                  <div class="flex justify-end gap-2">
                    <router-link :to="`/agents/${agent.id}/edit`">
                      <Button variant="outline" size="sm">
                        <Pencil class="h-3 w-3" />
                      </Button>
                    </router-link>
                    <Button
                      variant="destructive"
                      size="sm"
                      @click="handleDelete(agent.id)"
                      :disabled="loading"
                    >
                      <Trash2 class="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { Plus, Pencil, Trash2, Users, Loader2 } from 'lucide-vue-next'
import { useAgentStore } from '@/stores/agent.store'
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import CardContent from '@/components/ui/CardContent.vue'
import Table from '@/components/ui/Table.vue'
import TableHeader from '@/components/ui/TableHeader.vue'
import TableBody from '@/components/ui/TableBody.vue'
import TableRow from '@/components/ui/TableRow.vue'
import TableHead from '@/components/ui/TableHead.vue'
import TableCell from '@/components/ui/TableCell.vue'

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
