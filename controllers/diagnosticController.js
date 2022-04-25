const {
  Diagnostic,
  StateOfFunc,
  SensMotor,
  Grammatic,
  CoherentSpeech,
  Lexis,
  LangAnalysis,
  Reading,
  Speed,
  Writing,
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
    const reading = await Reading.findOne({
      where: {diagnosticId: Number(id)},
      attributes: {exclude: ['id', 'diagnosticId']}
    })
    const speed = await Speed.findOne({
      where: {diagnosticId: Number(id)}
    })
    const writing = await Writing.findOne({
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
      reading : {speed: speed.count, skills: reading},
      writing : {skills: writing},
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
    await Reading.create({diagnosticId: diagnostic.id})
    await Speed.create({diagnosticId: diagnostic.id})
    await Writing.create({diagnosticId: diagnostic.id})

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
    const stateOfFunc = await StateOfFunc.update({...data.results.stateOfFunc}, {where: {diagnosticId: data.id}})
    const sensMotor = await SensMotor.update({...data.results.sensMotor}, {where: {diagnosticId: data.id}})
    const grammatic = await Grammatic.update({...data.results.grammatic}, {where: {diagnosticId: data.id}})
    const lexis = await Lexis.update({...data.results.lexis}, {where: {diagnosticId: data.id}})
    const coherentSpeech = await CoherentSpeech.update({...data.results.coherentSpeech}, {where: {diagnosticId: data.id}})
    const langAnalysis = await LangAnalysis.update({...data.results.langAnalysis}, {where: {diagnosticId: data.id}})
    // console.log(data.results.reading.skills)
    const reading = await Reading.update({...data.results.reading.skills}, {where: {diagnosticId: data.id}})
    const writing = await Writing.update({...data.results.writing.skills}, {where: {diagnosticId: data.id}})
    const speed = await Speed.update({count: data.results.reading.speed}, {where: {diagnosticId: data.id}})

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