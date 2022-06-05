const ErrorApi = require('../error/ErrorApi')
const {User} = require('../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sequilize = require('../db')

const generateToken = (id, email, fullName, role) => {
    return jwt.sign(
        {id, email, fullName, role},
        process.env.SECRET_KEY,
        {expiresIn: "24h"}
    )
}

class UserController {

    async registration(req, res, next) {
        const {
            email, password, firstName, lastName, patronymic, role
        } = req.body

        if (!firstName || !lastName || !patronymic) {
            return next(ErrorApi.badRequest('ФИО обязательны для ввода'))
        }
        if (!email) {
            return next(ErrorApi.badRequest('Некорректный email'))
        }
        if (!password) {
            return next(ErrorApi.badRequest('Некорректный пароль'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ErrorApi.badRequest('Пользователь с таким email существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, password: hashPassword, firstName, lastName, patronymic, role})
        res.json({
            id: user.id,
            lastName: user.lastName,
            firstName: user.firstName,
            patronymic: user.patronymic,
            email: user.email,
            role: user.role
        })
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ErrorApi.badRequest('Пользователь с таким email не найден'))
        }
        const comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ErrorApi.badRequest("Введен неверный пароль"))
        }
        const fullName = user.lastName + ' ' + user.firstName
        const token = generateToken(user.id, user.email, fullName, user.role)
        res.json(token)
    }

    async check(req, res) {
        const token = generateToken(req.user.id, req.user.email, req.user.fullName, req.user.role)
        return res.json(token)
    }

    async getUser(req, res) {
        const {id} = req.params
        const user = await User.findOne({
            where: {id},
            attributes: ['id', 'firstName', 'lastName', 'patronymic', 'role']
        })
        res.json(user)
    }

    //return all records from table (admin->users)
    async getUsers(req, res) {
        const users = await sequilize.query(
            `SELECT id, "firstName" as "Имя", "lastName" as "Фамилия", "patronymic" as "Отчество", "email", "role" as "Роль" FROM users;`)
        const fields = users[1].fields.map(f => f.name)
        const data = users[0]
        res.json({fields, data})
    }

    //from select
    async getList(req, res) {
        const users = await User.findAll(
            {attributes: ['id', 'firstName', 'lastName', 'patronymic']}
        )
        const usersList = users.map(u => ({id: u.id, name: u.lastName + " " + u.firstName}))
        res.json(usersList)
    }

    async edit(req, res, next) {
        try {
            await User.update(req.body, {where: {id: req.params.id}})
            const user = await User.findOne({
                attributes: ['firstName', 'lastName', 'patronymic', 'email', 'role'],
                where: {id: req.params.id}
            })
            res.json({id: Number(req.params.id), ...user.dataValues})
        } catch (e) {
            return next(ErrorApi.badRequest('Такой email уже есть в системе'))
        }
    }

    async setPassword(req, res, next) {
        const {id, password} = req.body
        const hashPassword = await bcrypt.hash(password, 5)
        const updateUser = await User.update({password: hashPassword}, {where: {id}})
        if (updateUser === 0) {
            return next(ErrorApi.badRequest(`Отстутствует пользователь с таким id (${id})`))
        }
        res.json({message: `Пароль пользователя с id = ${id} изменён`})
    }

    async remove(req, res, next) {
        const {id} = req.params
        try {
            const count = await User.destroy({where: {id}})
            if (count === 0) {
                return next(ErrorApi.badRequest(`Отстутствует пользователь с id = ${id}`))
            }
            return res.json({message: `Удалено записей: ${count}`})
        } catch (e) {
            return next(ErrorApi.badRequest(e.message))
        }
    }
}


module.exports = new UserController()