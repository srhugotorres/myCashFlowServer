const express = require('express');
const billsRoutes = express.Router();

const billsModel = require('../models/Bills.js');

// index
billsRoutes.route('/').get(function(req, res) {
    billsModel.find(function(err, bill) {
        if (err) {
            console.log(err);
        } else {
            res.json(bill);
        }
    });
});
// Add

billsRoutes.route('/add').post(function(req, res) {
    let bill = new billsModel(req.body);
    bill.save()
        .then(bill => {
            res.status(200).json({'ContasFaturas': 'ContasFaturas adicionado com sucesso'});
        })
        .catch(err => {
            res.status(400).send('adição de um novo ContasFaturas falhou');
        });
});

//
billsRoutes.route('/:id').get(function(req, res){
    let id = req.params.id;
    billsModel.findById(id, function(err, bill){
        res.json(bill);
    });
});
//
billsRoutes.route('/update/:id').post(function(req,res){
    billsModel.findById(req.params.id, function(err, bill){
        if(!bill){
            res.status(404).send("data is not found");
        }else{
            bill.description = req.body.description;
            bill.dueDate = req.body.dueDate;
            bill.paymentDate =  req.body.paymentDate;
            bill.value = req.body.value;

            bill.save()
                .then(bill => {
                    res.json("ContasFaturas Atualizado!");
                })
                .catch(err => {
                    res.status(400).send("Não foi possível atualizar");
                });
        }
    });
});
module.exports = billsRoutes