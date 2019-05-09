const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const isEmpty = require("../../validation/is-empty");


// Carrega a validação

const validateSpendingsInput = require("../../validation/spendings");

// Carregando Spendings model

const Spending = require("../../models/Spending");

// Carregando perfil de usuário
const User = require("../../models/User");

// @route   GET api/spending/test
// @desc    Tests Spending route
// @access  Public

router.get("/test", (req,res) => res.json({msg: "Spending works! "}));

// @route   GET api/spendings
// @desc    Get current user spendings
// @access  Private

router.get(
    "/",
    passport.authenticate("jwt",{session: false}),
    (req, res) => {
        const errors={};
        Spending.find({user:req.user.id})
            .then(spendings =>{
                if (isEmpty(spendings)){
                    errors.noSpendings = "Nenhum gasto registrado para este usuário";
                    res.status(404).json(errors)
                }
                res.json(spendings);
            })
            .catch(err => res.status(404).json(err));
        
    }
);


// @route   POST api/spendigs
// @desc    Adiciona ou edita um gasto
// @access  Private

router.post(
    "/",
    passport.authenticate("jwt",{ session: false }),
    (req,res) => {
        const { errors, isValid } = validateSpendingsInput(req.body);

        // Checa validação

        if (!isValid) {
            // Retornar os erros com o status 400
            return res.status(400).json(errors);
        }
        // Obtem os campos
        const spendingsFields = {};

        spendingsFields.user = req.user.id;

        if (req.body.category) spendingsFields.category = req.body.category;
        if(req.body.description) spendingsFields.description = req.body.description;
        if (req.body.paymentDate) spendingsFields.paymentDate = req.body.paymentDate;
        if(req.body.value) spendingsFields.value = req.body.value;

        Spending.findById(req.body.id).then(spending =>{
            if(spending){
                spendingsFields.updatedDate = Date.now();
                Spending.findOneAndUpdate(
                    {_id: req.body.id},
                    { $set: spendingsFields},
                    {new: true}
                ).then(spending => res.json(spending))
            } else {
                // Adicionar
                // Salvar
                new Spending(spendingsFields).save().then(spending => res.json(spending));
            }
        })

    }
);

module.exports = router;