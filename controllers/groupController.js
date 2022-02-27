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
}

module.exports = new GroupController()