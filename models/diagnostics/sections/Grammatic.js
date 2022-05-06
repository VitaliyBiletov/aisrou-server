const sequelize = require('../../../db')
const {DataTypes} = require('sequelize')
const Diagnostic = require('../Diagnostic')

const Grammatic = sequelize.define('grammatic', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  diagnosticId: {
    type: DataTypes.INTEGER,
    unique: true
  },
  pluralNominative: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  pluralGenitive: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  diminutiveForm: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  prepositions: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  relativeAdjectives: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  possessiveAdjectives: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  qualityAdjectives: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  draftingProposals: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  proposalVerification: {
    type: DataTypes.JSON,
    defaultValue: []
  },

}, {
  timestamps: false
})

Diagnostic.hasOne(Grammatic)
Grammatic.belongsTo(Diagnostic)

module.exports = Grammatic