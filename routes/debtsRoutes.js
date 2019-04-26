const express = require('express');
const debtsRoutes = express.Router();

const debtsModel = require('../models/Debts.js');

debtsRoutes.route('/').get(function(req, res) {
    debtsModel.find(function(err, debt) {
        if (err) {
            console.log(err);
        } else {
            res.json(debt);
        }
    });
});
// Add

debtsRoutes.route('/add').post(function(req, res) {
    let debt = new debtsModel(req.body);
    debt.save()
        .then(debt => {
            res.status(200).json({'Dívidas': 'Dívidas adicionado com sucesso'});
        })
        .catch(err => {
            res.status(400).send('adição de um novo Dívidas falhou');
        });
});

//
debtsRoutes.route('/:id').get(function(req, res){
    let id = req.params.id;
    debtsModel.findById(id, function(err, debt){
        res.json(debt);
    });
});
//
debtsRoutes.route('/update/:id').post(function(req,res){
    debtsModel.findById(req.params.id, function(err, debt){
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
module.exports = debtsRoutes