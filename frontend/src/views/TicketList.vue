<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { Loader2, Pencil, Plus, StickyNote, Trash2 } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'
import CardContent from '@/components/ui/CardContent.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import Table from '@/components/ui/Table.vue'
import TableBody from '@/components/ui/TableBody.vue'
import TableCell from '@/components/ui/TableCell.vue'
import TableHead from '@/components/ui/TableHead.vue'
import TableHeader from '@/components/ui/TableHeader.vue'
import TableRow from '@/components/ui/TableRow.vue'
import { useTicketStore } from '@/stores/ticket.store'

const ticketStore = useTicketStore()
const tickets = computed(() => ticketStore.tickets)
const loading = computed(() => ticketStore.loading)
const error = computed(() => ticketStore.error)

onMounted(async () => {
  try {
    await ticketStore.fetchTickets()
  } catch (err) {
    console.error('Failed to fetch tickets:', err)
  }
})

function formatDate(dateString?: string): string {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    open: 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-yellow-100 text-yellow-800',
    closed: 'bg-gray-100 text-gray-800',
    cancelled: 'bg-red-100 text-red-800',
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

function getPriorityColor(priority: string): string {
  const colors: Record<string, string> = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-blue-100 text-blue-800',
    high: 'bg-orange-100 text-orange-800',
    urgent: 'bg-red-100 text-red-800',
  }
  return colors[priority] || 'bg-gray-100 text-gray-800'
}

async function handleDelete(id: string) {
  if (!confirm('Are you sure you want to delete this ticket?')) {
    return
  }

  try {
    await ticketStore.deleteTicket(id)
  } catch (err) {
    console.error('Failed to delete ticket:', err)
  }
}
</script>

<template>
  <div class="space-y-6">
    <Card>
      <CardHeader>
        <div class="flex items-center justify-between">
          <CardTitle>Tickets</CardTitle>
          <router-link to="/tickets/new">
            <Button>
              <Plus class="mr-2 h-4 w-4" />
              Add New Ticket
            </Button>
          </router-link>
        </div>
      </CardHeader>

      <CardContent>
        <div v-if="loading && tickets.length === 0" class="flex items-center justify-center py-8">
          <Loader2 class="h-6 w-6 animate-spin text-muted-foreground" />
          <span class="ml-2 text-muted-foreground">Loading tickets...</span>
        </div>

        <div v-else-if="error" class="rounded-lg bg-destructive/15 p-4 text-destructive">
          {{ error }}
        </div>

        <div
          v-else-if="tickets.length === 0"
          class="flex flex-col items-center justify-center py-12"
        >
          <StickyNote class="mb-4 h-12 w-12 text-muted-foreground" />
          <h3 class="mb-2 text-lg font-semibold">No tickets found</h3>
          <p class="mb-4 text-sm text-muted-foreground">Start by adding your first ticket.</p>
          <router-link to="/tickets/new">
            <Button>Add Ticket</Button>
          </router-link>
        </div>

        <div v-else class="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead class="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="ticket in tickets" :key="ticket.id">
                <TableCell class="font-medium">{{ ticket.title }}</TableCell>
                <TableCell class="capitalize">{{ ticket.type }}</TableCell>
                <TableCell>
                  <span
                    :class="[
                      'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium capitalize',
                      getPriorityColor(ticket.priority),
                    ]"
                  >
                    {{ ticket.priority }}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    :class="[
                      'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium capitalize',
                      getStatusColor(ticket.status),
                    ]"
                  >
                    {{ ticket.status }}
                  </span>
                </TableCell>
                <TableCell>{{ formatDate(ticket.dueDate) }}</TableCell>
                <TableCell>{{ formatDate(ticket.createdAt) }}</TableCell>
                <TableCell class="text-right">
                  <div class="flex justify-end gap-2">
                    <router-link :to="`/tickets/${ticket.id}/edit`">
                      <Button variant="outline" size="sm">
                        <Pencil class="h-3 w-3" />
                      </Button>
                    </router-link>
                    <Button
                      variant="destructive"
                      size="sm"
                      :disabled="loading"
                      @click="handleDelete(ticket.id)"
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
