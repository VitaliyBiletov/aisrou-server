const {Student} = require('../models/models')
const ErrorApi = require('../error/ErrorApi')
const sequilize = require('../db')

class StudentController {
  async registration(req, res, next){
    const {
      firstName,
      lastName,
      dateOfBirth,
      enrollmentDate } = req.body
    try {
      const student = await Student.create({firstName, lastName, dateOfBirth, enrollmentDate})
      res.json({id: student.id, lastName: student.lastName, firstName: student.firstName})
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
    const students = await sequilize.query(
      `SELECT id, "firstName" as "Имя", "lastName" as "Фамилия", "dateOfBirth" as "Дата рождения", "enrollmentDate" as "Дата зачисления" FROM students;`)
    const fields = students[1].fields.map(f=>f.name)
    const data = students[0]
    res.json({fields, data})
  }

  //returning list students for select
  async getList(req, res,){
    const students = await Student.findAll({attributes:['id', 'firstName', 'lastName']})
    const studentsList = students.map(s=>({id: s.id, name: s.lastName + " " + s.firstName}))
    res.json(studentsList)
  }

  async edit(req, res){
    console.log("params ", req.params)
    console.log("body ",req.body)
    await Student.update(req.body, {where:{id: req.params.id}})
    const student = await Student.findOne({
      attributes: ['firstName', 'lastName', 'dateOfBirth', 'enrollmentDate'],
      where:{id: req.params.id}
    })
    res.json({id: Number(req.params.id), ...student.dataValues})
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