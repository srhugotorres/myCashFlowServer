const express = require("express");
const router = express.Router();
const passport = require("passport");
const isEmpty = require("../../validation/is-empty");

// Load Spending model
const Spending = require("../../models/Spending");

// @route   GET api/dashboard/test
// @desc    Tests dashboard route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Dashboard works!" }));

// @route   GET api/dashboard/incomesspendingsgraphdata
// @desc    Get data to incomes and spendings data to dashboard graph
// @access  Private
router.get(
  "/incomesspendingsgraphdata",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    const incomesSpendingsData = {
      labelsH: [],
      labelsV: 0,
      incomesVector: [],
      spendingsVector: []
    };

    const monthNames = [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez"
    ];

    let months = [];

    Promise.all([
      Spending.find({ user: req.user.id }),
      Income.find({ user: req.user.id })
    ])
      .then(([spendings, incomes]) => {
        const spendingMonths = spendings.map(spending => {
          return spending.paymentDate.getMonth();
        });

        const incomesMonths = incomes.map(income => {
          return income.date.getMonth();
        });

        months = [...new Set(spendingMonths.concat(incomesMonths))];

        months.sort(compareNumbers);

        // Spendings
        let dateValue = spendings.map(spending => ({
          ...spending,
          date: spending.paymentDate,
          value: Number(spending.value)
        }));

        let mapDayToMonth = dateValue.map(x => ({
          ...x,
          date: x.date.getMonth()
        }));

        let spendingSumPerMonth = mapDayToMonth.reduce((acc, cur) => {
          acc[cur.date] = acc[cur.date] + cur.value || cur.value; // increment or initialize to cur.value
          return acc;
        }, {});

        months.forEach(month => {
          if (isEmpty(spendingSumPerMonth[month])) {
            spendingSumPerMonth[month] = 0;
          }
        });

        // Incomes
        let incomeDateValue = incomes.map(income => ({
          ...income,
          date: income.date,
          value: Number(income.value)
        }));

        let incomeMapDayToMonth = incomeDateValue.map(x => ({
          ...x,
          date: x.date.getMonth()
        }));

        let incomeSumPerMonth = incomeMapDayToMonth.reduce((acc, cur) => {
          acc[cur.date] = acc[cur.date] + cur.value || cur.value; // increment or initialize to cur.value
          return acc;
        }, {});

        months.forEach(month => {
          if (isEmpty(incomeSumPerMonth[month])) {
            incomeSumPerMonth[month] = 0;
          }
        });

        // Get the greater value of spendings and incomes
        const incomesSpendingsValues = Object.values(incomeSumPerMonth).concat(
          Object.values(spendingSumPerMonth)
        );

        var maxValue = incomesSpendingsValues.reduce(function(a, b) {
          return Math.max(a, b);
        });

        incomesSpendingsData.incomesVector = incomeSumPerMonth;
        incomesSpendingsData.spendingsVector = spendingSumPerMonth;
        incomesSpendingsData.labelsV = maxValue;
        incomesSpendingsData.labelsH = months;

        res.json([incomesSpendingsData]);
      })
      .catch(err =>
        res
          .status(404)
          .json({ invalidData: "Dados insuficientes para gerar o gráfico" })
      );
  }
);

function compareNumbers(a, b) {
  return a - b;
}

module.exports = router;
