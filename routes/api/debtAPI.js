const express = require('express');
const debtsAPI = express.Router();

const debtModel = require('../../models/debt.js');

debtsAPI.route('/').get(function(req, res) {
    debtModel.find(function(err, debt) {
        if (err) {
            console.log(err);
        } else {
            res.json(debt);
        }
    });
});
// Add

debtsAPI.route('/').post(function(req, res) {
    let debt = new debtModel(req.body);
    debt.save()
        .then(debt => {
            res.status(200).json({'Dívidas': 'Dívidas adicionado com sucesso'});
        })
        .catch(err => {
            res.status(400).send('adição de um novo Dívidas falhou');
        });
});

//
debtsAPI.route('/:id').get(function(req, res){
    let id = req.params.id;
    debtModel.findById(id, function(err, debt){
        res.json(debt);
    });
});
//
debtsAPI.route('/:id').post(function(req,res){
    debtModel.findById(req.params.id, function(err, debt){
        if(!debt){
            res.status(404).send("data is not found");
        }else{
            debt.description = req.body.description;
            debt.dueDay =  req.body.dueDay;
            debt.totalDebt = req.body.totalDebt;

            debt.save()
                .then(debt => {
                    res.json("Dívidas Atualizado!");
                })
                .catch(err => {
                    res.status(400).send("Não foi possível atualizar");
                });
        }
    });
});
module.exports = debtsAPI