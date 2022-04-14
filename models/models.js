const sequelize = require('../db')

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

const Diagnostic = sequelize.define('diagnostic', {
  userId: {
    type: DataTypes.INTEGER,
  },
  typeId: {
    type: DataTypes.INTEGER,
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

const Type = sequelize.define('type', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,

  },
}, {
  timestamps: false
})

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
    defaultValue: ''
  },
  vision: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  breath: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  voice: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  prosody: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  articulationApparatus: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  motorSkills: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  additionalInformation: {
    type: DataTypes.STRING,
    defaultValue: '',
  }
}, {
  timestamps: false
})

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
    defaultValue: []

  },
  phonemics: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  sounds: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  syllable: {
    type: DataTypes.JSON,
    defaultValue: []
  }
}, {
  timestamps: false
})

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

const Reading = sequelize.define('reading', {
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
  },
  phrases: {
    type: DataTypes.JSON,
    defaultValue: false
  },
  passes: {
    type: DataTypes.JSON,
    defaultValue: false
  },
  permutations: {
    type: DataTypes.JSON,
    defaultValue: false
  },
  substitutions: {
    type: DataTypes.JSON,
    defaultValue: false
  },
  additions: {
    type: DataTypes.JSON,
    defaultValue: false
  },
  replays: {
    type: DataTypes.JSON,
    defaultValue: false
  },
  sounds: {
    type: DataTypes.JSON,
    defaultValue: false
  },
  syllables: {
    type: DataTypes.JSON,
    defaultValue: false
  },
  words: {
    type: DataTypes.JSON,
    defaultValue: false
  },
  wrongEmphasis: {
    type: DataTypes.JSON,
    defaultValue: false
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
  }
}, {
  timestamps: false
})

const Writing = sequelize.define('writing', {
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
  letterSubstitutions: {
    type: DataTypes.JSON,
    defaultValue: false
  },
  softnessDesignationErrors: {
    type: DataTypes.JSON,
    defaultValue: false
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
  morphologicalDisorders: {
    type: DataTypes.JSON,
    defaultValue: false
  },
  syntaxViolations: {
    type: DataTypes.JSON,
    defaultValue: false
  },
  textLevel: {
    type: DataTypes.JSON,
    defaultValue: false
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
  }
}, {
  timestamps: false
})

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


User.belongsToMany(Student, {through: Group, foreignKey: 'userId', otherKey: 'studentId'})
Student.belongsToMany(User, {through: Group, foreignKey: 'studentId', otherKey: 'userId'})

Student.hasMany(Diagnostic)

Type.hasMany(Diagnostic, {foreignKey: 'typeId'})
Diagnostic.belongsTo(Type, {foreignKey: 'typeId'})

User.hasMany(Diagnostic, {foreignKey: 'userId'})
Diagnostic.belongsTo(User, {foreignKey: "userId"})

Diagnostic.hasOne(StateOfFunc)
StateOfFunc.belongsTo(Diagnostic)

Diagnostic.hasOne(SensMotor)
SensMotor.belongsTo(Diagnostic)

Diagnostic.hasOne(Grammatic)
Grammatic.belongsTo(Diagnostic)

Diagnostic.hasOne(Lexis)
Lexis.belongsTo(Diagnostic)

Diagnostic.hasOne(CoherentSpeech)
CoherentSpeech.belongsTo(Diagnostic)

Diagnostic.hasOne(LangAnalysis)
LangAnalysis.belongsTo(Diagnostic)

Diagnostic.hasOne(Reading)
Reading.belongsTo(Diagnostic)

Diagnostic.hasOne(Speed)
Speed.belongsTo(Diagnostic)

Diagnostic.hasOne(Writing)
Writing.belongsTo(Diagnostic)

module.exports = {
  User,
  Student,
  Diagnostic,
  Group,
  Type,
  StateOfFunc,
  SensMotor,
  Grammatic,
  Lexis,
  CoherentSpeech,
  LangAnalysis,
  Reading,
  Speed,
  Writing
}


