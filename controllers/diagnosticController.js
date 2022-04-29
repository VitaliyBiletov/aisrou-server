const {
  Diagnostic,
  StateOfFunc,
  SensMotor,
  Grammatic,
  CoherentSpeech,
  Lexis,
  LangAnalysis,
  Speed,
  ReadingMethod,
  Right,
  Expressiveness,
  Mindfulness,
  PronunciationOfSounds,
  UndisturbedPronunciation,
  ViolationForms,
  UnderdevelopmentGrammatical,
  VisuospatialFunctions,
  Type} = require('../models/models')
const ErrorApi = require('../error/ErrorApi')
const fs = require('fs')
const sequilize = require('../db')
const _ = require('lodash')

class DiagnosticController {
  async getDiagnostics(req, res) {
    const {studentId} = req.query
    const diagnostics = await sequilize.query(`SELECT "diagnostics"."id", "types"."title" as "Тип", progress as "Прогресс", "diagnostics"."classNumber" as "Класс","createdAt" as "Дата"
                                              FROM diagnostics
                                              LEFT JOIN types ON diagnostics."typeId" = "types"."id"
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

  async tasksLoading(req, res) {
    const {id} = req.params
    const stateOfFunc = await StateOfFunc.findOne({
      where: {diagnosticId: Number(id)},
      attributes: {exclude: ['id', 'diagnosticId']}
    })
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

    res.json({
      stateOfFunc,
      sensMotor,
      grammatic,
      lexis,
      coherentSpeech,
      langAnalysis,
      reading : {speed: speed.count, skills: {readingMethod, right, expressiveness, mindfulness}},
      writing : {skills: {pronunciationOfSounds, undisturbedPronunciation, violationForms, underdevelopmentGrammatical, visuospatialFunctions}},
    })
  }

  async create(req, res) {
    const {studentId, userId, typeId, classNumber, date, tasks} = req.body
    const diagnostic = await Diagnostic.create({
        studentId,
        userId,
        progress: 0,
        classNumber,
        typeId: typeId,
        createdAt: Date.parse(date)
      }
    )

    await StateOfFunc.create({diagnosticId: diagnostic.id})
    await SensMotor.create({diagnosticId: diagnostic.id, ...tasks.sensMotor})
    await Grammatic.create({diagnosticId: diagnostic.id, ...tasks.grammatic})
    await Lexis.create({diagnosticId: diagnostic.id, ...tasks.lexis})
    await CoherentSpeech.create({diagnosticId: diagnostic.id, ...tasks.coherentSpeech})
    await LangAnalysis.create({diagnosticId: diagnostic.id, ...tasks.langAnalysis})
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

    const type = await Type.findOne({where: {id: diagnostic.typeId}})

    res.json({
      id: diagnostic.id,
      type: type.title,
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

      const type = await Type.findOne({where: {id: diagnostic.typeId}})

      res.json({
        id: diagnostic.id,
        type: type.title,
        "Прогресс": diagnostic.progress,
        "Класс": diagnostic.classNumber,
        date: diagnostic.createdAt
      })
    } catch (e) {
      return next(ErrorApi.badRequest(e.message))
    }
  }

  async getTypes(req, res) {
    const types = await Type.findAll()
    res.json(types)
  }

  async save(req, res) {
    const {data} = req.body
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

  async getResult(req, res){
    const {id} = req.params
    const stateOfFunc = await StateOfFunc.findOne(
      {
        where: {diagnosticId: id},
        attributes: ["Слух", "Зрение", "Голос", "Моторика", "Просодика", "Дыхание", "Артикулляционный аппарат", "Дополнительная информация"]})
    const sensMotor = await SensMotor.findOne({
      where: {diagnosticId: id},
      attributes:[
        "Артикуляционная моторика",
        "Фонематическое восприятие",
        "Звукопроизношение",
        "Звуко-слоговая структура"
      ]
    })

    //Результаты подразделов сенсо-моторного уровня (по отдельности)
    const result = Object.keys(sensMotor.dataValues).map(section=>{
      const sum = calcResult(sensMotor.dataValues[section])
      return {name: section, "Результат": sum}
    })

    //Массив с результатами разделов
    const sectionsModels = [
      {name: "Грамматика", model: Grammatic},
      {name: "Лексика", model: Lexis},
      {name: "Связная речь", model: CoherentSpeech},
      {name: "Языковой анализ", model: LangAnalysis}
      ]

    const resultSections = await calcSectionResult(id, sectionsModels)

    res.json({
      stateOfFunc: {title: "Состояние функций", data: stateOfFunc},
      sensMotor: _.union(result, resultSections),
    })
  }
}

function calcResult(data){
  if (data.length === 0){
    return 0
  }
  const tmp = data.reduce((sum, current)=>{
    return sum + current.value
  }, 0)
  const result = Number((tmp / (data.length * 3)) * 100).toFixed(2)
  return parseFloat(result)
}

async function calcSectionResult(id, modelsList){
  const sections = await Promise.all(modelsList.map(async function({name, model}){
      const section = await model.findOne({where:{diagnosticId: id}, attributes:{exclude: ['id', 'diagnosticId']}})
      const result = Object.keys(section.dataValues).map(item=>{
        return calcResult(section.dataValues[item])
      }).reduce((sum, current)=>{
        return sum + current
      }, 0)
    return {name , "Результат": parseFloat((result / Object.keys(section.dataValues).length).toFixed(2))}
  }))
  return sections
}

module.exports = new DiagnosticController()