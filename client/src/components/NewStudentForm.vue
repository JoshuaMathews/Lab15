<script setup>

// Import extra functionality from other libraries/files and do generic boilerplate setup.
import {ref, watch} from 'vue'
import { useStudentStore } from "../stores/StudentStores";
import { storeToRefs } from "pinia";
const studentStore = useStudentStore()

// Setup for our variables (I know they're not called variables, but it is easier thinking about that way)
const newStudentName = ref('')
const newStudentStarID = ref('')
const formErrors = ref([])

// Add new Student
const addNewStudent = () => {
  formErrors.value = []

  const { addNewStudentErrors } = storeToRefs(studentStore)

  watch(addNewStudentErrors, () => {
    if(addNewStudentErrors.value && addNewStudentErrors.value.length > 0){
      alert(addNewStudentErrors.value.join('\n'))
    }
  })

  if(!newStudentName.value) {
    formErrors.value.push('Student name must be entered')
  }

  if(!newStudentStarID.value) {
    formErrors.value.push('StarID must be entered')
  }

  // If we have no errors, continue with adding the student.
  if(formErrors.value.length === 0) {
    let student = { name: newStudentName.value, starID: newStudentStarID.value}

    studentStore.addNewStudent(student)

    newStudentName.value = ''
    newStudentStarID.value = ''
  }
}
</script>

<template>
  <div id="new-student-form-errors" class="m-2">
    <!-- TODO show errors from form validation -->
    <div v-if="formErrors.length > 0" class="alert alert-danger">
      <li v-for="error in formErrors">
        {{ error }}
      </li>
    </div>
  </div>

  <div id="new-student-form" class="card add-student m-2 p-2">
    <h4 class="card-title">Add new student</h4>

    <div class="form-group mb-3">
      <label for="name">Name</label>
      <input v-model.trim="newStudentName" id="name" class="form-control">
    </div>

    <div class="form-group mb-3">
      <label for="starID">Star ID</label>
      <input v-model.trim="newStudentStarID" id="starID" class="form-control">
    </div>

    <button v-on:click="addNewStudent" class="btn btn-primary">Add</button>
  </div>
</template>

<style scoped>
</style>