const {Student} = require('../models/models')
const ErrorApi = require('../error/ErrorApi')

class StudentController {
  async registration(req, res, next){
    const {
      firstName,
      lastName,
      dateOfBirth,
      enrollmentDate,
      enrollmentСlass } = req.body
    console.log(req.body)
    try {
      const student = await Student.create({firstName, lastName, dateOfBirth, enrollmentDate, enrollmentСlass})
      return res.json(student)
    } catch (e) {
      return next(ErrorApi.badRequest(e.message))
    }

  }

  async getAll(req, res, next){
    try {
      const students = await Student.findAll({attributes: ['id', 'Фамилия', 'Имя', 'Дата рождения', 'Класс зачисления', 'Дата зачисления']})
      return res.json(students)
    } catch (e) {
      return res.json({message: e.message})
    }
  }

  async check(req, res, next){
    const {id} = req.params
    const student = await Student.findOne({where: {id}})
    if(!student){
      return next(ErrorApi.badRequest(`Отстутствует ученик с id = ${id}`))
    }
    return res.json(student)
  }

  async edit(req, res, next){
    const student = await Student.update(req.body, {where:{id: req.params.id}})
    res.json({student})
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