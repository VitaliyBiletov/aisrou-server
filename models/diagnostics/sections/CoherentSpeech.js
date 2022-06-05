const sequelize = require('../../../db')
const {DataTypes} = require('sequelize')
const Diagnostic = require('../Diagnostic')

const CoherentSpeech = sequelize.define('coherentSpeech', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    diagnosticId: {
        type: DataTypes.INTEGER,
        unique: true
    },
    paraphrase: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    story: {
        type: DataTypes.JSON,
        defaultValue: []
    }
}, {
    timestamps: false
})

Diagnostic.hasOne(CoherentSpeech)
CoherentSpeech.belongsTo(Diagnostic)

module.exports = CoherentSpeech