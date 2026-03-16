<template>
  <div class="space-y-6">
    <Card>
      <CardHeader>
        <div class="flex items-center justify-between">
          <CardTitle>Tenants</CardTitle>
          <router-link to="/tenants/new">
            <Button>
              <Plus class="mr-2 h-4 w-4" />
              Add New Tenant
            </Button>
          </router-link>
        </div>
      </CardHeader>

      <CardContent>
        <div v-if="loading && tenants.length === 0" class="flex items-center justify-center py-8">
          <Loader2 class="h-6 w-6 animate-spin text-muted-foreground" />
          <span class="ml-2 text-muted-foreground">Loading tenants...</span>
        </div>

        <div v-else-if="error" class="rounded-lg bg-destructive/15 p-4 text-destructive">
          {{ error }}
        </div>

        <div
          v-else-if="tenants.length === 0"
          class="flex flex-col items-center justify-center py-12"
        >
          <UserCircle class="h-12 w-12 text-muted-foreground mb-4" />
          <h3 class="text-lg font-semibold mb-2">No tenants found</h3>
          <p class="text-sm text-muted-foreground mb-4">Start by adding your first tenant.</p>
          <router-link to="/tenants/new">
            <Button>Add Tenant</Button>
          </router-link>
        </div>

        <div v-else class="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Mobile Number</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Lease Start</TableHead>
                <TableHead>Lease End</TableHead>
                <TableHead class="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="tenant in tenants" :key="tenant.id">
                <TableCell class="font-medium">
                  {{ tenant.firstName }} {{ tenant.lastName }}
                </TableCell>
                <TableCell>{{ tenant.email }}</TableCell>
                <TableCell>{{ tenant.mobileNumber }}</TableCell>
                <TableCell>
                  <span
                    :class="[
                      'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium capitalize',
                      getStatusColor(tenant.status),
                    ]"
                  >
                    {{ tenant.status }}
                  </span>
                </TableCell>
                <TableCell>{{ formatDate(tenant.leaseStartDate) }}</TableCell>
                <TableCell>{{ formatDate(tenant.leaseEndDate) }}</TableCell>
                <TableCell class="text-right">
                  <div class="flex justify-end gap-2">
                    <router-link :to="`/tenants/${tenant.id}/edit`">
                      <Button variant="outline" size="sm">
                        <Pencil class="h-3 w-3" />
                      </Button>
                    </router-link>
                    <Button
                      variant="destructive"
                      size="sm"
                      @click="handleDelete(tenant.id)"
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
import { Plus, Pencil, Trash2, UserCircle, Loader2 } from 'lucide-vue-next'
import { useTenantStore } from '@/stores/tenant.store'
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

const tenantStore = useTenantStore()
const tenants = computed(() => tenantStore.tenants)
const loading = computed(() => tenantStore.loading)
const error = computed(() => tenantStore.error)

onMounted(async () => {
  try {
    await tenantStore.fetchTenants()
  } catch (err) {
    console.error('Failed to fetch tenants:', err)
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
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    pending: 'bg-yellow-100 text-yellow-800',
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

async function handleDelete(id: string) {
  if (!confirm('Are you sure you want to delete this tenant?')) {
    return
  }

  try {
    await tenantStore.deleteTenant(id)
  } catch (err) {
    console.error('Failed to delete tenant:', err)
  }
}
</script>
