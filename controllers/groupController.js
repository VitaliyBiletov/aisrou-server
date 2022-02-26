const ErrorApi = require('../error/ErrorApi')
const {User, Student, Group} = require('../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class GroupController {
  async attach(req, res, next){
    const {
      userId, studentId
    } = req.body

    if (!userId){
      return next(ErrorApi.badRequest('Не выбран пользователь'))
    }

    if (!studentId){
      return next(ErrorApi.badRequest('Не выбран ученик'))
    }

    const item = await Group.findOne({where:{userId, studentId}})

    if (item){
      return next(ErrorApi.badRequest('Ученик уже прикреплен!'))
    }

    const group= await Group.create({userId, studentId})

    res.json(group)
  }

  async unAttach(req, res){
    const {
      groupId
    } = req.body

    const user = await Group.destroy({
      where:{id: groupId},
    }
    )
    res.json({
      user
    })
  }

  async getGroups(req, res){
    const {
      userId
    } = req.query
    const user = await User.findOne({
        where:{id: userId},
        include: {
          model: Student,
          attributes:['id','lastName','firstName'],
          through:{
            attributes:['id', 'createdAt']
          },
        },
        attributes:['lastName','firstName', 'patronymic'],
      }
    )
    res.json(user.students.map(student=>({
      id: student.group.id,
      studentId: student.id,
      lastName: student.lastName,
      firstName: student.firstName,
      createdAt: new Date(student.group.createdAt).toLocaleDateString(),
    })))
  }

  // async getUsers(req, res){
  //   const users = await User.findAll({
  //     attributes:['id','lastName', 'firstName', 'patronymic']
  //   })
  //   res.json(users)
  // }

  async getStudents(req, res){
    const students = await Student.findAll({
      attributes:['id','lastName', 'firstName']
    })
    res.json(students)
  }

  async getAll(req, res){
    const users = await User.findAll({
      include: {
        model: Student,
        required: true,
        attributes: ['lastName','firstName'],
        through:{
          attributes:['id','createdAt']
        }
      },
      attributes:['lastName', 'firstName', 'patronymic']
    })
    res.json(users)
  }

  async get(req, res){
    const {id} = req.params
    const user = await Group.findOne({where:{id}, attributes: ['id', 'firstName', 'lastName', 'patronymic', 'email', 'role']})
    res.json(user.userId)
  }
}

module.exports = new GroupController()