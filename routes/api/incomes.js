const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const isEmpty = require("../../validation/is-empty");

// Carrega a validação
const validateIncomeInput = require("../../validation/incomes");

// Load Income model
const Income = require("../../models/Income");
// Load User profile
const User = require("../../models/User");

// @route   GET api/incomes/test
// @desc    Tests incomes route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Income works!" }));

// @route   GET api/incomes
// @desc    Get current user incomes
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Income.find({ user: req.user.id })
      .then(incomes => {
        if (isEmpty(incomes)) {
          errors.noIncomes = "Nenhuma renda cadastrada para este usuário";
          res.status(404).json(errors);
        }

        res.json(incomes);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/incomes
// @desc    Adiciona ou edita uma renda
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateIncomeInput(req.body);

    // Checar a validação
    if (!isValid) {
      // Retornar os erros com o status 400
      return res.status(400).json(errors);
    }

    // Obtem os campos
    const incomeFields = {};

    incomeFields.user = req.user.id;

    if (req.body.category) incomeFields.category = req.body.category;
    if (req.body.description) incomeFields.description = req.body.description;
    if (req.body.value) incomeFields.value = req.body.value;
    if (req.body.date) incomeFields.date = req.body.date;

    Income.findById(req.body.id).then(income => {
      if (income) {
        // Editar
        incomeFields.updatedDate = Date.now();

        Income.findOneAndUpdate(
          { _id: req.body.id },
          { $set: incomeFields },
          { new: true }
        ).then(income => res.json(income));
      } else {
        // Adicionar
        // Salvar
        new Income(incomeFields).save().then(income => res.json(income));
      }
    });
  }
);

module.exports = router;
