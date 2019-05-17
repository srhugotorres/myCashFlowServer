const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const isEmpty = require("../../validation/is-empty");

// Carrega a validação
const validateBillsInput = require("../../validation/bills");

// Carregando Bill model
const Bill = require("../../models/Bill");

// Carregando perfil de usuário
const User = require("../../models/User");

// @route   GET api/bills/test
// @desc    Tests Bill route
// @access  Public

router.get("/test", (req, res) => res.json({ msg: "Bill works! " }));

// @route   GET api/bills
// @desc    Get current user bills
// @access  Private

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Bill.find({ user: req.user.id })
      .then(bills => {
        if (isEmpty(bills)) {
          errors.noBills = "Nenhuma conta/fatura para este usuário";
          res.status(404).json(errors);
        }
        res.json(bills);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/bills
// @desc    Adiciona ou edita uma Conta/Fatura
// @access  Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateBillsInput(req.body);
    // Checa validação

    if (!isValid) {
      // Retornar os erros com o status 400
      return res.status(400).json(errors);
    }
    // Obtem os campos
    const billsFields = {};

    billsFields.user = req.user.id;

    if (req.body.description) billsFields.description = req.body.description;
    if (req.body.dueDate) billsFields.dueDate = req.body.dueDate;
    if (req.body.value) billsFields.value = req.body.value;

    Bill.findById(req.body.id).then(bill => {
      if (bill) {
        // Editar
        billsFields.updatedDate = Date.now();

        Bill.findOneAndUpdate(
          { _id: req.body.id },
          { $set: billsFields },
          { new: true }
        ).then(bill => res.json(bill));
      } else {
        // Adicionar
        // Salvar
        new Bill(billsFields).save().then(bill => res.json(bill));
      }
    });
  }
);

module.exports = router;
