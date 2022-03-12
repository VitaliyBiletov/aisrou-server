const {Diagnostic, Student, User} = require('../models/models')
const ErrorApi = require('../error/ErrorApi')
const fs = require('fs')

class DiagnosticController {
  async getDiagnostics(req, res){
    const {studentId} = req.query
    const diagnostics = await Diagnostic.findAll({
      where: {studentId},
      include: {
        model: User,
        attributes: ['lastName', 'firstName', 'patronymic']
      },
      attributes: ['id', 'progress', 'createdAt']
    })
    const listDiags = diagnostics.map(({id, createdAt, progress, user}) =>
      ({id, createdAt, progress: progress, user: user.fullName}))
    res.json(listDiags)
  }

  async create(req, res){
    const {studentId, userId} = req.body
    const diagnostic = await Diagnostic.create({studentId, userId})
    const user = await User.findOne({where: {id: userId}})
    res.json({
      id: diagnostic.id,
      createdAt: diagnostic.createdAt,
      progress: diagnostic.progress,
      user: user.fullName,
    })
  }

  async save(req, res){
    const {data} = req.body
    fs.writeFileSync('files/testFile.json', JSON.stringify(data));
    res.json({"message": 'saveOk'})
  }

  async remove(req, res){
    const {id} = req.params
    const diagnostic = await Diagnostic.destroy({where: {id}})
    res.json({
      mes: 'Ok'
    })
  }
}

module.exports = new DiagnosticController()