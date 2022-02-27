const {Diagnostic} = require('../models/models')
const ErrorApi = require('../error/ErrorApi')


class DiagnosticController {
  async getDiagnostics(req, res){
    const {studentId} = req.query
    const diagnostics = await Diagnostic.findAll({
      where: {studentId},
      attributes:['id','createdAt']
    })
    res.json(diagnostics)
  }

  async create(req, res){
    const {studentId} = req.body
    const diagnostic = await Diagnostic.create({studentId})
    res.json({
      id: diagnostic.id,
      createdAt: new Date(diagnostic.createdAt).toLocaleDateString(),
    })
  }

  async remove(req, res){
    const {diagId} = req.body
    console.log(diagId)
    const diagnostic = await Diagnostic.destroy({where: {id: diagId}})
    res.json({

    })
  }
}

module.exports = new DiagnosticController()