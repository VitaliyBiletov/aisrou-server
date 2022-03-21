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
          attributes:['id', 'firstName', 'lastName', 'fullName'],
          through:{
            attributes:['id', 'createdAt']
          },
        },
        attributes:['id'],
      }
    )

    //headers for columns in table (admin->groups)
    const fields = [
      {name: 'student', title: 'Ученик'},
      {name: 'createdAt', title: 'Прикреплен'}
    ]

    //data for body in table
    const data = user.students.map(
      s=>({
        id: s.group.id,
        fieldsData:[
          {name: 'fullName', value: s.fullName},
          {name: 'date', value: s.group.createdAt}
        ]}))

    return res.json({data, fields})
  }

  //returning a list of students for a select element (diagnostic-menu)
  async getGroupsList(req, res){
    const {id} = req.body
    const {students} = await User.findOne({
        where:{id},
        include: {
          model: Student,
          attributes:['id', 'firstName', 'lastName', 'fullName'],
          through:{
            attributes:[]
          },
        },
        attributes:[],
      }
    )
    res.json(students)
  }
}

module.exports = new GroupController()