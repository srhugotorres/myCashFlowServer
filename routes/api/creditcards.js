const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const isEmpty = require("../../validation/is-empty");

// Carrega a validação
const validateCreditcardInput = require("../../validation/creditcards");

// Load Creditcard model
const Creditcard = require("../../models/creditcard");
// Load User profile
const User = require("../../models/User");

// @route   GET api/creditcards/test
// @desc    Tests creditcards route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Creditcard works!" }));

// @route   GET api/creditcards
// @desc    Get current user creditcards
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Creditcard.find({ user: req.user.id })
      .then(creditcard => {
        if (isEmpty(creditcard)) {
          errors.noCreditcard = "Nenhum cartão de crédito cadastrado para este usuário";
          res.status(404).json(errors);
        }

        res.json(creditcard);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/creditcards
// @desc    Adiciona ou edita um cartão de crédito
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCreditcardInput(req.body);

    // Checar a validação
    if (!isValid) {
      // Retornar os erros com o status 400
      return res.status(400).json(errors);
    }

    // Obtem os campos
    const creditcardFields = {};

    creditcardFields.user = req.user.id;

    if (req.body.name) creditcardFields.name = req.body.name;
    if (req.body.limit) creditcardFields.limit = req.body.limit;
    if (req.body.date) creditcardFields.date = req.body.date;

    Creditcard.findById(req.body.id).then(creditcard => {
      if (creditcard) {
        // Editar
        creditcardFields.updatedDate = Date.now();

        Creditcard.findOneAndUpdate(
          { _id: req.body.id },
          { $set: creditcardFields },
          { new: true }
        ).then(creditcard => res.json(creditcard));
      } else {
        // Adicionar
        // Salvar
        new Creditcard(creditcardFields).save().then(creditcard => res.json(creditcard));
      }
    });
  }
);

// @route   DELETE api/creditcard/:id
// @desc    Deleta um cartão de credito
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Creditcard.findById(req.params.id).then(creditcard => {
      // Check for creditcard owner
      if (creditcard.user.toString() !== req.user.id) {
        errors.noAuthorization = "Usuário não autorizado";
        res.status(401).json(errors);
      }

      // Delete
      creditcard
        .remove()
        .then(() => res.json({ success: true }))
        .catch(err =>
          res
            .status(404)
            .json({ credicardNotFound: "Este cartão não foi encontrado" })
        );
    });
  }
);

module.exports = router;
