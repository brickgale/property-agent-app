<script setup lang="ts">
import { Home } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateHome = () => {
  router.push('/')
}
</script>

<template>
  <header
    class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
  >
    <div class="container mx-auto flex h-16 max-w-screen-2xl items-center px-4">
      <div class="mr-4 flex">
        <button
          @click="navigateHome"
          class="mr-4 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary rounded-md p-1 hover:bg-accent transition-colors"
          aria-label="Go to homepage"
        >
          <Home class="h-6 w-6 text-primary" />
          <span class="hidden font-bold sm:inline-block text-lg"> Property Agent </span>
        </button>
      </div>

      <nav class="flex items-center gap-4 text-sm lg:gap-6 ml-auto">
        <router-link
          to="/"
          class="transition-colors hover:text-foreground/80 text-foreground/60"
          active-class="text-foreground font-medium"
        >
          Agents
        </router-link>
        <router-link
          to="/properties"
          class="transition-colors hover:text-foreground/80 text-foreground/60"
          active-class="text-foreground font-medium"
        >
          Properties
        </router-link>
        <router-link
          to="/tenants"
          class="transition-colors hover:text-foreground/80 text-foreground/60"
          active-class="text-foreground font-medium"
        >
          Tenants
        </router-link>
      </nav>
    </div>
  </header>
</template>
