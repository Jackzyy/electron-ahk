<script setup lang="ts">
function handleStart() {
  window.electronAPI.ahk_start('Hello from the renderer process!')
}
</script>

<template>
  <v-btn @click="handleStart">启动</v-btn>
  <v-btn>终止</v-btn>
</template>

<style scoped lang="scss"></style>
