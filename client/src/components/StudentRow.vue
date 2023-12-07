<script setup>
// Import ref from Vue.
import { ref } from 'vue'

// use defineProps to say we want to move around this student object.
const props = defineProps({
  student: Object
})

// Define what events we want to emit
const emit = defineEmits(['arrived-or-left', 'delete-student'])

// Get reference to student's present status
const isStudentPresent = ref(props.student.present)

// use expression function to emit an event about a student arriving/leaving.
const notifyArrivedOrLeft = () => {
  emit('arrived-or-left', props.student, isStudentPresent.value)
}

// use expression function to emit an event about a student being deleted.
const notifyDeleteStudent = () => {
  emit('delete-student', props.student)
}
</script>

<template>
  <tr class="align-middle" v-bind:class="{ present: student.Present, absent: !student.Present }">
    <td>{{ student.name }}</td>
    <td>{{ student.starID }}</td>
    <td>
      <input type="checkbox" v-model="isStudentPresent" v-on:change="notifyArrivedOrLeft(student)">
      <span v-if="student.present" class="mx-3">Here!</span>
      <span v-else class="mx-3">Not Present!</span>
    </td>
    <td>
      <button v-on:click="notifyDeleteStudent(student)" class="btn btn-danger"><i class="bi bi-trash-fill"></i> Delete</button>
    </td>
  </tr>
</template>

<style scoped>
</style>