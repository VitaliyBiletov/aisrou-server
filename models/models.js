const sequelize = require('../db')

const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  firstName: {type: DataTypes.STRING, allowNull: true, field: 'Имя'},
  lastName: {type: DataTypes.STRING, allowNull: true, field: 'Фамилия'},
  patronymic: {type: DataTypes.STRING, allowNull: true, field: 'Отчество'},
  email: {type: DataTypes.STRING, unique: true, field: 'Email'},
  password: {type: DataTypes.STRING, field: 'Пароль'},
  role: {type: DataTypes.STRING, defaultValue: "USER", field: 'Роль'}
})

const Student = sequelize.define('student', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  firstName: {type: DataTypes.STRING, allowNull: false, field: 'Имя'},
  lastName: {type: DataTypes.STRING, allowNull: false, field: 'Фамилия'},
  dateOfBirth: {type: DataTypes.DATEONLY, allowNull: false, field: 'Дата рождения'},
  enrollmentDate: {type: DataTypes.DATEONLY, allowNull: false, field: 'Дата зачисления'},
  enrollmentСlass: {type: DataTypes.INTEGER, allowNull: false, field: 'Класс зачисления'},
})

const Group = sequelize.define('group', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const Diagnostic = sequelize.define('diagnostic', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  createdAt:{type: DataTypes.DATEONLY}
})

User.belongsToMany(Student, {through: Group})
Student.belongsToMany(User, {through: Group})

Student.hasMany(Diagnostic)


module.exports = {
  User,
  Student,
  Diagnostic,
  Group
}


