const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const isEmpty = require("../../validation/is-empty");

// Carrega a validação
const validateGoalsInput = require("../../validation/goals");

// Load Goals model
const Goals = require("../../models/Goals");
// Load User profile
const User = require("../../models/User");

// @route   GET api/goals/test
// @desc    Tests goals route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Goals works!" }));

// @route   GET api/goals
// @desc    Get current user goals
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Goals.find({ user: req.user.id })
      .then(Goals => {
        if (isEmpty(goals)) {
          errors.noGoals = "Nenhum cartão de crédito cadastrado para este usuário";
          res.status(404).json(errors);
        }

        res.json(goals);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/goals
// @desc    Adiciona ou edita um cartão de crédito
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateGoalsInput(req.body);

    // Checar a validação
    if (!isValid) {
      // Retornar os erros com o status 400
      return res.status(400).json(errors);
    }

    // Obtem os campos
    const goalsFields = {};

    goalsFields.user = req.user.id;

    if (req.body.name) goalsFields.name = req.body.name;
    if (req.body.limit) goalsFields.limit = req.body.limit;
    if (req.body.date) goalsFields.date = req.body.date;

    Goals.findById(req.body.id).then(goals => {
      if (goals) {
        // Editar
        goalsFields.updatedDate = Date.now();

        Goals.findOneAndUpdate(
          { _id: req.body.id },
          { $set: GoalsFields },
          { new: true }
        ).then(Goals => res.json(goals));
      } else {
        // Adicionar
        // Salvar
        new Goals(goalsFields).save().then(goals => res.json(goals));
      }
    });
  }
);

// @route   DELETE api/goals/:id
// @desc    Deleta um cartão de credito
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Goals.findById(req.params.id).then(goals => {
      // Check for goals owner
      if (goals.user.toString() !== req.user.id) {
        errors.noAuthorization = "Usuário não autorizado";
        res.status(401).json(errors);
      }

      // Delete
      goals
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
