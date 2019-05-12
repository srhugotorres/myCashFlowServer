const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const isEmpty = require("../../validation/is-empty");

// Carrega a validação
const validateExpenseInput = require("../../validation/expenses");

// Load Expense model
const Expense = require("../../models/expense");
// Load User profile
const User = require("../../models/User");

// @route   GET api/expenses/test
// @desc    Tests expenses route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Expense works!" }));

// @route   GET api/expenses
// @desc    Get current user expenses
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Expense.find({ user: req.user.id })
      .then(expenses => {
        if (isEmpty(expenses)) {
          errors.noExpenses = "Nenhuma despensa mensal cadastrada para este usuário";
          res.status(404).json(errors);
        }

        res.json(expenses);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/expenses
// @desc    Adiciona ou edita uma despesa mensal
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExpenseInput(req.body);

    // Checar a validação
    if (!isValid) {
      // Retornar os erros com o status 400
      return res.status(400).json(errors);
    }

    // Obtem os campos
    const expenseFields = {};

    expenseFields.user = req.user.id;

    if (req.body.description) expenseFields.description = req.body.description;
    if (req.body.category) expenseFields.category = req.body.category;
    if (req.body.paymentDate) expenseFields.paymentDate = req.body.paymentDate;
    if (req.body.payment) expenseFields.payment = req.body.payment;
    if (req.body.value) expenseFields.value = req.body.value;
    

    Expense.findById(req.body.id).then(expense => {
      if (expense) {
        // Editar
        expenseFields.updatedDate = Date.now();

        Expense.findOneAndUpdate(
          { _id: req.body.id },
          { $set: expenseFields },
          { new: true }
        ).then(expense => res.json(expense));
      } else {
        // Adicionar
        // Salvar
        new Expense(expenseFields).save().then(expense => res.json(expense));
      }
    });
  }
);

module.exports = router;
