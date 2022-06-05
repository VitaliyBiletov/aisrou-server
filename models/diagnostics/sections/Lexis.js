const sequelize = require('../../../db')
const {DataTypes} = require('sequelize')
const Diagnostic = require('../Diagnostic')

const Lexis = sequelize.define('lexis', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    diagnosticId: {
        type: DataTypes.INTEGER,
        unique: true
    },
    generalizing: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    antonyms: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    actions: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    concrete: {
        type: DataTypes.JSON,
        defaultValue: []
    }
}, {
    timestamps: false
})

Diagnostic.hasOne(Lexis)
Lexis.belongsTo(Diagnostic)

module.exports = Lexis