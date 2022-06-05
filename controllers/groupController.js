const ErrorApi = require('../error/ErrorApi')
const {User, Student, Group} = require('../models/models')
const sequilize = require('../db')

class GroupController {
    async attach(req, res, next) {
        const {
            userId, studentId
        } = req.body
        if (!userId) {
            return next(ErrorApi.badRequest('Не выбран пользователь'))
        }
        if (!studentId) {
            return next(ErrorApi.badRequest('Не выбран ученик'))
        }
        const item = await Group.findOne({where: {userId, studentId}})
        if (item) {
            return next(ErrorApi.badRequest('Ученик уже прикреплен!'))
        }
        const group = await Group.create({userId, studentId})
        const student = await Student.findOne({where: {id: studentId}})

        res.json({id: group.id, lastName: student.lastName, firstName: student.firstName, createdAt: group.createdAt})
    }

    async remove(req, res) {
        const {id} = req.params
        const group = await Group.destroy({
                where: {id},
            }
        )
        res.json(group)
    }

    async getGroup(req, res) {
        const {id} = req.params
        const group = await sequilize.query(
            `SELECT groups.id, students."lastName" as "Фамилия", students."firstName" as "Имя", groups."createdAt" as "Прикреплен" from groups 
      LEFT JOIN students ON groups."studentId" = students.id
      WHERE groups."userId" = ${id};`)
        const fields = group[1].fields.map(f => f.name)
        const data = group[0]
        res.json({fields, data})

    }

    //returning a list of students for a select element (diagnostic-menu)
    async getGroupsList(req, res) {
        const {id} = req.body
        const {students} = await User.findOne({
                where: {id},
                include: {
                    model: Student,
                    attributes: ['id', 'firstName', 'lastName'],
                    through: {
                        attributes: []
                    },
                },
                attributes: [],
            }
        )
        res.json(students)
    }

    async test(req, res) {
        const group = await sequilize.query(
            `SELECT groups.id, students."lastName", students."firstName", groups."createdAt" as "Прикреплен" from groups 
      LEFT JOIN students ON groups."studentId" = students.id
      WHERE groups."userId" = ${32};`)
        const fields = group[1].fields.map(f => f.name)
        const data = group[0]
        res.json({fields, data})
    }
}

module.exports = new GroupController()