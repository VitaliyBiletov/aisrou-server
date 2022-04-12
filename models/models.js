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
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    patronymic: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "USER",
    },
  }
)

const Student = sequelize.define('student', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  enrollmentDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
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
  },
})

const Diagnostic = sequelize.define('diagnostic', {
  userId: {
    type: DataTypes.INTEGER,
  },
  typeId: {
    type: DataTypes.INTEGER,
  },
  progress: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  classNumber: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  createdAt: {
    type: DataTypes.DATEONLY,
  },
  updatedAt: {
    type: DataTypes.DATEONLY,
  },
})

const Type = sequelize.define('type', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,

  },
}, {
  timestamps: false
})

const StateOfFunc = sequelize.define('state_of_func', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  diagnosticId: {
    type: DataTypes.INTEGER,
    unique: true
  },
  hearing: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  vision: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  breath: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  voice: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  prosody: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  articulationApparatus: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  motorSkills: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  additionalInformation: {
    type: DataTypes.STRING,
    defaultValue: '',
  }
}, {
  timestamps: false
})

User.belongsToMany(Student, {through: Group, foreignKey: 'userId', otherKey: 'studentId'})
Student.belongsToMany(User, {through: Group, foreignKey: 'studentId', otherKey: 'userId'})

Student.hasMany(Diagnostic)

Type.hasMany(Diagnostic, {foreignKey: 'typeId'})
Diagnostic.belongsTo(Type, {foreignKey: 'typeId'})

User.hasMany(Diagnostic, {foreignKey: 'userId'})
Diagnostic.belongsTo(User, {foreignKey: "userId"})

Diagnostic.hasOne(StateOfFunc)
StateOfFunc.belongsTo(Diagnostic)

module.exports = {
  User,
  Student,
  Diagnostic,
  Group,
  Type,
  StateOfFunc
}


