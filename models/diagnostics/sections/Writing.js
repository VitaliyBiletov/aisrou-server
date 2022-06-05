const sequelize = require('../../../db')
const {DataTypes} = require('sequelize')
const Diagnostic = require('../Diagnostic')

const PronunciationOfSounds = sequelize.define('pronunciationOfSounds', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    diagnosticId: {
        type: DataTypes.INTEGER,
        unique: true
    },
    substitutions: {
        type: DataTypes.JSON,
        defaultValue: false
    },
    confusion: {
        type: DataTypes.JSON,
        defaultValue: false
    },
    letterGaps: {
        type: DataTypes.JSON,
        defaultValue: false
    },
    noErrors: {
        type: DataTypes.JSON,
        defaultValue: false
    }
}, {
    timestamps: false
})

const UndisturbedPronunciation = sequelize.define('undisturbedPronunciation', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    diagnosticId: {
        type: DataTypes.INTEGER,
        unique: true
    },
    letterSubstitutions: {
        type: DataTypes.JSON,
        defaultValue: false
    },
    softnessDesignationErrors: {
        type: DataTypes.JSON,
        defaultValue: false
    },
    noErrors: {
        type: DataTypes.JSON,
        defaultValue: false
    }
}, {
    timestamps: false
})

const ViolationForms = sequelize.define('violationForms', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    diagnosticId: {
        type: DataTypes.INTEGER,
        unique: true
    },
    passes: {
        type: DataTypes.JSON,
        defaultValue: false
    },
    permutations: {
        type: DataTypes.JSON,
        defaultValue: false
    },
    addingLetters: {
        type: DataTypes.JSON,
        defaultValue: false
    },
    addingSyllables: {
        type: DataTypes.JSON,
        defaultValue: false
    },
    consolidatedSpelling: {
        type: DataTypes.JSON,
        defaultValue: false
    },
    separateSpelling: {
        type: DataTypes.JSON,
        defaultValue: false
    },
    missingMark: {
        type: DataTypes.JSON,
        defaultValue: false
    },
    noErrors: {
        type: DataTypes.JSON,
        defaultValue: false
    }
}, {
    timestamps: false
})

const UnderdevelopmentGrammatical = sequelize.define('underdevelopmentGrammatical', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    diagnosticId: {
        type: DataTypes.INTEGER,
        unique: true
    },
    writingViolations: {
        type: DataTypes.JSON,
        defaultValue: false
    },
    skipWords: {
        type: DataTypes.JSON,
        defaultValue: false
    },
    wrongOrder: {
        type: DataTypes.JSON,
        defaultValue: false
    },
    passes: {
        type: DataTypes.JSON,
        defaultValue: false
    },
    permutationsOfParts: {
        type: DataTypes.JSON,
        defaultValue: false
    },
    violationOfMeaning: {
        type: DataTypes.JSON,
        defaultValue: false
    },
    noErrors: {
        type: DataTypes.JSON,
        defaultValue: false
    }
}, {
    timestamps: false
})

const VisuospatialFunctions = sequelize.define('visuospatialFunctions', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    diagnosticId: {
        type: DataTypes.INTEGER,
        unique: true
    },
    mirrorSpelling: {
        type: DataTypes.JSON,
        defaultValue: false
    },
    addingLetterElements: {
        type: DataTypes.JSON,
        defaultValue: false
    },
    diffNumElements: {
        type: DataTypes.JSON,
        defaultValue: false
    },
    sameNumElements: {
        type: DataTypes.JSON,
        defaultValue: false
    },
    noErrors: {
        type: DataTypes.JSON,
        defaultValue: false
    }
}, {
    timestamps: false
})

Diagnostic.hasOne(PronunciationOfSounds)
PronunciationOfSounds.belongsTo(Diagnostic)

Diagnostic.hasOne(UndisturbedPronunciation)
UndisturbedPronunciation.belongsTo(Diagnostic)

Diagnostic.hasOne(ViolationForms)
ViolationForms.belongsTo(Diagnostic)

Diagnostic.hasOne(UnderdevelopmentGrammatical)
UnderdevelopmentGrammatical.belongsTo(Diagnostic)

Diagnostic.hasOne(VisuospatialFunctions)
VisuospatialFunctions.belongsTo(Diagnostic)

module.exports = {
    PronunciationOfSounds,
    UndisturbedPronunciation,
    ViolationForms,
    UnderdevelopmentGrammatical,
    VisuospatialFunctions
}