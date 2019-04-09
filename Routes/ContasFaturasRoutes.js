const express = require('express');
const ContasFaturasRoutes = express.Router();

const ContasFaturas = require('../Model/contasFaturas.js');

// index
ContasFaturasRoutes.route('/').get(function(req, res) {
    ContasFaturas.find(function(err, faturasContas) {
        if (err) {
            console.log(err);
        } else {
            res.json(faturasContas);
        }
    });
});
// Add

ContasFaturasRoutes.route('/add').post(function(req, res) {
    let faturasContas = new ContasFaturas(req.body);
    faturasContas.save()
        .then(faturasContas => {
            res.status(200).json({'ContasFaturas': 'ContasFaturas adicionado com sucesso'});
        })
        .catch(err => {
            res.status(400).send('adição de um novo ContasFaturas falhou');
        });
});

//
ContasFaturasRoutes.route('/:id').get(function(req, res){
    let id = req.params.id;
    ContasFaturas.findById(id, function(err, faturasContas){
        res.json(faturasContas);
    });
});
//
ContasFaturasRoutes.route('/update/:id').post(function(req,res){
    ContasFaturas.findById(req.params.id, function(err, faturasContas){
        if(!faturasContas){
            res.status(404).send("data is not found");
        }else{
            faturasContas.descricao = req.body.descricao;
            faturasContas.dataPagamento =  req.body.dataPagamento;
            faturasContas.dataVencimento = req.body.dataVencimento;
            faturasContas.valor = req.body.valor;

            faturasContas.save()
                .then(faturasContas => {
                    res.json("ContasFaturas Atualizado!");
                })
                .catch(err => {
                    res.status(400).send("Não foi possível atualizar");
                });
        }
    });
});
module.exports = ContasFaturasRoutes