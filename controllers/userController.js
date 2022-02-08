const ErrorApi = require('../error/ErrorApi')
const {User} = require('../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserController {
  async registration(req, res, next){
      const {
        email, password, firstName, lastName, patronymic, role
      } = req.body

      if (!email || !password){
        return next(ErrorApi.badRequest('Некорректный email или пароль'))
      }

      if (!firstName || !lastName || !patronymic){
        return next(ErrorApi.badRequest('ФИО обязательны для ввода'))
      }

      const candidate = await User.findOne({where: {email}})

      if (candidate){
        return next(ErrorApi.badRequest('Пользователь с таким email существует'))
      }

      const hashPassword = await bcrypt.hash(password, 5)

      const user = await User.create({email, password: hashPassword, firstName, lastName, patronymic, role})

      const token = jwt.sign(
        {id: user.id, email, role: user.role},
        process.env.SECRET_KEY,
        {expiresIn: "24h"}
      )
      res.json(token)
  }

  async login(req, res, next){
    const {email , password} = req.body

    const user = await User.findOne({where:{email}})

    if (!user){
      return next(ErrorApi.badRequest('Пользователь не найден'))
    }

    const comparePassword = bcrypt.compareSync(password, user.password)

    if (!comparePassword){
      return next(ErrorApi.badRequest("Введен неверный пароль"))
    }

    const token = jwt.sign(
      {id: user.id, email, role: user.role},
      process.env.SECRET_KEY,
      {expiresIn: "24h"}
    )

    res.json(token)
  }
  async check(req, res, next){
    const token = jwt.sign(
      {id: req.user.id, email: req.user.email, role: req.user.role},
      process.env.SECRET_KEY,
      {expiresIn: "24h"}
    )
    return res.json(token)
  }

  async getAll(req, res){
    const users = await User.findAll()
    res.json(users)
  }

  async setPassword(req, res, next){
    const {id, password} = req.body
    const hashPassword = await bcrypt.hash(password, 5)
    const updateUser = await User.update({password: hashPassword}, {where:{id}})
    console.log(updateUser)
    if (updateUser == 0){
      return next(ErrorApi.badRequest(`Отстутствует пользователь с таким id (${id})`))
    }
    res.json({message: `Пароль пользователя с id = ${id} изменён`})
  }

  async remove(req, res, next){
    const {id} = req.params
    try {
      const count = await User.destroy({where: {id}})
      if (count === 0){
        return next(ErrorApi.badRequest(`Отстутствует пользователь с id = ${id}`))
      }
      return res.json({message: `Удалено записей: ${count}`})
    } catch (e) {
      return next(ErrorApi.badRequest(e.message))
    }
  }
}

module.exports = new UserController()