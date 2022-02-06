const sequelize = require('../db')

const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  firstName: {type: DataTypes.STRING, allowNull: false},
  lastName: {type: DataTypes.STRING, allowNull: false},
  patronymic: {type: DataTypes.STRING, allowNull: false},
  email: {type: DataTypes.STRING, unique: true},
  password: {type: DataTypes.STRING},
  role: {type: DataTypes.STRING, defaultValue: "USER"}
})

const Student = sequelize.define('student', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  firstName: {type: DataTypes.STRING, allowNull: false},
  lastName: {type: DataTypes.STRING, allowNull: false},
  dateOfBirth: {type: DataTypes.DATE, allowNull: false},
  enrollmentDate: {type: DataTypes.DATE, allowNull: false},
  enrollmentСlass: {type: DataTypes.INTEGER, allowNull: false},
})

const Microgroup = sequelize.define('microgroup', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

User.belongsToMany(Student, {through: Microgroup})
Student.belongsToMany(User, {through: Microgroup})


module.exports = {
  User,
  Student,
  Microgroup
}


