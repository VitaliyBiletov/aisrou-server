const {Student} = require('../models/models')
const ErrorApi = require('../error/ErrorApi')
const {formatedDataFromTable} = require('./utils')


class StudentController {
  async registration(req, res, next){
    const {
      firstName,
      lastName,
      dateOfBirth,
      enrollmentDate } = req.body
    try {
      const student = await Student.create({firstName, lastName, dateOfBirth, enrollmentDate, enrollmentСlass})
      return res.json(student)
    } catch (e) {
      return next(ErrorApi.badRequest(e.message))
    }
  }

  async get(req, res, next){
    const {id} = req.params
    const student = await Student.findOne({where: {id}})
    if(!student){
      return next(ErrorApi.badRequest(`Отстутствует ученик с id = ${id}`))
    }
    return res.json(student)
  }

  //return all records for table (admin->students)
  async getAll(req, res, next){
    const exclude = ['updatedAt']
    const result = await formatedDataFromTable(Student, exclude)
    res.json(result)
  }

  //returning list students for select
  async getList(req, res,){
    const students = await Student.findAll({attributes:['id', 'firstName', 'lastName']})
    const studentsList = students.map(s=>({id: s.id, name: s.fullName}))
    res.json(studentsList)
  }

  async edit(req, res){
    await Student.update(req.body, {where:{id: req.params.id}})
    const student = await Student.findOne({
      attributes: ['firstName', 'lastName', 'dateOfBirth', 'enrollmentDate'],
      where:{id: req.params.id}
    })
    const updatedData = {id: Number(req.params.id), fieldsData: Object.entries(student.dataValues).map(([name, value])=>({name, value}))}
    res.json(updatedData)
  }

  async remove(req, res, next){
    const {id} = req.params
    try {
      const count = await Student.destroy({where: {id}})
      if (count === 0){
        return next(ErrorApi.badRequest(`Отстутствует ученик с id = ${id}`))
      }
      return res.json({message: `Удалено записей: ${count}`})
    } catch (e) {
      return next(ErrorApi.badRequest(e.message))
    }
  }
}

module.exports = new StudentController()