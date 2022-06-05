const sequelize = require('../../../db')
const {DataTypes} = require('sequelize')
const Diagnostic = require('../Diagnostic')

const LangAnalysis = sequelize.define('langAnalysis', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    diagnosticId: {
        type: DataTypes.INTEGER,
        unique: true
    },
    compositionProposal: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    syllabicAnalysis: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    syllabicSynthesis: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    soundExtraction: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    soundNumber: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    phonemicSynthesis: {
        type: DataTypes.JSON,
        defaultValue: []
    }
}, {
    timestamps: false
})

Diagnostic.hasOne(LangAnalysis)
LangAnalysis.belongsTo(Diagnostic)

module.exports = LangAnalysis