const {Wishes} = require('../models/models')

class WishesController {
    async list(req, res) {
        const wishes = await Wishes.findAll({attributes: ['id', 'wishText', 'state']})
        res.json(wishes)
    }

    async create(req, res) {
        const {wishText, state} = req.body
        const wishes = await Wishes.create({wishText, state})
        res.json(wishes)
    }

    async remove(req, res) {
        const {id} = req.params
        const count = await Wishes.destroy({where: {id}})
        res.json(count)
    }


}

module.exports = new WishesController()