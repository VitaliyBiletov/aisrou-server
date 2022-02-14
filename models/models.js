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


