<script setup>
import NewStudentForm from './components/NewStudentForm.vue'
import StudentTable from './components/StudentTable.vue'
import StudentMessage from './components/StudentMessage.vue'
import { onMounted } from "vue";
import { useStudentStore } from "./stores/StudentStores.js";

const studentStore = useStudentStore()

onMounted( () => {
  studentStore.getAllStudents()
})
</script>

<template>
  <NewStudentForm></NewStudentForm>
  <StudentTable></StudentTable>
  <StudentMessage></StudentMessage>
</template>

<style scoped>

</style>
