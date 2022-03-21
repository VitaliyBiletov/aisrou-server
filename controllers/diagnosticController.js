const {Diagnostic, Student, User, Type} = require('../models/models')
const ErrorApi = require('../error/ErrorApi')
const fs = require('fs')

class DiagnosticController {
  async getDiagnostics(req, res){
    const {studentId} = req.query
    const diagnostics = await Diagnostic.findAll({
      where: {studentId},
      include: [
        {
          model: User,
        },
        {
          model: Type,
        },
      ],
    })

    let fields = Object.entries(Diagnostic.fieldAttributeMap).map(d=>{
      if (d.name === 'userId'){
        return {name: 'user', 'title': 'Учитель'}
      }
      return {name: d[1], title: d[0]}
    })

    const list = diagnostics.map(d=>{
      return {id: d.id, fieldsData: fields.map(f=>{
          if (f.name === 'userId'){
            return {name: 'user', value: d.user.fullName}
          }
          if (f.name === 'typeId'){
            return {name: 'type', value: d.type.title}
          }
          return {name: f.name, value: d[f.name]}
        })}
    })

    res.json({fields: fields, data: list})
  }

  async create(req, res){
    const {studentId, userId, typeId, classNumber, date} = req.body
    const diagnostic = await Diagnostic.create({
      studentId,
      userId,
      progress: 0,
      classNumber,
      typeId: typeId,
      createdAt: Date.parse(date)
    })

    const fields = Object.entries(Diagnostic.fieldAttributeMap).map(d=>{
      if (d.name === 'userId'){
        return {name: 'user', 'title': 'Учитель'}
      }
      return {name: d[1], title: d[0]}
    })

    const user = await User.findOne({where: {id: diagnostic.userId}})
    const type = await Type.findOne({where: {id: diagnostic.typeId}})

    const diagnosticData = fields.map((f)=>{
      if (f.name === 'userId'){
        return {name: 'user', value: user.fullName}
      }
      if (f.name === 'typeId'){
        return {name: 'typeId', value: type.title}
      }
      return {name: [f.name], value: diagnostic.dataValues[f.name]}
    })

    const diagnosticFormat = {id: diagnostic.id, fieldsData: diagnosticData}

    res.json(diagnosticFormat)
    //
    // console.log(diagnostic)
    //
    // const user = await User.findOne({where: {id: userId}})
    // res.json({
    //   id: diagnostic.id,
    //   createdAt: diagnostic.createdAt,
    //   progress: diagnostic.progress,
    //   user: user.fullName,
    //   classNumber: diagnostic.classNumber,
    //   type: diagnostic.typeId
    // })
  }

  async getTypes(req, res){
    const types = await Type.findAll()
    res.json(types)
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