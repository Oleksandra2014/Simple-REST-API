const express = require("express");
const expenseRouter = express.Router();
const { Expenses } = require("../config/firebaseConfig");

// GET /expenses - Retrieve all expenses.
expenseRouter.get("/expenses", async (req, res) => {
    try {
        const snapshot = await Expenses.get();
        const allExpenses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.send(allExpenses);
    } catch (error) {
        res.status(500).send({ error: 'Error' });
    }
});

// POST /expenses - Add a new expense.
expenseRouter.post("/expenses", async (req, res) => {
    try {
        const newExpense = req.body;
        await Expenses.add(newExpense);
        res.send({ message: "New expense has been added successfuly" });
    } catch (error) {
        res.status(500).send({ error: "Error, expense was not added" });
    }
});

// PUT /expenses/:id - Update an existing expense by ID.
expenseRouter.put("/expenses/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const expenseCheck = await Expenses.doc(id).get(); 
        // check if expense exists in db
        if (!expenseCheck.exists){
            return res.status(404).send({ error: "Expense was not found" })
        }
        await Expenses.doc(id).update(updatedData); // update only provided data
        res.send({ message: "Expenses updated successfully" });
    } catch (error) {
        res.status(500).send({ error: "Error, expense data was not updated" });
    }
});

// DELETE /expenses/:id - Delete an expense by ID.
expenseRouter.delete("/expenses/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const expenseCheck = await Expenses.doc(id).get(); 
        // check if expense exists in db
        if (!expenseCheck.exists){
            return res.status(404).send({ error: "Expense was not found" })
        }     
        await Expenses.doc(id).delete();
        res.send({ message: "Expense deleted successfully" });
    } catch (error) {
        res.status(500).send({ error: 'Error, expense was not deleted' });
    }
});

module.exports = expenseRouter;
