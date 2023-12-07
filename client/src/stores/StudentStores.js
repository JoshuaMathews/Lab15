import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { mande } from 'mande'

const studentAPI = mande('api/students')

export const useStudentStore = defineStore('students', () => {

    // List of ALL students
    const studentList = ref([])

    // Most recent student
    const mostRecentStudent = ref('')

    const addNewStudentErrors = ref([])

    function getAllStudents() {
        studentAPI.get().then(value =>{
            studentList.value = value
        })
    }

    // Add new student to the database.
    function addNewStudent(student) {
        studentAPI.post(student).then(value => {
            getAllStudents()
        }).catch(err => {
            addNewStudentErrors.value = err.body
        })
    }

    // Delete student from database
    function deleteStudent(studentToDelete) {
        if(confirm(`Delete ${studentToDelete.name}?`)) {
            const deleteStudentAPI = mande(`api/students/${studentToDelete.id}`)
            deleteStudentAPI.delete().then(value => {
                getAllStudents()
                mostRecentStudent.val = {}
            }).catch(err => {
                console.log(err)
            })
        }
    }

    // edit student's present status by updating the value in the database then
    // set reactive data to the most recent student that has arrived/left.
    function arrivedOrLeft(student) {
        const editStudentAPI = mande(`/api/students/${student.id}`)

        editStudentAPI.patch(student).then(() => {
            getAllStudents()
            mostRecentStudent.value = student
        }).catch(err => {
            console.log(err)
        })
    }

    // sorts the student array by name alphabetically
    const sortedStudents = computed( () => {
        return studentList.value.toSorted((student1, student2) => {
            return student1.name.localeCompare(student2.name)
        })
    })

    const studentCount = computed( () => { return studentList.value.length })

    return {
        // Reactive Data
        studentList,
        mostRecentStudent,
        addNewStudentErrors,

        // Functions
        addNewStudent,
        deleteStudent,
        arrivedOrLeft,
        getAllStudents,

        // Computed
        sortedStudents,
        studentCount
    }
})