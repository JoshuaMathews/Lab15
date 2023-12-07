const express = require('express')
const database = require("../models/index")
const Student = database.Student
const router = express.Router()

// Route to get all students ordered alphabetically by their name.
router.get('/students', function(req, res, next) {
    Student.findAll( {order: ['name']}).then(students => {
        return res.json(students)
    })
})

// Route to create a new student.
router.post("/students", function(req, res, next){
    const newStudent = req.body

    Student.create(newStudent).then(result => {
        return res.status(201).send("New Student created!")
    }).catch(err => {
        if(err instanceof database.Sequelize.ValidationError){
            const messages = err.errors.map(e => e.message)
            return res.status(400).json(messages)
        } else {
            next(err)
            return res.status(400).send("Invalid data")
        }
    })
})

// Route to update an existing student.
router.patch('/students/:id', function(req, res, next){
    const studentID = req.params.id
    const updateStudent = req.body

    Student.update(updateStudent, { where: {id: studentID}}).then( (result) =>{
        const rowsModified = result[0]
        if(rowsModified === 1) {
            res.send('ok')
        } else{
            res.send("Student not found")
        }
    }).catch(err => {
        if(err instanceof database.Sequelize.ValidationError){
            const messages = err.errors.map(e => e.message)
            return res.status(400).json(messages)
        } else {
            next(err)
            return res.status(400).send("Invalid data")
        }
    })
})

// Route to delete an existing student.
router.delete('/students/:id', function(req, res, next){
    const studentID = req.params.id
    Student.destroy({ where: {id: studentID}}).then(result => {
        if(result === 1) {
            return res.send("Student Deleted!")
        }else {
            return res.status(404).send("Student not found.")
        }
    }).catch(err => {
        return next(err)
    })
})

module.exports = router