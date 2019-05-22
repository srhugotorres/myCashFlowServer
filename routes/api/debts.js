const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const isEmpty = require("../../validation/is-empty");

// Carrega a validação
const validateDebtInput = require("../../validation/debts");

// Load Debt model
const Debt = require("../../models/debt");
// Load User profile
const User = require("../../models/User");

// @route   GET api/debts/test
// @desc    Tests debts route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Debt works!" }));

// @route   GET api/debts
// @desc    Get current user debts
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Debt.find({ user: req.user.id })
      .then(debts => {
        if (isEmpty(debts)) {
          errors.noDebts = "Nenhuma dívida cadastrada para este usuário";
          res.status(404).json(errors);
        }

        res.json(debts);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/debts
// @desc    Adiciona ou edita uma dívida
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateDebtInput(req.body);

    // Checar a validação
    if (!isValid) {
      // Retornar os erros com o status 400
      return res.status(400).json(errors);
    }

    // Obtem os campos
    const debtFields = {};

    debtFields.user = req.user.id;

    if (req.body.description) debtFields.description = req.body.description;
    if (req.body.qfatura) debtFields.qfatura = req.body.qfatura;
    if (req.body.vfatura) debtFields.vfatura = req.body.vfatura;
    if (req.body.value) debtFields.value = req.body.value;
    

    Debt.findById(req.body.id).then(debt => {
      if (debt) {
        // Editar
        debtFields.updatedDate = Date.now();

        Debt.findOneAndUpdate(
          { _id: req.body.id },
          { $set: debtFields },
          { new: true }
        ).then(debt => res.json(debt));
      } else {
        // Adicionar
        // Salvar
        new Debt(debtFields).save().then(debt => res.json(debt));
      }
    });
  }
);

// @route   DELETE api/debts/:id
// @desc    Deleta uma dívida
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Debt.findById(req.params.id).then(debt => {
      // Check for debt owner
      if (debt.user.toString() !== req.user.id) {
        errors.noAuthorization = "Usuário não autorizado";
        res.status(401).json(errors);
      }

      // Delete
      debt
        .remove()
        .then(() => res.json({ success: true }))
        .catch(err =>
          res
            .status(404)
            .json({ debtNotFound: "Esta dívida não foi encontrada" })
        );
    });
  }
);

module.exports = router;
