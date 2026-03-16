<template>
  <div class="min-h-screen">
    <Navigation />
    <main class="container mx-auto py-6 px-4">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import Navigation from '@/components/Navigation.vue'
</script>
