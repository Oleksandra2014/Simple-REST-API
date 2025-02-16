const express = require("express");
const incomeRouter = express.Router();
const { Income } = require("../config/firebaseConfig");

// GET /income - Retrieve all income.
incomeRouter.get("/income", async (req, res) => {
    try {
        const snapshot = await Income.get();
        const allIncome = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.send(allIncome);
    } catch (error) {
        res.status(500).send({ error: 'Error' });
    }
});

// POST /income - Add a new income.
incomeRouter.post("/income", async (req, res) => {
    try {
        const newIncome = req.body;
        await Income.add(newIncome);
        res.send({ message: "New income has been added successfuly" });
    } catch (error) {
        res.status(500).send({ error: "Error, income was not added" });
    }
});

// PUT /income/:id - Update an existing income by ID.
incomeRouter.put("/income/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const incomeCheck = await Income.doc(id).get(); 
        // check if income exists in db
        if (!incomeCheck.exists){
            return res.status(404).send({ error: "Income was not found" })
        }
        await Income.doc(id).update(updatedData); // update only provided data
        res.send({ message: "Income updated successfully" });
    } catch (error) {
        res.status(500).send({ error: "Error, income data was not updated" });
    }
});

// DELETE /income/:id - Delete an income by ID.
incomeRouter.delete("/income/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const incomeCheck = await Income.doc(id).get(); 
        // check if income exists in db
        if (!incomeCheck.exists){
            return res.status(404).send({ error: "Income was not found" })
        }     
        await Income.doc(id).delete();
        res.send({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).send({ error: 'Error, user was not deleted' });
    }
});

module.exports = incomeRouter;
