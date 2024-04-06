<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="h-[144px] flex items-center justify-between">
    <h1 class="text-4xl">games bar</h1>
    <div class="w-[200px] flex items-center justify-around">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/2048">2048</RouterLink>
    </div>
  </header>

  <RouterView />
</template>
