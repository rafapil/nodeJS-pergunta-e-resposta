const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const conn = require("./database/database");
const Pergunta = require("./database/ModelPergunta");
const Resposta = require("./database/ModelResposta");

// Database
conn.authenticate()
    .then(() => {
        console.log('Conexao ok brabo');
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

// informando ao express usar o view engine do EJS
app.set('view engine', 'ejs');
app.use(express.static('public'));

// para usar o bodyParse 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rotas 
app.get("/", (req, res) => {
    Pergunta.findAll({
        raw: true, order: [
            ['id', 'DESC'] // ASC = Crescente || DESC = Decrescente
        ]
    }).then(perguntas => {
        res.render("index", {
            perguntas: perguntas
        });
    });
});


app.get('/perguntar', (req, res) => {

    res.render('perguntar');

});

// rota para receber dados de foprmulario 
app.post('/salvarpergunta', (req, res) => {
    let titulo = req.body.txtTitulo;
    let descricao = req.body.txaDescri;

    // res.send('Formulario recebido!!! ' + titulo + ' descri: ' + descri);
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect('/');
    });


});

app.get('/pergunta/:id', (req, res) => {
    var id = req.params.id;
    // findOne permite fazer os selects com filtros 
    Pergunta.findOne({
        where: { id: id }
    }).then(pergunta => {
        if (pergunta != undefined) {
            // pegar as respostas da outra tabela se existir
            Resposta.findAll({
                where: { perguntaId: pergunta.id },
                order: [['id', 'DESC']]
            }).then(respostas => {
                res.render('pergunta', {
                    pergunta: pergunta,
                    respostas: respostas
                });
            });


        } else {
            res.redirect('/');
        }
    })
});

app.post('/responder', (req, res) => {
    let corpo = req.body.txaResposta;
    let perguntaId = req.body.txtId;

    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect('/pergunta/' + perguntaId);
    });

});

// iniciando o server 
app.listen(8080, () => { console.log('App rodando!') });
