const sequelize = require('../../../db')
const {DataTypes} = require('sequelize')
const Diagnostic = require('../Diagnostic')

const ReadingMethod = sequelize.define('readingMethod', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  diagnosticId: {
    type: DataTypes.INTEGER,
    unique: true
  },
  letterByLetter: {
    type: DataTypes.JSON,
    defaultValue: false
  },
  bySyllables: {
    type: DataTypes.JSON,
    defaultValue: false
  },
  slowlyInSyllables: {
    type: DataTypes.JSON,
    defaultValue: false
  },
  wholeWords: {
    type: DataTypes.JSON,
    defaultValue: false
  }
}, {
  timestamps: false
})

const Right = sequelize.define('right', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  diagnosticId: {
    type: DataTypes.INTEGER,
    unique: true
  },
  passesSounds: {
    type: DataTypes.JSON,
    defaultValue: false
  },
  passesSyllables: {
    type: DataTypes.JSON,
    defaultValue: false
  },
  permutationsSounds: {
    type: DataTypes.JSON,
    defaultValue: false
  },
  permutationsSyllables: {
    type: DataTypes.JSON,
    defaultValue: false
  },
  replaceGSSounds: {
    type: DataTypes.JSON,
    defaultValue: false
  },
  replaceFSSounds: {
    type: DataTypes.JSON,
    defaultValue: false
  },
  substitutionsSyllables: {
    type: DataTypes.JSON,
    defaultValue: false
  },
  substitutionsWords: {
    type: DataTypes.JSON,
    defaultValue: false
  },
  additionsSounds: {
    type: DataTypes.JSON,
    defaultValue: false
  },
  additionsSyllables: {
    type: DataTypes.JSON,
    defaultValue: false
  },
  replaysSounds: {
    type: DataTypes.JSON,
    defaultValue: false
  },
  replaysSyllables: {
    type: DataTypes.JSON,
    defaultValue: false
  },
  replaysWords: {
    type: DataTypes.JSON,
    defaultValue: false
  },
  wrongEmphasis: {
    type: DataTypes.JSON,
    defaultValue: false
  },
  aggrammRading: {
    type: DataTypes.JSON,
    defaultValue: false
  },
  persistentErrors: {
    type: DataTypes.JSON,
    defaultValue: false
  },
  noErrorsRight: {
    type: DataTypes.JSON,
    defaultValue: false
  }
}, {
  timestamps: false
})

const Expressiveness = sequelize.define('expressiveness', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  diagnosticId: {
    type: DataTypes.INTEGER,
    unique: true
  },
  pausesOnPunctuationMarks: {
    type: DataTypes.JSON,
    defaultValue: false
  },
  raiseAndLowerVoice: {
    type: DataTypes.JSON,
    defaultValue: false
  },
  emphasizingImportantWords: {
    type: DataTypes.JSON,
    defaultValue: false
  },
  intonedReading: {
    type: DataTypes.JSON,
    defaultValue: false
  }
}, {
  timestamps: false
})

const Mindfulness = sequelize.define('mindfulness', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  diagnosticId: {
    type: DataTypes.INTEGER,
    unique: true
  },
  literalSense: {
    type: DataTypes.JSON,
    defaultValue: false
  },
  figurativeMeaning: {
    type: DataTypes.JSON,
    defaultValue: false
  },
  storyEventChains: {
    type: DataTypes.JSON,
    defaultValue: false
  },
  mainIdea: {
    type: DataTypes.JSON,
    defaultValue: false
  },
  factualData: {
    type: DataTypes.JSON,
    defaultValue: false
  },
  understanding: {
    type: DataTypes.JSON,
    defaultValue: false
  }

}, {
  timestamps: false
})

Diagnostic.hasOne(ReadingMethod)
ReadingMethod.belongsTo(Diagnostic)

Diagnostic.hasOne(Right)
Right.belongsTo(Diagnostic)

Diagnostic.hasOne(Expressiveness)
Expressiveness.belongsTo(Diagnostic)

Diagnostic.hasOne(Mindfulness)
Mindfulness.belongsTo(Diagnostic)

module.exports = {Right, ReadingMethod, Expressiveness, Mindfulness}