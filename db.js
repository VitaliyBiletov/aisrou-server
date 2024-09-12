require('dotenv').config()
const {Sequelize} = require('sequelize')

module.exports = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'postgres',
        host: 'db',
        pool: {
            max: 9,
            min: 0,
            idle: 10000
        }
    }
)