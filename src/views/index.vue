<script setup lang="ts">
import { onMounted } from 'vue'

function handleStart() {
  window.electronAPI.sendMsgToMain('Hello from the renderer process!')
}

onMounted(() => {
  window.electronAPI.receivMsgFromMain((message: any) => {
    console.log(`Received message from main process: ${message}`)
  })
})
</script>

<template>
  <v-btn @click="handleStart">启动</v-btn>
  <v-btn>终止</v-btn>
</template>

<style scoped lang="scss"></style>
