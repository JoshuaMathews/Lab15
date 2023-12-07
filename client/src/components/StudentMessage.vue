<script setup>

//Import other files and libraries.
import { useStudentStore } from "../stores/StudentStores.js";
import { storeToRefs } from "pinia";
const studentStore = useStudentStore()

// Grab the most recent student from the store.
const { mostRecentStudent } = storeToRefs( studentStore )
</script>

<template>
  <div id="welcome-or-goodbye-message" class="m-2">
    <div v-if="mostRecentStudent.name">
      <div v-if="mostRecentStudent.present" class="alert alert-success">
        Welcome, {{mostRecentStudent.name}}!
      </div>
      <div v-else class="alert alert-info">
        Goodbye {{mostRecentStudent.name}}, see you later.
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>