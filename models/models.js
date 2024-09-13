const sequelize = require('../db')
const Diagnostic = require('./diagnostics/Diagnostic')
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

// const Type = sequelize.define('type', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true
//   },
//   title: {
//     type: DataTypes.STRING,
//
//   },
// }, {
//   timestamps: false
// })

const Speed = sequelize.define('speed', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    diagnosticId: {
        type: DataTypes.INTEGER,
        unique: true
    },
    count: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    timestamps: false
})

const Wishes = sequelize.define('wishes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    wishText: {
        type: DataTypes.TEXT,
        unique: false
    },
    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: false
})


User.belongsToMany(Student, {through: Group, foreignKey: 'userId', otherKey: 'studentId'})
Student.belongsToMany(User, {through: Group, foreignKey: 'studentId', otherKey: 'userId'})

Student.hasMany(Diagnostic)

// Type.hasMany(Diagnostic, {foreignKey: 'typeId'})
// Diagnostic.belongsTo(Type, {foreignKey: 'typeId'})

User.hasMany(Diagnostic, {foreignKey: 'userId'})
Diagnostic.belongsTo(User, {foreignKey: "userId"})

Diagnostic.hasOne(Speed)
Speed.belongsTo(Diagnostic)

module.exports = {
    User,
    Student,
    Group,
    // Type,
    Speed,
    Wishes
}


