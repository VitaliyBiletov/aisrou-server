const sequelize = require('../../db')
const {DataTypes} = require('sequelize')


const Diagnostic = sequelize.define('diagnostic', {
    userId: {
        type: DataTypes.INTEGER,
    },
    type: {
        type: DataTypes.INTEGER,
        defaultValue: 0
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

module.exports = Diagnostic
