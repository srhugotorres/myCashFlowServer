const express = require('express');
const billAPI = express.Router();

const billModel = require('../../models/bill.js');

// index
billAPI.route('/').get(function(req, res) {
    billModel.find(function(err, bill) {
        if (err) {
            console.log(err);
        } else {
            res.json(bill);
        }
    });
});
// Add

billAPI.route('/').post(function(req, res) {
    let bill = new billModel(req.body);
    bill.save()
        .then(bill => {
            res.status(200).json({'ContasFaturas': 'ContasFaturas adicionado com sucesso'});
        })
        .catch(err => {
            res.status(400).send('adição de um novo ContasFaturas falhou');
        });
});

//
billAPI.route('/:id').get(function(req, res){
    let id = req.params.id;
    billModel.findById(id, function(err, bill){
        res.json(bill);
    });
});
//
billAPI.route('/:id').post(function(req,res){
    billModel.findById(req.params.id, function(err, bill){
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
module.exports = billAPI