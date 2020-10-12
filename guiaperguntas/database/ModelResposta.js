const Sequelize = require('sequelize');
const conn = require('./database');

const Resposta = conn.define('respostas', {
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    // forma de fazer um join errada
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Resposta.sync({ force: false }).then(() => { });

module.exports = Resposta;