const ErrorApi = require('../error/ErrorApi')
const {User} = require('../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateToken = (id, email, role) => {
  return jwt.sign(
    {id, email, role},
    process.env.SECRET_KEY,
    {expiresIn: "24h"}
  )
}

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

      const token = generateToken(user.id, user.email, user.role)
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

    const token = generateToken(user.id, user.email, user.role)

    res.json(token)
  }

  async check(req, res, next){
    const token = generateToken(req.user.id, req.user.email, req.user.role)
    return res.json(token)
  }

  async get(req, res){
    const {id} = req.params
    const user = await User.findOne({where:{id}, attributes: ['id', 'firstName', 'lastName', 'patronymic', 'email', 'role']})
    res.json(user)
  }

  async getAll(req, res){
    const users = await User.findAll({attributes: ['id', 'lastName', 'firstName', 'patronymic', 'email', 'role']})
    res.json(users)
  }

  async editUser(req, res, next){
    try{
      const user = await User.update(req.body, {where:{id: req.params.id}})
      res.json({user})
    }catch (e) {
      return next(ErrorApi.badRequest('Такой email уже есть в системе'))
    }
  }

  async setPassword(req, res, next){
    const {id, password} = req.body
    const hashPassword = await bcrypt.hash(password, 5)
    const updateUser = await User.update({password: hashPassword}, {where:{id}})
    if (updateUser === 0){
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