const Sequelize = require('sequelize');

const conn = new Sequelize('guiaperguntas', 'root', 'stk456rfs', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = conn;