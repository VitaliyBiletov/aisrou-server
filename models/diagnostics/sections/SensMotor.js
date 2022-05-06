const sequelize = require('../../../db')
const {DataTypes} = require('sequelize')
const Diagnostic = require('../Diagnostic')

const SensMotor = sequelize.define('sensMotor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  diagnosticId: {
    type: DataTypes.INTEGER,
    unique: true
  },
  artic: {
    type: DataTypes.JSON,
    defaultValue: [],
    field: "Артикуляционная моторика"

  },
  phonemics: {
    type: DataTypes.JSON,
    defaultValue: [],
    field: "Фонематическое восприятие"
  },
  sounds: {
    type: DataTypes.JSON,
    defaultValue: [],
    field: "Звукопроизношение"
  },
  syllable: {
    type: DataTypes.JSON,
    defaultValue: [],
    field: "Звуко-слоговая структура"
  }
}, {
  timestamps: false
})

Diagnostic.hasOne(SensMotor)
SensMotor.belongsTo(Diagnostic)

module.exports = SensMotor