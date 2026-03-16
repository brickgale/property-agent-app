<template>
  <div class="space-y-6">
    <Card>
      <CardHeader>
        <div class="flex items-center justify-between">
          <CardTitle>Properties</CardTitle>
          <router-link to="/properties/new">
            <Button>
              <Plus class="mr-2 h-4 w-4" />
              Add New Property
            </Button>
          </router-link>
        </div>
      </CardHeader>

      <CardContent>
        <div
          v-if="loading && properties.length === 0"
          class="flex items-center justify-center py-8"
        >
          <Loader2 class="h-6 w-6 animate-spin text-muted-foreground" />
          <span class="ml-2 text-muted-foreground">Loading properties...</span>
        </div>

        <div v-else-if="error" class="rounded-lg bg-destructive/15 p-4 text-destructive">
          {{ error }}
        </div>

        <div
          v-else-if="properties.length === 0"
          class="flex flex-col items-center justify-center py-12"
        >
          <Building2 class="h-12 w-12 text-muted-foreground mb-4" />
          <h3 class="text-lg font-semibold mb-2">No properties found</h3>
          <p class="text-sm text-muted-foreground mb-4">Start by adding your first property.</p>
          <router-link to="/properties/new">
            <Button>Add Property</Button>
          </router-link>
        </div>

        <div v-else class="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Purchase Price</TableHead>
                <TableHead>Current Value</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead class="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="property in properties" :key="property.id">
                <TableCell class="font-medium">{{ property.name }}</TableCell>
                <TableCell class="capitalize">{{ property.propertyType }}</TableCell>
                <TableCell>
                  <span
                    :class="[
                      'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium capitalize',
                      getStatusColor(property.status),
                    ]"
                  >
                    {{ property.status }}
                  </span>
                </TableCell>
                <TableCell>{{ formatCurrency(property.purchasePrice) }}</TableCell>
                <TableCell>{{ formatCurrency(property.currentValue) }}</TableCell>
                <TableCell>{{ formatDate(property.createdAt) }}</TableCell>
                <TableCell class="text-right">
                  <div class="flex justify-end gap-2">
                    <router-link :to="`/properties/${property.id}/edit`">
                      <Button variant="outline" size="sm">
                        <Pencil class="h-3 w-3" />
                      </Button>
                    </router-link>
                    <Button
                      variant="destructive"
                      size="sm"
                      @click="handleDelete(property.id)"
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
import { Plus, Pencil, Trash2, Building2, Loader2 } from 'lucide-vue-next'
import { usePropertyStore } from '@/stores/property.store'
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

const propertyStore = usePropertyStore()
const properties = computed(() => propertyStore.properties)
const loading = computed(() => propertyStore.loading)
const error = computed(() => propertyStore.error)

onMounted(async () => {
  try {
    await propertyStore.fetchProperties()
  } catch (err) {
    console.error('Failed to fetch properties:', err)
  }
})

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function formatCurrency(value?: number): string {
  if (!value) return '-'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(value)
}

function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    available: 'bg-green-100 text-green-800',
    occupied: 'bg-blue-100 text-blue-800',
    maintenance: 'bg-yellow-100 text-yellow-800',
    sold: 'bg-gray-100 text-gray-800',
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

async function handleDelete(id: string) {
  if (!confirm('Are you sure you want to delete this property?')) {
    return
  }

  try {
    await propertyStore.deleteProperty(id)
  } catch (err) {
    console.error('Failed to delete property:', err)
  }
}
</script>
