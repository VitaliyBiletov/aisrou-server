const sequelize = require('../db')

const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'Имя'
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'Фамилия'
  },
  patronymic: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'Отчество'
  },
  fullName: {
    type: DataTypes.VIRTUAL,
    get(){
      return `${this.lastName} ${this.firstName[0]}. ${this.patronymic[0]}.`
    }
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    field: 'Email'
  },
  password: {
    type: DataTypes.STRING,
    field: 'Пароль'
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "USER",
    field: 'Роль'
  },
})

const Student = sequelize.define('student', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'Имя'
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'Фамилия'
  },
  fullName: {
    type: DataTypes.VIRTUAL,
    get(){
      return `${this.lastName} ${this.firstName}`
    }
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    field: 'Дата рождения'
  },
  enrollmentDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    field: 'Дата зачисления'
  },
})

const Group = sequelize.define('group', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  createdAt: {
    type: DataTypes.DATEONLY,
    field: 'Дата создания'
  },
})

const Diagnostic = sequelize.define('diagnostic', {
  userId:{
    type: DataTypes.INTEGER,
    field: 'Учитель'
  },
  typeId:{
    type: DataTypes.INTEGER,
    field: 'Тип'
  },
  progress: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'Прогресс'
  },
  classNumber: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'Класс'
  },
  createdAt: {
    type: DataTypes.DATEONLY,
    field: 'Дата создания'
  },
  updatedAt: {
    type: DataTypes.DATEONLY,
    field: 'Дата обновления'
  },
})

const Type = sequelize.define('type', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    field: 'Название',
    get(){
      return this.getDataValue('title')
    }
  },
}, {
  timestamps: false
})

User.belongsToMany(Student, {through: Group})
Student.belongsToMany(User, {through: Group})

Student.hasMany(Diagnostic)

Type.hasMany(Diagnostic, {foreignKey: 'typeId'})
Diagnostic.belongsTo(Type, {foreignKey: 'typeId'})

User.hasMany(Diagnostic, {foreignKey: 'userId'})
Diagnostic.belongsTo(User, {foreignKey: "userId"})

module.exports = {
  User,
  Student,
  Diagnostic,
  Group,
  Type
}


