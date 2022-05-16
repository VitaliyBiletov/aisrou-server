const {Speed} = require('../models/models')

const Diagnostic = require('../models/diagnostics/Diagnostic')
const StateOfFunc = require('../models/diagnostics/sections/StateOfFunc')
const SensMotor = require('../models/diagnostics/sections/SensMotor')
const Grammatic = require('../models/diagnostics/sections/Grammatic')
const Lexis = require('../models/diagnostics/sections/Lexis')
const CoherentSpeech = require('../models/diagnostics/sections/CoherentSpeech')
const LangAnalysis = require('../models/diagnostics/sections/LangAnalysis')
const {Right, ReadingMethod, Expressiveness, Mindfulness} = require('../models/diagnostics/sections/Reading')
const {
  PronunciationOfSounds,
  UndisturbedPronunciation,
  ViolationForms,
  UnderdevelopmentGrammatical,
  VisuospatialFunctions
} = require('../models/diagnostics/sections/Writing')

const ErrorApi = require('../error/ErrorApi')
const sequilize = require('../db')
const _ = require('lodash')

class DiagnosticController {
  async getDiagnostics(req, res) {
    const {studentId} = req.query
    const diagnostics = await sequilize.query(`SELECT "diagnostics"."id", "diagnostics"."type" as "Тип", progress as "Прогресс", "diagnostics"."classNumber" as "Класс","createdAt" as "Дата"
                                              FROM diagnostics
                                              WHERE diagnostics."studentId" = ${studentId};`)
    const fields = diagnostics[1].fields.map(f => f.name)
    const data = diagnostics[0]
    res.json({fields, data})
  }

  async get(req, res, next) {
    const {id} = req.params
    const diagnostic = await Diagnostic.findOne({where: {id: Number(id)}})
    if (!diagnostic) {
      console.log('Ошибка на сервере')
      return next(ErrorApi.badRequest("Диагностики с таким ID не существует"))
    }
    res.json(diagnostic)
  }

  async getDiagnosticsList(req, res) {
    const {studentId} = req.query
    const diagnostics = await sequilize.query(`SELECT "diagnostics"."id" as "value", "createdAt" as "label"
                                              FROM diagnostics
                                              WHERE diagnostics."studentId" = ${studentId};`)
    res.json(diagnostics[0])
  }

  async tasksLoading(req, res) {
    const {id} = req.params

    const stateOfFunc = await StateOfFunc.findOne({
      where: {diagnosticId: Number(id)},
      attributes: {exclude: ['id', 'diagnosticId']}
    })

    const sectionResults = await getSectionsResult(id)

    console.log({
      stateOfFunc,
      ...sectionResults,
      reading: await getReadingResult(id),
      writing: await getWritingResult(id),
    })

    res.json({
      stateOfFunc,
      ...sectionResults,
      reading: await getReadingResult(id),
      writing: await getWritingResult(id),
    })
  }

  async create(req, res) {
    const {studentId, userId, typeId, classNumber, date, tasks} = req.body
    console.log(typeId)
    const diagnostic = await Diagnostic.create({
        studentId,
        userId,
        progress: 0,
        classNumber,
        type: typeId,
        createdAt: Date.parse(date)
      }
    )

    const listOfTasks = [
      {name: 'sensMotor', model: SensMotor},
      {name: 'grammatic', model: Grammatic},
      {name: 'lexis', model: Lexis},
      {name: 'coherentSpeech', model: CoherentSpeech},
      {name: 'langAnalysis', model: LangAnalysis},
    ]

    await StateOfFunc.create({diagnosticId: diagnostic.id})

    listOfTasks.forEach(async ({name, model})=>{
      await model.create({diagnosticId: diagnostic.id, ...tasks[name]})
    })

    // await SensMotor.create({diagnosticId: diagnostic.id, ...tasks.sensMotor})
    // await Grammatic.create({diagnosticId: diagnostic.id, ...tasks.grammatic})
    // await Lexis.create({diagnosticId: diagnostic.id, ...tasks.lexis})
    // await CoherentSpeech.create({diagnosticId: diagnostic.id, ...tasks.coherentSpeech})
    // await LangAnalysis.create({diagnosticId: diagnostic.id, ...tasks.langAnalysis})
    await ReadingMethod.create({diagnosticId: diagnostic.id})
    await Right.create({diagnosticId: diagnostic.id})
    await Expressiveness.create({diagnosticId: diagnostic.id})
    await Mindfulness.create({diagnosticId: diagnostic.id})
    await Speed.create({diagnosticId: diagnostic.id})
    await PronunciationOfSounds.create({diagnosticId: diagnostic.id})
    await UndisturbedPronunciation.create({diagnosticId: diagnostic.id})
    await ViolationForms.create({diagnosticId: diagnostic.id})
    await UnderdevelopmentGrammatical.create({diagnosticId: diagnostic.id})
    await VisuospatialFunctions.create({diagnosticId: diagnostic.id})

    // const type = await Type.findOne({where: {id: diagnostic.typeId}})

    res.json({
      id: diagnostic.id,
      type: diagnostic.type,
      "Прогресс": diagnostic.progress,
      "Класс": diagnostic.classNumber,
      date: diagnostic.createdAt
    })
  }

  async edit(req, res, next) {
    try {
      await Diagnostic.update(req.body, {where: {id: req.params.id}})
      const diagnostic = await Diagnostic.findOne({
        attributes: ['id', 'typeId', 'progress', 'classNumber', 'createdAt'],
        where: {id: req.params.id}
      })

      // const type = await Type.findOne({where: {id: diagnostic.typeId}})

      res.json({
        id: diagnostic.id,
        type: diagnostic.type,
        "Прогресс": diagnostic.progress,
        "Класс": diagnostic.classNumber,
        date: diagnostic.createdAt
      })
    } catch (e) {
      return next(ErrorApi.badRequest(e.message))
    }
  }

  async save(req, res) {
    const {data} = req.body
    console.log(data)
    await Diagnostic.update({progress: data.progress}, {where: {id: data.id}})
    await StateOfFunc.update({...data.results.stateOfFunc}, {where: {diagnosticId: data.id}})
    await SensMotor.update({...data.results.sensMotor}, {where: {diagnosticId: data.id}})
    await Grammatic.update({...data.results.grammatic}, {where: {diagnosticId: data.id}})
    await Lexis.update({...data.results.lexis}, {where: {diagnosticId: data.id}})
    await CoherentSpeech.update({...data.results.coherentSpeech}, {where: {diagnosticId: data.id}})
    await LangAnalysis.update({...data.results.langAnalysis}, {where: {diagnosticId: data.id}})
    await ReadingMethod.update({...data.results.reading.skills.readingMethod}, {where: {diagnosticId: data.id}})
    await Right.update({...data.results.reading.skills.right}, {where: {diagnosticId: data.id}})
    await Expressiveness.update({...data.results.reading.skills.expressiveness}, {where: {diagnosticId: data.id}})
    await Mindfulness.update({...data.results.reading.skills.mindfulness}, {where: {diagnosticId: data.id}})
    await PronunciationOfSounds.update({...data.results.writing.skills.pronunciationOfSounds}, {where: {diagnosticId: data.id}})
    await UndisturbedPronunciation.update({...data.results.writing.skills.undisturbedPronunciation}, {where: {diagnosticId: data.id}})
    await ViolationForms.update({...data.results.writing.skills.violationForms}, {where: {diagnosticId: data.id}})
    await UnderdevelopmentGrammatical.update({...data.results.writing.skills.underdevelopmentGrammatical}, {where: {diagnosticId: data.id}})
    await VisuospatialFunctions.update({...data.results.writing.skills.visuospatialFunctions}, {where: {diagnosticId: data.id}})

    await Speed.update({count: data.results.reading.speed}, {where: {diagnosticId: data.id}})

    return res.json({message: "Сохранено"})
  }

  async remove(req, res) {
    const {id} = req.params
    const diagnostic = await Diagnostic.destroy({where: {id}})
    res.json(diagnostic)
  }

  async compare(req, res) {
    const {id1, id2} = req.query

    const stateOfFuncResult1 = await getStateOfFuncResult(id1)
    const sensMotorResult1 = await getSensMotorResult(id1)

    const stateOfFuncResult2 = await getStateOfFuncResult(id2)
    const sensMotorResult2 = await getSensMotorResult(id2)

    const r1 = sensMotorResult1.map(item => ({name: item.name, uv: item["Результат"]}))
    const r2 = sensMotorResult2.map(item => ({pv: item["Результат"]}))
    const sensMotorResult = r1.map((item, index) => Object.assign({}, item, r2[index]))

    //Массив с результатами разделов
    const sectionsModels = [
      {name: "Грамматика", model: Grammatic},
      {name: "Лексика", model: Lexis},
      {name: "Связная речь", model: CoherentSpeech},
      {name: "Языковой анализ", model: LangAnalysis}
    ]

    const resultSections1 = await calcSectionResult(id1, sectionsModels)
    const rs1 = resultSections1.map(item => ({name: item.name, uv: item["Результат"]}))
    const resultSections2 = await calcSectionResult(id2, sectionsModels)
    const rs2 = resultSections2.map(item => ({pv: item["Результат"]}))
    const otherSectionsResult = rs1.map((item, index) => Object.assign({}, item, rs2[index]))

    const readingResult1 = await getReadingResult(id1)
    const writingResult1 = await getWritingResult(id1)

    const readingResult2 = await getReadingResult(id2)
    const writingResult2 = await getWritingResult(id2)
    res.json(
    {
      stateOfFunc: {
        title: "Состояние функций",
          data
      :
        [
          stateOfFuncResult1,
          stateOfFuncResult2
        ]
      },
      sectionsResults: [...sensMotorResult,...otherSectionsResult],
      readingResults: [readingResult1, readingResult2],
      writingResult: [writingResult1, writingResult2]
    }
  )
  }

  async getResult(req, res) {
    const {id} = req.params
    const stateOfFuncResult = await getStateOfFuncResult(id)
    const sensMotorResult = await getSensMotorResult(id)

    //Массив с результатами разделов
    const sectionsModels = [
      {name: "Грамматика", model: Grammatic},
      {name: "Лексика", model: Lexis},
      {name: "Связная речь", model: CoherentSpeech},
      {name: "Языковой анализ", model: LangAnalysis}
    ]

    const resultSections = await calcSectionResult(id, sectionsModels)

    res.json({
      stateOfFunc: {title: "Состояние функций", data: stateOfFuncResult},
      sensMotor: _.union(sensMotorResult, resultSections),
    })
  }
}

function calcResult(data) {
  if (data.length === 0) {
    return 0
  }
  const tmp = data.reduce((sum, current) => {
    return sum + current.value
  }, 0)
  const result = Number((tmp / (data.length * 3)) * 100).toFixed(2)
  return parseFloat(result)
}

async function calcSectionResult(id, modelsList) {
  const sections = await Promise.all(modelsList.map(async function ({name, model}) {
    const section = await model.findOne({where: {diagnosticId: id}, attributes: {exclude: ['id', 'diagnosticId']}})
    const result = Object.keys(section.dataValues).map(item => {
      return calcResult(section.dataValues[item])
    }).reduce((sum, current) => {
      return sum + current
    }, 0)
    return {name, "Результат": parseFloat((result / Object.keys(section.dataValues).length).toFixed(2))}
  }))
  return sections
}

async function getStateOfFuncResult(id) {
  return await StateOfFunc.findOne({
    where: {diagnosticId: id},
    attributes: ["Слух", "Зрение", "Голос", "Моторика", "Просодика", "Дыхание", "Артикулляционный аппарат", "Дополнительная информация"]
  })
}

async function getSensMotorResult(id) {
  const sensMotor = await SensMotor.findOne({
    where: {diagnosticId: id},
    attributes: [
      "Артикуляционная моторика",
      "Фонематическое восприятие",
      "Звукопроизношение",
      "Звуко-слоговая структура"
    ]
  })

  return Object.keys(sensMotor.dataValues).map(section => {
    const sum = calcResult(sensMotor.dataValues[section])
    return {name: section, "Результат": sum}
  })
}

async function getSectionsResult(id) {
  const sensMotor = await SensMotor.findOne({
    where: {diagnosticId: Number(id)},
    attributes: {exclude: ['id', 'diagnosticId']}
  })

  const grammatic = await Grammatic.findOne({
    where: {diagnosticId: Number(id)},
    attributes: {exclude: ['id', 'diagnosticId']}
  })

  const lexis = await Lexis.findOne({
    where: {diagnosticId: Number(id)},
    attributes: {exclude: ['id', 'diagnosticId']}
  })

  const coherentSpeech = await CoherentSpeech.findOne({
    where: {diagnosticId: Number(id)},
    attributes: {exclude: ['id', 'diagnosticId']}
  })

  const langAnalysis = await LangAnalysis.findOne({
    where: {diagnosticId: Number(id)},
    attributes: {exclude: ['id', 'diagnosticId']}
  })

  return {sensMotor, grammatic, lexis, coherentSpeech, langAnalysis}
}

async function getReadingResult(id){
  const readingMethod = await ReadingMethod.findOne({
    where: {diagnosticId: Number(id)},
    attributes: {exclude: ['id', 'diagnosticId']}
  })

  const right = await Right.findOne({
    where: {diagnosticId: Number(id)},
    attributes: {exclude: ['id', 'diagnosticId']}
  })

  const expressiveness = await Expressiveness.findOne({
    where: {diagnosticId: Number(id)},
    attributes: {exclude: ['id', 'diagnosticId']}
  })

  const mindfulness = await Mindfulness.findOne({
    where: {diagnosticId: Number(id)},
    attributes: {exclude: ['id', 'diagnosticId']}
  })

  const speed = await Speed.findOne({
    where: {diagnosticId: Number(id)}
  })

  return {speed: speed.count, skills: {readingMethod, right, expressiveness, mindfulness}}
}

async function getWritingResult(id){
  const pronunciationOfSounds = await PronunciationOfSounds.findOne({
    where: {diagnosticId: Number(id)},
    attributes: {exclude: ['id', 'diagnosticId']}
  })

  const undisturbedPronunciation = await UndisturbedPronunciation.findOne({
    where: {diagnosticId: Number(id)},
    attributes: {exclude: ['id', 'diagnosticId']}
  })

  const violationForms = await ViolationForms.findOne({
    where: {diagnosticId: Number(id)},
    attributes: {exclude: ['id', 'diagnosticId']}
  })

  const underdevelopmentGrammatical = await UnderdevelopmentGrammatical.findOne({
    where: {diagnosticId: Number(id)},
    attributes: {exclude: ['id', 'diagnosticId']}
  })

  const visuospatialFunctions = await VisuospatialFunctions.findOne({
    where: {diagnosticId: Number(id)},
    attributes: {exclude: ['id', 'diagnosticId']}
  })

  return {
    skills: {
      pronunciationOfSounds,
      undisturbedPronunciation,
      violationForms,
      underdevelopmentGrammatical,
      visuospatialFunctions
    }
  }
}


module.exports = new DiagnosticController()