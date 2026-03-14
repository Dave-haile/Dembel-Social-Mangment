<script setup lang="ts">
import HubView from "./components/HubView.vue"
import { STATIC_LINKS, STATIC_SETTINGS } from "./constant"
</script>

<template>
  <div class="min-h-screen font-sans">
    <HubView :links="STATIC_LINKS" :settings="STATIC_SETTINGS" :isAuthenticated="false" :onAdminClick="() => { }" />
  </div>
</template>