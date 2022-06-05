const sequelize = require('../../../db')
const {DataTypes} = require('sequelize')
const Diagnostic = require('../Diagnostic')

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
        defaultValue: '',
        field: "Слух"
    },
    vision: {
        type: DataTypes.STRING,
        defaultValue: '',
        field: "Зрение"
    },
    breath: {
        type: DataTypes.STRING,
        defaultValue: '',
        field: "Дыхание"
    },
    voice: {
        type: DataTypes.STRING,
        defaultValue: '',
        field: "Голос"
    },
    prosody: {
        type: DataTypes.STRING,
        defaultValue: '',
        field: "Просодика"
    },
    articulationApparatus: {
        type: DataTypes.STRING,
        defaultValue: '',
        field: "Артикулляционный аппарат"
    },
    motorSkills: {
        type: DataTypes.STRING,
        defaultValue: '',
        field: "Моторика"
    },
    additionalInformation: {
        type: DataTypes.STRING,
        defaultValue: '',
        field: "Дополнительная информация"
    }
}, {
    timestamps: false
})

Diagnostic.hasOne(StateOfFunc)
StateOfFunc.belongsTo(Diagnostic)

module.exports = StateOfFunc