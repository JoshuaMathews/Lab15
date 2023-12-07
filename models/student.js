module.exports = (sequelize, DataTypes) => {

    // Defines the Model
    const Student = sequelize.define('Student', {
        //Defines the columns within the database and their constraints.
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: false
            }
        },
        starID:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: false
            }
        },
        present: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            default: false
        }
    })

    // create/update table within the database.
    Student.sync( {force: false}).then( () => {
        console.log("Student table has been synced!")
    })

    return Student
}