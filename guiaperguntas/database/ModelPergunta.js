const Sequelize = require('sequelize');
const conn = require('./database');

const Pergunta = conn.define('perguntas', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

// ele não vai forçar criar a tabela caso exista então cria uma vez apenas
Pergunta.sync({ force: false }).then(() => { });

// nunca esqueça de exportar os modulos 
module.exports = Pergunta;