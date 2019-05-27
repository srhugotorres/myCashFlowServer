const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const isEmpty = require("../../validation/is-empty");

// Carrega a validação
const validateSpendingInput = require("../../validation/spending");

// Load Spending model
const Spending = require("../../models/Spending");
// Load User profile
const User = require("../../models/User");
//
function toDateObject(date) {
    'use strict';
    return new Date(
        date.year,
        date.month - 1,
        date.day
    );
}
function toSimpleObject(myDate) {
    'use strict';
    return{
        day:  myDate.getDate(),
        month: myDate.getMonth() + 1,
        year:  myDate.getFullYear()
    }
}
function addMonth(date, months) {
    let myDate = toSimpleObject(date);
    myDate.month = myDate.month + months;
    return  toDateObject(myDate)
}
//

// @route   GET api/spendings/test
// @desc    Tests spendings route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Spending works!" }));

// @route   GET api/spendings
// @desc    Get current user spendings
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Spending.find({ user: req.user.id })
      .then(spendings => {
        if (isEmpty(spendings)) {
          errors.noSpendings = "Nenhuma despensa mensal cadastrada para este usuário";
          res.status(404).json(errors);
        }

        res.json(spendings);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/spendings
// @desc    Adiciona ou edita uma despesa mensal
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateSpendingInput(req.body);

    // Checar a validação
    if (!isValid) {
      // Retornar os erros com o status 400
      return res.status(400).json(errors);
    }

    // Obtem os campos
    const spendingFields = {};

    spendingFields.user = req.user.id;

    if (req.body.spending) spendingFields.spending = req.body.spending;
    if (req.body.currentBill) spendingFields.currentBill = req.body.currentBill;
    if (req.body.totalBills) spendingFields.totalBills = req.body.totalBills;
    if (req.body.category) spendingFields.category = req.body.category;
    if (req.body.paymentDate) spendingFields.paymentDate = req.body.paymentDate;
    if (req.body.payment) spendingFields.payment = req.body.payment;
    if (req.body.value) spendingFields.value = req.body.value;

    Spending.findById(req.body.id).then(spending => {
      if (spending) {
        // Editar
        spendingFields.updatedDate = Date.now();

        Spending.findOneAndUpdate(
          { _id: req.body.id },
          { $set: spendingFields },
          { new: true }
        ).then(spending => res.json(spending));
      } else {
        // Adicionar
        // Salvar
        let spendingID;
        let countDate = 1;
        new Spending(spendingFields).save(
          function(err,mySpending){
            spendingID = mySpending.id
            Spending.findById(spendingID).then(
              spending => {
                // Verifica se o gasto é recorrente
                if (spending.totalBills > 1){
                  for(let i = spending.currentBill + 1 ; i <= spending.totalBills; i++){
                    console.log("Contando.... : " + countDate);
                    let currentSpending = {};
                    currentSpending.user = spending.user;
                    currentSpending.spending = spending.spending;
                    currentSpending.currentBill = i;
                    currentSpending.totalBills = spending.totalBills;
                    currentSpending.category = spending.category;
                    // Necessário realizar correção na data para que vá incrementando o mês
                    currentSpending.paymentDate =  addMonth(spending.paymentDate,countDate);
                    currentSpending.payment = spending.payment;
                    currentSpending.value = spending.value;
                    // adiciona a despesa recorrente com mês seguinte.
                    new Spending(currentSpending).save();
                    countDate++;
                  }
                }
              }
            )
          }
        ).then(spending => res.json(spending));
      }
    });
  }
);

// @route   DELETE api/spending/:id
// @desc    Deleta uma despesa
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Spending.findById(req.params.id).then(spending => {
      // Check for spending owner
      if (spending.user.toString() !== req.user.id) {
        errors.noAuthorization = "Usuário não autorizado";
        res.status(401).json(errors);
      }

      // Delete
      spending
        .remove()
        .then(() => res.json({ success: true }))
        .catch(err =>
          res
            .status(404)
            .json({ spendingNotFound: "Esta despesa não foi encontrada" })
        );
    });
  }
);

module.exports = router;
