const {Diagnostic, StateOfFunc, Student, User, Type} = require('../models/models')
const ErrorApi = require('../error/ErrorApi')
const fs = require('fs')
const sequilize = require('../db')

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
      attributes: {exclude:['id', 'diagnosticId']}
    },)
    res.json({stateOfFunc})
  }

  async create(req, res) {
    const {studentId, userId, typeId, classNumber, date} = req.body
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
    const stateOfFunc = await StateOfFunc.update({...data.data}, {where: {diagnosticId: data.id}})
    return res.json(stateOfFunc)
  }

  async remove(req, res) {
    const {id} = req.params
    const diagnostic = await Diagnostic.destroy({where: {id}})
    res.json(diagnostic)
  }


}

module.exports = new DiagnosticController()