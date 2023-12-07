<script setup>

//Import other files and libraries.
import { useStudentStore } from "../stores/StudentStores.js";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import StudentRow from "./StudentRow.vue";
const studentStore = useStudentStore()

// Grab studentCount and the sortedStudents from the store.
const { studentCount, sortedStudents} = storeToRefs(studentStore)

// Message for displaying if there is one or many students in class.
const pluralStudentMessage = computed( () => {
  if(studentCount.value === 1) {
      return 'There is 1 student in class.'
  } else {
      return `There are ${studentCount.value} in class.`
  }
})

// Call function in store to delete student from store's array
const deleteStudent = (student) => {
  studentStore.deleteStudent(student)
}

// Call function in store to set the most recent student that has arrived/left
const arrivedOrLeft = (student, isStudentPresent) =>{
  student.present = isStudentPresent
  studentStore.arrivedOrLeft(student)
}
</script>

<template>
  <div id="student-list-table" class="card m-2 p-2">
    <h4 class="card-title">Student List</h4>
    <h4 class="card-subtitle text-muted"> {{ pluralStudentMessage }}</h4>
    <div id="student-table">
      <table class="table">
        <thead>
        <tr>
          <th>Name</th>
          <th>StarID</th>
          <th>Present?</th>
        </tr>
        </thead>

        <tbody>
          <StudentRow v-for="student in sortedStudents"
                      v-bind:student="student"
                      v-on:arrived-or-left="arrivedOrLeft"
                      v-on:delete-student="deleteStudent"
          ></StudentRow>
        </tbody>

      </table>
    </div>
  </div>
</template>

<style scoped>
#student-table {
  max-height: 400px;
  overflow: scroll;
}

th, tr {
  width: 25%;
}

.present {
  color: gray;
  font-style: italic;
}

.absent {
  color: black;
  font-weight: bold;
}
</style>