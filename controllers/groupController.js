const ErrorApi = require('../error/ErrorApi')
const {User, Student, Group} = require('../models/models')

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

  async remove(req, res){
    const {id} = req.params
    const group = await Group.destroy({
      where:{id},
    }
    )
    res.json(group)
  }

  async getGroup(req, res){
    const {id} = req.params
    const user = await User.findOne({
        where:{id},
        include: {
          model: Student,
          through:{
            attributes:['id', 'createdAt']
          },
        },
        attributes:['lastName','firstName', 'patronymic'],
      }
    )

    if (user.students.length !== 0){
      return res.json(user.students.map(student=>({
        id: student.group.id,
        studentId: student.id,
        fullName: student.fullName,
        firstName: student.firstName,
        createdAt: student.group.createdAt,
      })))
    } else {
      return res.json([])
    }

  }
}

module.exports = new GroupController()